import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { serviceRequestRouter } from "./routers/serviceRequest";
import { contactRouter } from "./routers/contact";
import { projectRouter } from "./routers/project";
import { faqRouter } from "./routers/faq";
import { statsRouter } from "./routers/stats";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  serviceRequest: serviceRequestRouter,
  contact: contactRouter,
  project: projectRouter,
  faq: faqRouter,
  stats: statsRouter,
});

export type AppRouter = typeof appRouter;
