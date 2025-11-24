import { sql } from "drizzle-orm";
import {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  decimal,
  datetime,
  boolean,
  json,
  timestamp,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

// ============================================
// CRM & LEAD MANAGEMENT
// ============================================

export const leads = mysqlTable("leads", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  position: varchar("position", { length: 100 }),
  source: mysqlEnum("source", ["website", "referral", "event", "social_media", "partner", "other"]).default("website"),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "converted", "lost"]).default("new"),
  score: int("score").default(0),
  notes: text("notes"),
  assignedTo: int("assigned_to"),
  convertedToApplicationId: int("converted_to_application_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const leadActivities = mysqlTable("lead_activities", {
  id: serial("id").primaryKey(),
  leadId: int("lead_id").notNull(),
  activityType: mysqlEnum("activity_type", ["call", "email", "meeting", "note", "task"]).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description"),
  dueDate: datetime("due_date"),
  completed: boolean("completed").default(false),
  createdBy: int("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// COHORT & PROGRAM MANAGEMENT
// ============================================

export const cohorts = mysqlTable("cohorts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  startDate: datetime("start_date").notNull(),
  endDate: datetime("end_date").notNull(),
  capacity: int("capacity").notNull(),
  enrolled: int("enrolled").default(0),
  status: mysqlEnum("status", ["planning", "recruiting", "active", "completed", "cancelled"]).default("planning"),
  location: varchar("location", { length: 255 }),
  format: mysqlEnum("format", ["in_person", "online", "hybrid"]).default("hybrid"),
  description: text("description"),
  objectives: json("objectives"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const cohortParticipants = mysqlTable("cohort_participants", {
  id: serial("id").primaryKey(),
  cohortId: int("cohort_id").notNull(),
  applicationId: int("application_id").notNull(),
  status: mysqlEnum("status", ["enrolled", "active", "completed", "dropped", "suspended"]).default("enrolled"),
  enrollmentDate: datetime("enrollment_date").defaultNow(),
  completionDate: datetime("completion_date"),
  attendance: decimal("attendance", { precision: 5, scale: 2 }).default("0"),
  performanceScore: decimal("performance_score", { precision: 5, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ============================================
// CURRICULUM & CONTENT MANAGEMENT
// ============================================

export const curriculumModules = mysqlTable("curriculum_modules", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description"),
  duration: int("duration").notNull(), // in hours
  order: int("order").notNull(),
  category: mysqlEnum("category", ["technical", "business", "soft_skills", "project"]).notNull(),
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"]).default("intermediate"),
  prerequisites: json("prerequisites"),
  learningObjectives: json("learning_objectives"),
  content: text("content"),
  resources: json("resources"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const assignments = mysqlTable("assignments", {
  id: serial("id").primaryKey(),
  moduleId: int("module_id").notNull(),
  cohortId: int("cohort_id"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  instructions: text("instructions"),
  dueDate: datetime("due_date"),
  maxScore: int("max_score").default(100),
  type: mysqlEnum("type", ["individual", "group", "project", "quiz"]).notNull(),
  attachments: json("attachments"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const submissions = mysqlTable("submissions", {
  id: serial("id").primaryKey(),
  assignmentId: int("assignment_id").notNull(),
  participantId: int("participant_id").notNull(),
  submissionDate: datetime("submission_date").defaultNow(),
  content: text("content"),
  attachments: json("attachments"),
  score: decimal("score", { precision: 5, scale: 2 }),
  feedback: text("feedback"),
  gradedBy: int("graded_by"),
  gradedAt: datetime("graded_at"),
  status: mysqlEnum("status", ["draft", "submitted", "graded", "returned"]).default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ============================================
// MENTOR & ADVISOR MANAGEMENT
// ============================================

export const mentors = mysqlTable("mentors", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  position: varchar("position", { length: 100 }),
  expertise: json("expertise"),
  bio: text("bio"),
  linkedinUrl: varchar("linkedin_url", { length: 500 }),
  availability: mysqlEnum("availability", ["full_time", "part_time", "occasional"]).default("part_time"),
  status: mysqlEnum("status", ["active", "inactive", "on_leave"]).default("active"),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  sessionsCompleted: int("sessions_completed").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const mentoringSessions = mysqlTable("mentoring_sessions", {
  id: serial("id").primaryKey(),
  mentorId: int("mentor_id").notNull(),
  participantId: int("participant_id").notNull(),
  cohortId: int("cohort_id"),
  scheduledDate: datetime("scheduled_date").notNull(),
  duration: int("duration").default(60), // in minutes
  topic: varchar("topic", { length: 255 }),
  notes: text("notes"),
  status: mysqlEnum("status", ["scheduled", "completed", "cancelled", "rescheduled"]).default("scheduled"),
  rating: int("rating"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ============================================
// PROJECT & PORTFOLIO MANAGEMENT
// ============================================

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  cohortId: int("cohort_id"),
  teamLeadId: int("team_lead_id"),
  status: mysqlEnum("status", ["planning", "in_progress", "review", "completed", "on_hold"]).default("planning"),
  startDate: datetime("start_date"),
  endDate: datetime("end_date"),
  budget: decimal("budget", { precision: 10, scale: 2 }),
  category: varchar("category", { length: 100 }),
  technologies: json("technologies"),
  repositoryUrl: varchar("repository_url", { length: 500 }),
  demoUrl: varchar("demo_url", { length: 500 }),
  progress: int("progress").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const projectMembers = mysqlTable("project_members", {
  id: serial("id").primaryKey(),
  projectId: int("project_id").notNull(),
  participantId: int("participant_id").notNull(),
  role: varchar("role", { length: 100 }),
  contribution: text("contribution"),
  joinedAt: datetime("joined_at").defaultNow(),
});

export const projectMilestones = mysqlTable("project_milestones", {
  id: serial("id").primaryKey(),
  projectId: int("project_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  dueDate: datetime("due_date"),
  completedDate: datetime("completed_date"),
  status: mysqlEnum("status", ["pending", "in_progress", "completed", "delayed"]).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// FINANCIAL MANAGEMENT
// ============================================

export const budgets = mysqlTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  fiscalYear: int("fiscal_year").notNull(),
  category: mysqlEnum("category", ["operations", "marketing", "infrastructure", "programs", "hr", "other"]).notNull(),
  allocated: decimal("allocated", { precision: 12, scale: 2 }).notNull(),
  spent: decimal("spent", { precision: 12, scale: 2 }).default("0"),
  remaining: decimal("remaining", { precision: 12, scale: 2 }),
  status: mysqlEnum("status", ["draft", "approved", "active", "closed"]).default("draft"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const expenses = mysqlTable("expenses", {
  id: serial("id").primaryKey(),
  budgetId: int("budget_id"),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("AED"),
  expenseDate: datetime("expense_date").notNull(),
  vendor: varchar("vendor", { length: 255 }),
  receiptUrl: varchar("receipt_url", { length: 500 }),
  status: mysqlEnum("status", ["pending", "approved", "paid", "rejected"]).default("pending"),
  approvedBy: int("approved_by"),
  approvedAt: datetime("approved_at"),
  createdBy: int("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const revenues = mysqlTable("revenues", {
  id: serial("id").primaryKey(),
  source: varchar("source", { length: 255 }).notNull(),
  description: text("description"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("AED"),
  revenueDate: datetime("revenue_date").notNull(),
  category: mysqlEnum("category", ["sponsorship", "grants", "equity", "services", "other"]).notNull(),
  status: mysqlEnum("status", ["expected", "received", "cancelled"]).default("expected"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// HR & TEAM MANAGEMENT
// ============================================

export const employees = mysqlTable("employees", {
  id: serial("id").primaryKey(),
  employeeId: varchar("employee_id", { length: 50 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  department: mysqlEnum("department", ["management", "operations", "programs", "marketing", "finance", "hr", "tech"]).notNull(),
  position: varchar("position", { length: 100 }).notNull(),
  employmentType: mysqlEnum("employment_type", ["full_time", "part_time", "contract", "intern"]).default("full_time"),
  startDate: datetime("start_date").notNull(),
  endDate: datetime("end_date"),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  status: mysqlEnum("status", ["active", "on_leave", "terminated"]).default("active"),
  managerId: int("manager_id"),
  skills: json("skills"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const attendance = mysqlTable("attendance", {
  id: serial("id").primaryKey(),
  employeeId: int("employee_id").notNull(),
  date: datetime("date").notNull(),
  checkIn: datetime("check_in"),
  checkOut: datetime("check_out"),
  status: mysqlEnum("status", ["present", "absent", "late", "half_day", "leave"]).default("present"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leaveRequests = mysqlTable("leave_requests", {
  id: serial("id").primaryKey(),
  employeeId: int("employee_id").notNull(),
  leaveType: mysqlEnum("leave_type", ["annual", "sick", "personal", "unpaid"]).notNull(),
  startDate: datetime("start_date").notNull(),
  endDate: datetime("end_date").notNull(),
  days: int("days").notNull(),
  reason: text("reason"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  approvedBy: int("approved_by"),
  approvedAt: datetime("approved_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================
// RESOURCE & ASSET MANAGEMENT
// ============================================

export const resources = mysqlTable("resources", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["equipment", "software", "facility", "vehicle", "other"]).notNull(),
  description: text("description"),
  serialNumber: varchar("serial_number", { length: 100 }),
  purchaseDate: datetime("purchase_date"),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }),
  currentValue: decimal("current_value", { precision: 10, scale: 2 }),
  location: varchar("location", { length: 255 }),
  status: mysqlEnum("status", ["available", "in_use", "maintenance", "retired"]).default("available"),
  assignedTo: int("assigned_to"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ============================================
// ANALYTICS & REPORTING
// ============================================

export const kpis = mysqlTable("kpis", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  target: decimal("target", { precision: 10, scale: 2 }).notNull(),
  actual: decimal("actual", { precision: 10, scale: 2 }).default("0"),
  unit: varchar("unit", { length: 50 }),
  period: mysqlEnum("period", ["daily", "weekly", "monthly", "quarterly", "yearly"]).notNull(),
  periodDate: datetime("period_date").notNull(),
  status: mysqlEnum("status", ["on_track", "at_risk", "off_track"]).default("on_track"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ============================================
// WEB CONTENT MANAGEMENT
// ============================================

export const webPages = mysqlTable("web_pages", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  metaDescription: varchar("meta_description", { length: 500 }),
  metaKeywords: varchar("meta_keywords", { length: 500 }),
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft"),
  publishedAt: datetime("published_at"),
  createdBy: int("created_by"),
  updatedBy: int("updated_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const webBlocks = mysqlTable("web_blocks", {
  id: serial("id").primaryKey(),
  pageId: int("page_id"),
  type: varchar("type", { length: 50 }).notNull(),
  content: json("content").notNull(),
  order: int("order").notNull(),
  isVisible: boolean("is_visible").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
