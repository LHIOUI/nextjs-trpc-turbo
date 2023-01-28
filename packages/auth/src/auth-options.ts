import { type NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

import { prisma } from "@lh/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
export type GoogleProviderConfig = {
  clientId: string;
  clientSecret: string;
  type: "ADMIN" | "CLIENT";
};
export const authOptions: (config: GoogleProviderConfig) => NextAuthOptions = (
  config: GoogleProviderConfig,
) => ({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider<GoogleProfile>({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      profile: (profile) => {
        return {
          id: profile.sub,
          type: config.type,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
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
