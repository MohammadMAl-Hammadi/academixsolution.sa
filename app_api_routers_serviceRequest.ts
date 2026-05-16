import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { serviceRequests } from "@db/schema";
import { eq, and, gte, lte, desc, like, sql } from "drizzle-orm";

export const serviceRequestRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        serviceType: z.string().min(1),
        subject: z.string().min(1),
        university: z.string().min(1),
        questionCount: z.string().optional(),
        examDateTime: z.string().optional(),
        deliveryDate: z.string().optional(),
        courseName: z.string().optional(),
        details: z.string().optional(),
        whatsappNumber: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(serviceRequests).values({
        serviceType: input.serviceType,
        subject: input.subject,
        university: input.university,
        questionCount: input.questionCount || null,
        examDateTime: input.examDateTime || null,
        deliveryDate: input.deliveryDate || null,
        courseName: input.courseName || null,
        details: input.details || null,
        whatsappNumber: input.whatsappNumber || null,
      });

      const id = Number(result[0].insertId);

      await db
        .insert(require("@db/schema").stats)
        .values({
          metricName: "total_requests",
          metricValue: "0",
        })
        .onDuplicateKeyUpdate({
          set: {
            metricValue: sql`metric_value + 1`,
            updatedAt: new Date(),
          },
        })
        .catch(() => {});

      return { success: true, id };
    }),

  list: adminQuery
    .input(
      z
        .object({
          serviceType: z.string().optional(),
          university: z.string().optional(),
          status: z.string().optional(),
          dateFrom: z.string().optional(),
          dateTo: z.string().optional(),
          page: z.number().default(1),
          limit: z.number().default(20),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const filters = [];
      const params: Record<string, any> = input || {};

      if (params.serviceType) {
        filters.push(eq(serviceRequests.serviceType, params.serviceType));
      }
      if (params.university) {
        filters.push(like(serviceRequests.university, `%${params.university}%`));
      }
      if (params.status) {
        filters.push(eq(serviceRequests.status, params.status as any));
      }
      if (params.dateFrom) {
        filters.push(gte(serviceRequests.createdAt, new Date(params.dateFrom)));
      }
      if (params.dateTo) {
        filters.push(lte(serviceRequests.createdAt, new Date(params.dateTo)));
      }

      const where = filters.length > 0 ? and(...filters) : undefined;
      const page = (params.page as number) || 1;
      const limit = (params.limit as number) || 20;
      const offset = (page - 1) * limit;

      const items = await db
        .select()
        .from(serviceRequests)
        .where(where)
        .orderBy(desc(serviceRequests.createdAt))
        .limit(limit)
        .offset(offset);

      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(serviceRequests)
        .where(where);

      return { items, total: countResult[0].count };
    }),

  updateStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(["new", "in_progress", "completed", "cancelled"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(serviceRequests)
        .set({ status: input.status })
        .where(eq(serviceRequests.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(serviceRequests).where(eq(serviceRequests.id, input.id));
      return { success: true };
    }),
});
