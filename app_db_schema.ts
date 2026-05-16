import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Service requests from the services form
export const serviceRequests = mysqlTable("service_requests", {
  id: serial("id").primaryKey(),
  serviceType: varchar("service_type", { length: 100 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  university: varchar("university", { length: 255 }).notNull(),
  questionCount: varchar("question_count", { length: 50 }),
  examDateTime: varchar("exam_date_time", { length: 100 }),
  deliveryDate: varchar("delivery_date", { length: 50 }),
  courseName: varchar("course_name", { length: 255 }),
  details: text("details"),
  status: mysqlEnum("status", ["new", "in_progress", "completed", "cancelled"]).default("new").notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = typeof serviceRequests.$inferInsert;

// Contact form messages
export const contactMessages = mysqlTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied"]).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

// Portfolio projects
export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleAr: varchar("title_ar", { length: 255 }).notNull(),
  description: text("description").notNull(),
  descriptionAr: text("description_ar").notNull(),
  category: mysqlEnum("category", ["programming", "design", "academic", "website", "branding"]).notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  tags: text("tags"),
  featured: mysqlEnum("featured", ["true", "false"]).default("false").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

// FAQ entries
export const faqEntries = mysqlTable("faq_entries", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  questionAr: text("question_ar").notNull(),
  answer: text("answer").notNull(),
  answerAr: text("answer_ar").notNull(),
  category: varchar("category", { length: 100 }).default("general").notNull(),
  orderIdx: int("order_idx").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type FaqEntry = typeof faqEntries.$inferSelect;
export type InsertFaqEntry = typeof faqEntries.$inferInsert;

// Site analytics visits
export const siteVisits = mysqlTable("site_visits", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 255 }).notNull(),
  visitorId: varchar("visitor_id", { length: 255 }),
  userAgent: text("user_agent"),
  referrer: varchar("referrer", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SiteVisit = typeof siteVisits.$inferSelect;
export type InsertSiteVisit = typeof siteVisits.$inferInsert;

// Aggregated statistics
export const stats = mysqlTable("stats", {
  id: serial("id").primaryKey(),
  metricName: varchar("metric_name", { length: 100 }).notNull().unique(),
  metricValue: varchar("metric_value", { length: 50 }).default("0").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Stat = typeof stats.$inferSelect;
export type InsertStat = typeof stats.$inferInsert;
