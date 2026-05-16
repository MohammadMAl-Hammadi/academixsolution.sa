import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { projects } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const projectRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          category: z.string().optional(),
          featured: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const params = input || {};
      const conditions = [];

      if (params.category) {
        conditions.push(eq(projects.category, params.category as any));
      }
      if (params.featured === "true") {
        conditions.push(eq(projects.featured, "true" as any));
      }

      const where = conditions.length > 0 ? conditions.reduce((a, b) => {
        const { and } = require("drizzle-orm");
        return and(a, b);
      }) : undefined;

      const items = await db
        .select()
        .from(projects)
        .where(where)
        .orderBy(desc(projects.createdAt));

      return items;
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        titleAr: z.string().min(1),
        description: z.string().min(1),
        descriptionAr: z.string().min(1),
        category: z.enum(["programming", "design", "academic", "website", "branding"]),
        imageUrl: z.string().optional(),
        tags: z.string().optional(),
        featured: z.enum(["true", "false"]).default("false"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(projects).values(input);
      return { success: true, id: Number(result[0].insertId) };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        titleAr: z.string().optional(),
        description: z.string().optional(),
        descriptionAr: z.string().optional(),
        category: z.enum(["programming", "design", "academic", "website", "branding"]).optional(),
        imageUrl: z.string().optional(),
        tags: z.string().optional(),
        featured: z.enum(["true", "false"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(projects).set(data).where(eq(projects.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),
});
