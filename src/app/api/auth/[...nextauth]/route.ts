import NextAuth, { AuthOptions, TokenSet } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { apiFetch, getUserId } from '@/lib/helpers';
import { apiUrl } from '@/lib/settings';

export const authOptions: AuthOptions = {
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
          scope: 'https://www.googleapis.com/auth/userinfo.profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
          id_token: account.id_token,
          expires_at: Math.floor(
            Date.now() / 1000 + Number(account.expires_in)
          ),
          refresh_token: account.refresh_token,
        });
      } else if (Date.now() < Number(token.expires_at) * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
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

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            id_token: tokens.id_token,
            expires_at: Math.floor(
              Date.now() / 1000 + Number(tokens.expires_in)
            ),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error('Error refreshing access token', error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session) {
        let isAdmin = false;
        try {
          isAdmin = await apiFetch(
            token.id_token as string,
            `${apiUrl}/adm/isAdmin`
          ).then((res) => res.json());
        } catch (e) {
          console.error(e);
        }
        session = Object.assign({}, session, {
          access_token: token.access_token,
          id_token: token.id_token,
          userId: getUserId(token.id_token as string),
          isAdmin,
        });
      }
      return session;
    },
  },
  // callbacks: {
  //   async jwt({ token, user, account, profile }) {
  //     if (account?.access_token) {
  //       token.access_token = account.access_token;
  //     }
  //     return token;
  //   },
  // },
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account?.provider === 'google') {
  //       return (
  //         (profile as any)?.email_verified &&
  //         profile?.email?.endsWith('@tretton37.com')
  //       );
  //     }
  //     return true; // Do different verification for other providers that don't have `email_verified`
  //   },
  // },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
