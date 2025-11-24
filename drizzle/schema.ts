import { date, decimal, int, mysqlEnum, mysqlTable, text, time, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Application submissions table
 * Stores all program applications from the Apply page
 */
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  // Personal Information
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  
  // Program Selection
  track: mysqlEnum("track", ["technical", "business"]).notNull(),
  careerPath: mysqlEnum("careerPath", ["egypt", "uae", "international", "entrepreneurship"]).notNull(),
  
  // Background
  education: text("education").notNull(),
  currentRole: varchar("currentRole", { length: 255 }),
  yearsExperience: int("yearsExperience"),
  technicalBackground: text("technicalBackground"),
  
  // Application Details
  motivation: text("motivation").notNull(),
  goals: text("goals").notNull(),
  linkedinUrl: varchar("linkedinUrl", { length: 500 }),
  portfolioUrl: varchar("portfolioUrl", { length: 500 }),
  
  // Status
  status: mysqlEnum("status", ["pending", "reviewing", "accepted", "rejected"]).default("pending").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

/**
 * Contact form submissions table
 * Stores all inquiries from the Contact page
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  
  // Status for tracking responses
  status: mysqlEnum("status", ["new", "in_progress", "resolved"]).default("new").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

/**
 * Newsletter subscriptions table
 * Stores email addresses for newsletter signups
 */
export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  
  // Subscription status
  isActive: int("isActive").default(1).notNull(), // 1 = active, 0 = unsubscribed
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

/**
 * Site settings table
 * Stores configurable website settings like logo, contact info, and content
 */
export const siteSettings = mysqlTable("siteSettings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 100 }).notNull().unique(),
  settingValue: text("settingValue"),
  settingType: mysqlEnum("settingType", ["text", "url", "image", "number", "json"]).default("text").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

// ============================================
// ENTERPRISE MODULES - Simplified Version
// ============================================

// CRM & Lead Management
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  source: mysqlEnum("source", ["website", "referral", "event", "social_media", "partner", "other"]).default("website"),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "converted", "lost"]).default("new"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Cohort Management
export const cohorts = mysqlTable("cohorts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  capacity: int("capacity").notNull(),
  enrolled: int("enrolled").default(0),
  status: mysqlEnum("status", ["planning", "recruiting", "active", "completed"]).default("planning"),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Mentor Management
export const mentors = mysqlTable("mentors", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  expertise: text("expertise"),
  bio: text("bio"),
  linkedin: varchar("linkedin", { length: 500 }),
  profileImage: varchar("profileImage", { length: 500 }),
  availability: mysqlEnum("availability", ["available", "busy", "unavailable"]).default("available"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("5.00"),
  status: mysqlEnum("status", ["active", "inactive"]).default("active"),
  sessionsCompleted: int("sessionsCompleted").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Financial Management
export const budgets = mysqlTable("budgets", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: mysqlEnum("category", ["operations", "marketing", "programs", "hr", "other"]).notNull(),
  allocated: decimal("allocated", { precision: 12, scale: 2 }).notNull(),
  spent: decimal("spent", { precision: 12, scale: 2 }).default("0"),
  fiscalYear: int("fiscalYear").notNull(),
  status: mysqlEnum("status", ["active", "closed"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const expenses = mysqlTable("expenses", {
  id: int("id").autoincrement().primaryKey(),
  budgetId: int("budgetId"),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  expenseDate: timestamp("expenseDate").notNull(),
  vendor: varchar("vendor", { length: 255 }),
  status: mysqlEnum("status", ["pending", "approved", "paid"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Web Content Editor
export const webPages = mysqlTable("webPages", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft"),
  updatedBy: varchar("updatedBy", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * HR Management - Employees table
 * Manages employee records, payroll, and HR operations
 */
export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: varchar("employeeId", { length: 50 }).notNull().unique(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  position: varchar("position", { length: 255 }).notNull(),
  department: mysqlEnum("department", ["management", "operations", "marketing", "technology", "finance", "hr"]).notNull(),
  employmentType: mysqlEnum("employmentType", ["full-time", "part-time", "contract", "intern"]).notNull(),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 10 }).default("EGP"),
  hireDate: date("hireDate").notNull(),
  endDate: date("endDate"),
  status: mysqlEnum("status", ["active", "on-leave", "terminated"]).default("active").notNull(),
  address: text("address"),
  emergencyContact: varchar("emergencyContact", { length: 255 }),
  emergencyPhone: varchar("emergencyPhone", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = typeof employees.$inferInsert;

/**
 * HR Management - Attendance table
 * Tracks employee attendance and time off
 */
export const attendance = mysqlTable("attendance", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  date: date("date").notNull(),
  checkIn: time("checkIn"),
  checkOut: time("checkOut"),
  status: mysqlEnum("status", ["present", "absent", "late", "half-day", "leave"]).notNull(),
  leaveType: mysqlEnum("leaveType", ["sick", "vacation", "personal", "unpaid"]),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = typeof attendance.$inferInsert;

/**
 * Accounting - Invoices table
 * Manages invoices for clients and revenue tracking
 */
export const invoices = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),
  invoiceNumber: varchar("invoiceNumber", { length: 50 }).notNull().unique(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("EGP"),
  taxAmount: decimal("taxAmount", { precision: 10, scale: 2 }).default("0"),
  totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["draft", "sent", "paid", "overdue", "cancelled"]).default("draft").notNull(),
  issueDate: date("issueDate").notNull(),
  dueDate: date("dueDate").notNull(),
  paidDate: date("paidDate"),
  paymentMethod: varchar("paymentMethod", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;

/**
 * Accounting - Transactions table
 * Records all financial transactions (income and expenses)
 */
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  transactionNumber: varchar("transactionNumber", { length: 50 }).notNull().unique(),
  type: mysqlEnum("type", ["income", "expense"]).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("EGP"),
  paymentMethod: varchar("paymentMethod", { length: 100 }),
  referenceNumber: varchar("referenceNumber", { length: 100 }),
  relatedInvoiceId: int("relatedInvoiceId"),
  relatedExpenseId: int("relatedExpenseId"),
  transactionDate: date("transactionDate").notNull(),
  status: mysqlEnum("status", ["completed", "pending", "cancelled"]).default("completed").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;
