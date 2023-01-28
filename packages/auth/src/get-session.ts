import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions, GoogleProviderConfig } from "./auth-options";

export const getServerSession = async (
  ctx:
    | {
        req: GetServerSidePropsContext["req"];
        res: GetServerSidePropsContext["res"];
      }
    | { req: NextApiRequest; res: NextApiResponse },
  config: GoogleProviderConfig,
) => {
  return await unstable_getServerSession(ctx.req, ctx.res, authOptions(config));
};
