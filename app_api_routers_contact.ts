import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { contactMessages } from "@db/schema";
import { eq, desc, sql } from "drizzle-orm";

export const contactRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        subject: z.string().min(1),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contactMessages).values({
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
      });
      return { success: true, id: Number(result[0].insertId) };
    }),

  list: adminQuery
    .input(
      z
        .object({
          status: z.string().optional(),
          page: z.number().default(1),
          limit: z.number().default(20),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const params: Record<string, any> = input || {};
      const filters = [];

      if (params.status) {
        filters.push(eq(contactMessages.status, params.status as any));
      }

      const where = filters.length > 0 ? sql.join(filters, sql` AND `) : undefined;
      const page = (params.page as number) || 1;
      const limit = (params.limit as number) || 20;
      const offset = (page - 1) * limit;

      const items = await db
        .select()
        .from(contactMessages)
        .where(where)
        .orderBy(desc(contactMessages.createdAt))
        .limit(limit)
        .offset(offset);

      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(contactMessages)
        .where(where);

      return { items, total: countResult[0].count };
    }),

  updateStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(["new", "read", "replied"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(contactMessages)
        .set({ status: input.status })
        .where(eq(contactMessages.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(contactMessages).where(eq(contactMessages.id, input.id));
      return { success: true };
    }),
});
