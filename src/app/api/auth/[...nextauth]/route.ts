import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jwt_decode from 'jwt-decode';
import { getUserId } from '@/lib/helpers';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
        });
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
          id_token: token.id_token,
          userId: getUserId(token.id_token as string),
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
