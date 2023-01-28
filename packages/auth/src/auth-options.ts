import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@lh/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
export type GoogleProviderConfig = {
  clientId: string;
  clientSecret: string;
};
export const authOptions: (config: GoogleProviderConfig) => NextAuthOptions = (
  config: GoogleProviderConfig,
) => ({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
