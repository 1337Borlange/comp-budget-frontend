import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    isAdmin: boolean;
    id_token: string;
    access_token: string;
    userId: string;
  }
}
