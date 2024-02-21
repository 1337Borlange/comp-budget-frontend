import 'server-only';

import { getUserId } from '@/lib/helpers';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { DefaultSession, NextAuthOptions, TokenSet, getServerSession } from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id_token: string;
    access_token: string;
    expires_at: number;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    id_token: string;
    access_token: string;
    userId: string;
  }
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60, // 4 hours
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Account is only available on sign in, not on subsequent requests
      if (account && !token?.id_token) {
        return {
          ...token,
          access_token: account.access_token!,
          id_token: account.id_token!,
          refresh_token: account.refresh_token!,
          expires_at: Number(account.expires_at) + 28800, // Adding 8 hours to the token expiration time
        };
      } else if (Date.now() < Number(token.expires_at) * 1000) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session && token?.id_token) {
        return {
          ...session,
          access_token: token.access_token,
          id_token: token.id_token,
          userId: getUserId(token.id_token),
        };
      }

      return session;
    },
  },
} satisfies NextAuthOptions;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    // https://accounts.google.com/.well-known/openid-configuration
    // We need the `token_endpoint`.
    const response = await fetch('https://oauth2.googleapis.com/token', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ?? '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: (token?.refresh_token as string) ?? '',
      }),
      method: 'POST',
    });

    const refreshedTokens: TokenSet = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token, // Keep the previous token properties
      access_token: refreshedTokens.access_token!,
      id_token: refreshedTokens.id_token!,
      expires_at: Math.floor(Date.now() / 1000 + Number(refreshedTokens.expires_in)),
      // Fall back to old refresh token, but note that
      // many providers may only allow using a refresh token once.
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    // The error property will be used client-side to handle the refresh token error
    return { ...token, error: 'RefreshAccessTokenError' as const };
  }
}

export async function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  const session = await getServerSession(...args, authOptions);

  if (session == null) {
    redirect('/api/auth/signin');
  }

  return session;
}
