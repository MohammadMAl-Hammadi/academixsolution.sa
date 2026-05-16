import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { faqEntries } from "@db/schema";
import { eq, asc } from "drizzle-orm";

export const faqRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    const items = await db
      .select()
      .from(faqEntries)
      .orderBy(asc(faqEntries.orderIdx));
    return items;
  }),

  create: adminQuery
    .input(
      z.object({
        question: z.string().min(1),
        questionAr: z.string().min(1),
        answer: z.string().min(1),
        answerAr: z.string().min(1),
        category: z.string().default("general"),
        orderIdx: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(faqEntries).values(input);
      return { success: true, id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        question: z.string().optional(),
        questionAr: z.string().optional(),
        answer: z.string().optional(),
        answerAr: z.string().optional(),
        category: z.string().optional(),
        orderIdx: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(faqEntries).set(data).where(eq(faqEntries.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(faqEntries).where(eq(faqEntries.id, input.id));
      return { success: true };
    }),
});
