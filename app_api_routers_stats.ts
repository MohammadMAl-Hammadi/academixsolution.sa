import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { stats, siteVisits, serviceRequests, contactMessages, projects } from "@db/schema";
import { sql, gte, desc } from "drizzle-orm";

export const statsRouter = createRouter({
  get: publicQuery.query(async () => {
    const db = getDb();

    const [
      requestsResult,
      messagesResult,
      projectsResult,
      visitsResult,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(serviceRequests),
      db.select({ count: sql<number>`count(*)` }).from(contactMessages),
      db.select({ count: sql<number>`count(*)` }).from(projects),
      db.select({ count: sql<number>`count(*)` }).from(siteVisits),
    ]);

    const statRecords = await db.select().from(stats);
    const statMap: Record<string, string> = {};
    for (const s of statRecords) {
      statMap[s.metricName] = s.metricValue;
    }

    return {
      totalRequests: requestsResult[0]?.count || 0,
      totalMessages: messagesResult[0]?.count || 0,
      totalProjects: projectsResult[0]?.count || 0,
      totalVisitors: visitsResult[0]?.count || 0,
      satisfactionRate: parseInt(statMap.satisfaction_rate || "98"),
      completedProjects: parseInt(statMap.completed_projects || "0"),
    };
  }),

  trackVisit: publicQuery
    .input(
      z.object({
        page: z.string().min(1),
        visitorId: z.string().optional(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(siteVisits).values({
        page: input.page,
        visitorId: input.visitorId || null,
        userAgent: input.userAgent || null,
        referrer: input.referrer || null,
      });

      await db
        .insert(stats)
        .values({ metricName: "total_visitors", metricValue: "0" })
        .onDuplicateKeyUpdate({
          set: {
            metricValue: sql`metric_value + 1`,
            updatedAt: new Date(),
          },
        })
        .catch(() => {});

      return { success: true };
    }),

  getDashboard: adminQuery
    .input(
      z
        .object({
          dateFrom: z.string().optional(),
          dateTo: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const dateFrom = input?.dateFrom
        ? new Date(input.dateFrom)
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const _dateTo = input?.dateTo ? new Date(input.dateTo) : new Date();
      void _dateTo;

      const visitsByDay = await db
        .select({
          date: sql<string>`DATE(created_at)`,
          count: sql<number>`count(*)`,
        })
        .from(siteVisits)
        .where(gte(siteVisits.createdAt, dateFrom))
        .groupBy(sql`DATE(created_at)`)
        .orderBy(sql`DATE(created_at)`);

      const requestsByService = await db
        .select({
          service: serviceRequests.serviceType,
          count: sql<number>`count(*)`,
        })
        .from(serviceRequests)
        .groupBy(serviceRequests.serviceType);

      const requestsByStatus = await db
        .select({
          status: serviceRequests.status,
          count: sql<number>`count(*)`,
        })
        .from(serviceRequests)
        .groupBy(serviceRequests.status);

      const messagesByStatus = await db
        .select({
          status: contactMessages.status,
          count: sql<number>`count(*)`,
        })
        .from(contactMessages)
        .groupBy(contactMessages.status);

      const topUniversities = await db
        .select({
          university: serviceRequests.university,
          count: sql<number>`count(*)`,
        })
        .from(serviceRequests)
        .groupBy(serviceRequests.university)
        .orderBy(desc(sql`count(*)`))
        .limit(10);

      return {
        visitsByDay,
        requestsByService,
        requestsByStatus,
        messagesByStatus,
        topUniversities,
      };
    }),
});
