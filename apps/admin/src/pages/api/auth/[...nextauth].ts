import NextAuth from "next-auth";
import { authOptions } from "@lh/auth";
import { env } from "~/env.mjs";

export default NextAuth(
  authOptions({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  }),
);
