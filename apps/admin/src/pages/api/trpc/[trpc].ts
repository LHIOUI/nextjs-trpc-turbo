import { appRouter, createTRPCContext } from "@lh/api";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "~/env.mjs";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    type: "ADMIN",
  }),
});

// If you need to enable cors, you can do so like this:
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Enable cors
//   await cors(req, res);

//   // Let the tRPC handler do its magic
//   return createNextApiHandler({
//     router: appRouter,
//     createContext,
//   })(req, res);
// };

// export default handler;
