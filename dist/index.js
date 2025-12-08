var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  applications: () => applications,
  attendance: () => attendance,
  budgets: () => budgets,
  cohorts: () => cohorts,
  contacts: () => contacts,
  employees: () => employees,
  expenses: () => expenses,
  invoices: () => invoices,
  leads: () => leads,
  mentors: () => mentors,
  newsletterSubscribers: () => newsletterSubscribers,
  siteSettings: () => siteSettings,
  transactions: () => transactions,
  users: () => users,
  webPages: () => webPages
});
import { date, decimal, int, mysqlEnum, mysqlTable, text, time, timestamp, varchar } from "drizzle-orm/mysql-core";
var users, applications, contacts, newsletterSubscribers, siteSettings, leads, cohorts, mentors, budgets, expenses, webPages, employees, attendance, invoices, transactions;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
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
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    applications = mysqlTable("applications", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    contacts = mysqlTable("contacts", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      email: varchar("email", { length: 320 }).notNull(),
      phone: varchar("phone", { length: 50 }),
      subject: varchar("subject", { length: 255 }).notNull(),
      message: text("message").notNull(),
      // Status for tracking responses
      status: mysqlEnum("status", ["new", "in_progress", "resolved"]).default("new").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    newsletterSubscribers = mysqlTable("newsletterSubscribers", {
      id: int("id").autoincrement().primaryKey(),
      email: varchar("email", { length: 320 }).notNull().unique(),
      name: varchar("name", { length: 255 }),
      // Subscription status
      isActive: int("isActive").default(1).notNull(),
      // 1 = active, 0 = unsubscribed
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      unsubscribedAt: timestamp("unsubscribedAt")
    });
    siteSettings = mysqlTable("siteSettings", {
      id: int("id").autoincrement().primaryKey(),
      settingKey: varchar("settingKey", { length: 100 }).notNull().unique(),
      settingValue: text("settingValue"),
      settingType: mysqlEnum("settingType", ["text", "url", "image", "number", "json"]).default("text").notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    leads = mysqlTable("leads", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    cohorts = mysqlTable("cohorts", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    mentors = mysqlTable("mentors", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    budgets = mysqlTable("budgets", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      category: mysqlEnum("category", ["operations", "marketing", "programs", "hr", "other"]).notNull(),
      allocated: decimal("allocated", { precision: 12, scale: 2 }).notNull(),
      spent: decimal("spent", { precision: 12, scale: 2 }).default("0"),
      fiscalYear: int("fiscalYear").notNull(),
      status: mysqlEnum("status", ["active", "closed"]).default("active"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    expenses = mysqlTable("expenses", {
      id: int("id").autoincrement().primaryKey(),
      budgetId: int("budgetId"),
      category: varchar("category", { length: 100 }).notNull(),
      description: text("description").notNull(),
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      expenseDate: timestamp("expenseDate").notNull(),
      vendor: varchar("vendor", { length: 255 }),
      status: mysqlEnum("status", ["pending", "approved", "paid"]).default("pending"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    webPages = mysqlTable("webPages", {
      id: int("id").autoincrement().primaryKey(),
      slug: varchar("slug", { length: 255 }).notNull().unique(),
      title: varchar("title", { length: 255 }).notNull(),
      content: text("content").notNull(),
      status: mysqlEnum("status", ["draft", "published"]).default("draft"),
      updatedBy: varchar("updatedBy", { length: 100 }),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    employees = mysqlTable("employees", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    attendance = mysqlTable("attendance", {
      id: int("id").autoincrement().primaryKey(),
      employeeId: int("employeeId").notNull(),
      date: date("date").notNull(),
      checkIn: time("checkIn"),
      checkOut: time("checkOut"),
      status: mysqlEnum("status", ["present", "absent", "late", "half-day", "leave"]).notNull(),
      leaveType: mysqlEnum("leaveType", ["sick", "vacation", "personal", "unpaid"]),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    invoices = mysqlTable("invoices", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    transactions = mysqlTable("transactions", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  createApplication: () => createApplication,
  createAttendance: () => createAttendance,
  createBudget: () => createBudget,
  createCohort: () => createCohort,
  createContact: () => createContact,
  createEmployee: () => createEmployee,
  createExpense: () => createExpense,
  createInvoice: () => createInvoice,
  createLead: () => createLead,
  createMentor: () => createMentor,
  createNewsletterSubscriber: () => createNewsletterSubscriber,
  createTransaction: () => createTransaction,
  createWebPage: () => createWebPage,
  deleteApplication: () => deleteApplication,
  deleteAttendance: () => deleteAttendance,
  deleteBudget: () => deleteBudget,
  deleteCohort: () => deleteCohort,
  deleteContact: () => deleteContact,
  deleteEmployee: () => deleteEmployee,
  deleteExpense: () => deleteExpense,
  deleteInvoice: () => deleteInvoice,
  deleteLead: () => deleteLead,
  deleteMentor: () => deleteMentor,
  deleteTransaction: () => deleteTransaction,
  deleteWebPage: () => deleteWebPage,
  getAllApplications: () => getAllApplications,
  getAllAttendance: () => getAllAttendance,
  getAllBudgets: () => getAllBudgets,
  getAllCohorts: () => getAllCohorts,
  getAllContacts: () => getAllContacts,
  getAllEmployees: () => getAllEmployees,
  getAllExpenses: () => getAllExpenses,
  getAllInvoices: () => getAllInvoices,
  getAllLeads: () => getAllLeads,
  getAllMentors: () => getAllMentors,
  getAllNewsletterSubscribers: () => getAllNewsletterSubscribers,
  getAllSiteSettings: () => getAllSiteSettings,
  getAllTransactions: () => getAllTransactions,
  getAllWebPages: () => getAllWebPages,
  getApplicationById: () => getApplicationById,
  getAttendanceByEmployeeId: () => getAttendanceByEmployeeId,
  getDb: () => getDb,
  getEmployeeById: () => getEmployeeById,
  getInvoiceById: () => getInvoiceById,
  getSiteSetting: () => getSiteSetting,
  getTransactionById: () => getTransactionById,
  getUserByOpenId: () => getUserByOpenId,
  getWebPageBySlug: () => getWebPageBySlug,
  unsubscribeNewsletter: () => unsubscribeNewsletter,
  updateApplicationStatus: () => updateApplicationStatus,
  updateAttendance: () => updateAttendance,
  updateBudget: () => updateBudget,
  updateCohort: () => updateCohort,
  updateContactStatus: () => updateContactStatus,
  updateEmployee: () => updateEmployee,
  updateExpense: () => updateExpense,
  updateInvoice: () => updateInvoice,
  updateLead: () => updateLead,
  updateMentor: () => updateMentor,
  updateSiteSetting: () => updateSiteSetting,
  updateTransaction: () => updateTransaction,
  updateWebPage: () => updateWebPage,
  upsertUser: () => upsertUser
});
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      console.log("[Database] Connecting to:", process.env.DATABASE_URL.substring(0, 50) + "...");
      _db = drizzle(process.env.DATABASE_URL);
      console.log("[Database] Connected successfully!");
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  } else if (!_db && !process.env.DATABASE_URL) {
    console.warn("[Database] DATABASE_URL not set");
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function createApplication(application) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.insert(applications).values(application);
  return result;
}
async function getAllApplications() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.select().from(applications).orderBy(applications.createdAt);
}
async function getApplicationById(id) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  const result = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function createContact(contact) {
  const db = await getDb();
  if (!db) {
    console.error("[Database] Database not available for contact insertion");
    throw new Error("Database not available");
  }
  try {
    const result = await db.insert(contacts).values(contact);
    console.log("[Database] Contact created successfully with ID:", result);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create contact:", error);
    throw error;
  }
}
async function getAllContacts() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.select().from(contacts).orderBy(contacts.createdAt);
}
async function createNewsletterSubscriber(subscriber) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  try {
    const result = await db.insert(newsletterSubscribers).values(subscriber);
    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Duplicate entry")) {
      throw new Error("Email already subscribed");
    }
    throw error;
  }
}
async function getAllNewsletterSubscribers() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  return await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, 1)).orderBy(newsletterSubscribers.createdAt);
}
async function updateApplicationStatus(id, status) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(applications).set({ status }).where(eq(applications.id, id));
}
async function deleteApplication(id) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.delete(applications).where(eq(applications.id, id));
}
async function updateContactStatus(id, status) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(contacts).set({ status }).where(eq(contacts.id, id));
}
async function deleteContact(id) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.delete(contacts).where(eq(contacts.id, id));
}
async function unsubscribeNewsletter(id) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  await db.update(newsletterSubscribers).set({ isActive: 0, unsubscribedAt: /* @__PURE__ */ new Date() }).where(eq(newsletterSubscribers.id, id));
}
async function getAllSiteSettings() {
  const db = await getDb();
  if (!db) return [];
  try {
    const { siteSettings: siteSettings2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    return await db.select().from(siteSettings2);
  } catch (error) {
    console.error("[Database] Error fetching site settings:", error);
    return [];
  }
}
async function getSiteSetting(key) {
  const db = await getDb();
  if (!db) return null;
  try {
    const { siteSettings: siteSettings2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const { eq: eq2 } = await import("drizzle-orm");
    const results = await db.select().from(siteSettings2).where(eq2(siteSettings2.settingKey, key));
    return results[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching site setting:", error);
    return null;
  }
}
async function updateSiteSetting(key, value, type = "text") {
  const db = await getDb();
  if (!db) return null;
  try {
    const { siteSettings: siteSettings2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    const { eq: eq2 } = await import("drizzle-orm");
    const existing = await getSiteSetting(key);
    if (existing) {
      await db.update(siteSettings2).set({ settingValue: value, settingType: type }).where(eq2(siteSettings2.settingKey, key));
    } else {
      await db.insert(siteSettings2).values({
        settingKey: key,
        settingValue: value,
        settingType: type
      });
    }
    return { success: true };
  } catch (error) {
    console.error("[Database] Error updating site setting:", error);
    return null;
  }
}
async function getAllLeads() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(leads).orderBy(desc(leads.createdAt));
}
async function createLead(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(leads).values(data);
}
async function updateLead(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(leads).set(data).where(eq(leads.id, id));
}
async function deleteLead(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(leads).where(eq(leads.id, id));
}
async function getAllCohorts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(cohorts).orderBy(desc(cohorts.startDate));
}
async function createCohort(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(cohorts).values(data);
}
async function updateCohort(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(cohorts).set(data).where(eq(cohorts.id, id));
}
async function deleteCohort(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(cohorts).where(eq(cohorts.id, id));
}
async function getAllMentors() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(mentors).orderBy(desc(mentors.createdAt));
}
async function createMentor(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(mentors).values(data);
}
async function updateMentor(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(mentors).set(data).where(eq(mentors.id, id));
}
async function deleteMentor(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(mentors).where(eq(mentors.id, id));
}
async function getAllBudgets() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(budgets).orderBy(desc(budgets.fiscalYear));
}
async function createBudget(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(budgets).values(data);
}
async function updateBudget(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(budgets).set(data).where(eq(budgets.id, id));
}
async function deleteBudget(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(budgets).where(eq(budgets.id, id));
}
async function getAllExpenses() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(expenses).orderBy(desc(expenses.expenseDate));
}
async function createExpense(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(expenses).values(data);
}
async function updateExpense(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(expenses).set(data).where(eq(expenses.id, id));
}
async function deleteExpense(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(expenses).where(eq(expenses.id, id));
}
async function getAllWebPages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(webPages).orderBy(desc(webPages.updatedAt));
}
async function getWebPageBySlug(slug) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(webPages).where(eq(webPages.slug, slug)).limit(1);
  return result[0] || null;
}
async function createWebPage(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(webPages).values(data);
}
async function updateWebPage(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(webPages).set(data).where(eq(webPages.id, id));
}
async function deleteWebPage(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(webPages).where(eq(webPages.id, id));
}
async function getAllEmployees() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(employees).orderBy(desc(employees.createdAt));
}
async function getEmployeeById(id) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(employees).where(eq(employees.id, id)).limit(1);
  return result[0] || null;
}
async function createEmployee(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(employees).values(data);
}
async function updateEmployee(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(employees).set(data).where(eq(employees.id, id));
}
async function deleteEmployee(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(employees).where(eq(employees.id, id));
}
async function getAllAttendance() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(attendance).orderBy(desc(attendance.date));
}
async function getAttendanceByEmployeeId(employeeId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(attendance).where(eq(attendance.employeeId, employeeId)).orderBy(desc(attendance.date));
}
async function createAttendance(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(attendance).values(data);
}
async function updateAttendance(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(attendance).set(data).where(eq(attendance.id, id));
}
async function deleteAttendance(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(attendance).where(eq(attendance.id, id));
}
async function getAllInvoices() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
}
async function getInvoiceById(id) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  return result[0] || null;
}
async function createInvoice(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(invoices).values(data);
}
async function updateInvoice(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(invoices).set(data).where(eq(invoices.id, id));
}
async function deleteInvoice(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(invoices).where(eq(invoices.id, id));
}
async function getAllTransactions() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(transactions).orderBy(desc(transactions.transactionDate));
}
async function getTransactionById(id) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(transactions).where(eq(transactions.id, id)).limit(1);
  return result[0] || null;
}
async function createTransaction(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(transactions).values(data);
}
async function updateTransaction(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(transactions).set(data).where(eq(transactions.id, id));
}
async function deleteTransaction(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(transactions).where(eq(transactions.id, id));
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    init_schema();
    init_schema();
    init_schema();
    _db = null;
  }
});

// server/_core/index.ts
import path3 from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/oauth.ts
init_db();

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
init_db();
init_env();
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.log("[Notification] Service not configured, skipping notification");
    return false;
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
init_db();
import { z as z2 } from "zod";
var appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  // Application submissions
  applications: router({
    submit: publicProcedure.input(z2.object({
      fullName: z2.string().min(1),
      email: z2.string().email(),
      phone: z2.string().min(1),
      country: z2.string().min(1),
      city: z2.string().min(1),
      track: z2.enum(["technical", "business"]),
      careerPath: z2.enum(["egypt", "uae", "international", "entrepreneurship"]),
      education: z2.string().min(1),
      currentRole: z2.string().optional(),
      yearsExperience: z2.number().optional(),
      technicalBackground: z2.string().optional(),
      motivation: z2.string().min(1),
      goals: z2.string().min(1),
      linkedinUrl: z2.string().optional(),
      portfolioUrl: z2.string().optional()
    })).mutation(async ({ input }) => {
      try {
        console.log("[API] Application submission received:", input.email, "for", input.track, "track");
        const result = await createApplication(input);
        console.log("[API] Application saved successfully");
        try {
          await notifyOwner({
            title: "New Orkestra Ventures Application",
            content: `New application from ${input.fullName} (${input.email}) for ${input.track} track.`
          });
        } catch (notifyError) {
          console.warn("[API] Application notification failed (non-critical):", notifyError);
        }
        return { success: true };
      } catch (error) {
        console.error("[API] Application submission failed:", error);
        throw error;
      }
    })
  }),
  // Contact form submissions
  contacts: router({
    submit: publicProcedure.input(z2.object({
      name: z2.string().min(1),
      email: z2.string().email(),
      phone: z2.string().optional(),
      subject: z2.string().min(1),
      message: z2.string().min(1)
    })).mutation(async ({ input }) => {
      try {
        console.log("[API] Contact submission received:", input.email);
        const result = await createContact(input);
        console.log("[API] Contact saved successfully");
        try {
          await notifyOwner({
            title: "New Contact Form Submission",
            content: `${input.name} (${input.email}) sent a message: ${input.subject}`
          });
        } catch (notifyError) {
          console.warn("[API] Notification failed (non-critical):", notifyError);
        }
        return { success: true };
      } catch (error) {
        console.error("[API] Contact submission failed:", error);
        throw error;
      }
    })
  }),
  // Admin queries and mutations
  admin: router({
    getStats: publicProcedure.query(async () => {
      const applications2 = await getAllApplications();
      const contacts2 = await getAllContacts();
      const newsletterSubs = await getAllNewsletterSubscribers();
      return {
        totalApplications: applications2.length,
        totalContacts: contacts2.length,
        totalNewsletter: newsletterSubs.length,
        recentApplications: applications2.slice(0, 5),
        recentContacts: contacts2.slice(0, 5)
      };
    }),
    getAllApplications: publicProcedure.query(async () => {
      return await getAllApplications();
    }),
    getAllContacts: publicProcedure.query(async () => {
      return await getAllContacts();
    }),
    getAllNewsletter: publicProcedure.query(async () => {
      return await getAllNewsletterSubscribers();
    }),
    updateApplicationStatus: publicProcedure.input(z2.object({
      id: z2.number(),
      status: z2.enum(["pending", "reviewing", "accepted", "rejected"])
    })).mutation(async ({ input }) => {
      await updateApplicationStatus(input.id, input.status);
      return { success: true };
    }),
    deleteApplication: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      await deleteApplication(input.id);
      return { success: true };
    }),
    updateContactStatus: publicProcedure.input(z2.object({
      id: z2.number(),
      status: z2.enum(["new", "in_progress", "resolved"])
    })).mutation(async ({ input }) => {
      await updateContactStatus(input.id, input.status);
      return { success: true };
    }),
    deleteContact: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      await deleteContact(input.id);
      return { success: true };
    }),
    unsubscribeNewsletter: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      await unsubscribeNewsletter(input.id);
      return { success: true };
    })
  }),
  // Newsletter subscriptions
  newsletter: router({
    subscribe: publicProcedure.input(z2.object({
      email: z2.string().email(),
      name: z2.string().optional()
    })).mutation(async ({ input }) => {
      try {
        console.log("[API] Newsletter subscription requested:", input.email);
        const result = await createNewsletterSubscriber(input);
        console.log("[API] Newsletter subscription saved successfully");
        return { success: true };
      } catch (error) {
        if (error instanceof Error && error.message === "Email already subscribed") {
          console.warn("[API] Email already subscribed:", input.email);
          return { success: false, error: "This email is already subscribed to our newsletter." };
        }
        console.error("[API] Newsletter subscription failed:", error);
        throw error;
      }
    })
  }),
  // ============================================
  // ENTERPRISE MODULE ROUTERS
  // ============================================
  // Lead/CRM Management
  leads: router({
    getAll: publicProcedure.query(async () => {
      const { getAllLeads: getAllLeads2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllLeads2();
    }),
    create: publicProcedure.input(z2.object({
      firstName: z2.string().min(1),
      lastName: z2.string().min(1),
      email: z2.string().email(),
      phone: z2.string().optional(),
      company: z2.string().optional(),
      source: z2.enum(["website", "referral", "event", "social_media", "partner", "other"]).optional(),
      status: z2.enum(["new", "contacted", "qualified", "converted", "lost"]).optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { createLead: createLead2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await createLead2(input);
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      firstName: z2.string().optional(),
      lastName: z2.string().optional(),
      email: z2.string().email().optional(),
      phone: z2.string().optional(),
      company: z2.string().optional(),
      source: z2.enum(["website", "referral", "event", "social_media", "partner", "other"]).optional(),
      status: z2.enum(["new", "contacted", "qualified", "converted", "lost"]).optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { updateLead: updateLead2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, ...data } = input;
      return await updateLead2(id, data);
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteLead: deleteLead2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteLead2(input.id);
    })
  }),
  // Cohort Management
  cohorts: router({
    getAll: publicProcedure.query(async () => {
      const { getAllCohorts: getAllCohorts2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllCohorts2();
    }),
    create: publicProcedure.input(z2.object({
      name: z2.string().min(1),
      code: z2.string().min(1),
      startDate: z2.string(),
      endDate: z2.string(),
      capacity: z2.number(),
      enrolled: z2.number().optional(),
      status: z2.enum(["planning", "recruiting", "active", "completed"]).optional(),
      location: z2.string().optional(),
      description: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { createCohort: createCohort2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { startDate, endDate, ...data } = input;
      return await createCohort2({
        ...data,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      });
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      name: z2.string().optional(),
      code: z2.string().optional(),
      startDate: z2.string().optional(),
      endDate: z2.string().optional(),
      capacity: z2.number().optional(),
      enrolled: z2.number().optional(),
      status: z2.enum(["planning", "recruiting", "active", "completed"]).optional(),
      location: z2.string().optional(),
      description: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { updateCohort: updateCohort2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, startDate, endDate, ...data } = input;
      const updateData = {
        ...data,
        ...startDate ? { startDate: new Date(startDate) } : {},
        ...endDate ? { endDate: new Date(endDate) } : {}
      };
      return await updateCohort2(id, updateData);
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteCohort: deleteCohort2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteCohort2(input.id);
    })
  }),
  // Mentor Management
  mentors: router({
    getAll: publicProcedure.query(async () => {
      const { getAllMentors: getAllMentors2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllMentors2();
    }),
    create: publicProcedure.input(z2.object({
      firstName: z2.string().min(1),
      lastName: z2.string().min(1),
      email: z2.string().email(),
      phone: z2.string().optional(),
      company: z2.string().optional(),
      expertise: z2.string().optional(),
      bio: z2.string().optional(),
      status: z2.enum(["active", "inactive"]).optional(),
      sessionsCompleted: z2.number().optional()
    })).mutation(async ({ input }) => {
      const { createMentor: createMentor2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await createMentor2(input);
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      firstName: z2.string().optional(),
      lastName: z2.string().optional(),
      email: z2.string().email().optional(),
      phone: z2.string().optional(),
      company: z2.string().optional(),
      expertise: z2.string().optional(),
      bio: z2.string().optional(),
      status: z2.enum(["active", "inactive"]).optional(),
      sessionsCompleted: z2.number().optional()
    })).mutation(async ({ input }) => {
      const { updateMentor: updateMentor2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, ...data } = input;
      return await updateMentor2(id, data);
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteMentor: deleteMentor2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteMentor2(input.id);
    })
  }),
  // Budget Management
  budgets: router({
    getAll: publicProcedure.query(async () => {
      const { getAllBudgets: getAllBudgets2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllBudgets2();
    }),
    create: publicProcedure.input(z2.object({
      name: z2.string().min(1),
      category: z2.enum(["operations", "marketing", "programs", "hr", "other"]),
      allocated: z2.string(),
      spent: z2.string().optional(),
      fiscalYear: z2.number(),
      status: z2.enum(["active", "closed"]).optional()
    })).mutation(async ({ input }) => {
      const { createBudget: createBudget2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await createBudget2(input);
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      name: z2.string().optional(),
      category: z2.enum(["operations", "marketing", "programs", "hr", "other"]).optional(),
      allocated: z2.string().optional(),
      spent: z2.string().optional(),
      fiscalYear: z2.number().optional(),
      status: z2.enum(["active", "closed"]).optional()
    })).mutation(async ({ input }) => {
      const { updateBudget: updateBudget2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, ...data } = input;
      return await updateBudget2(id, data);
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteBudget: deleteBudget2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteBudget2(input.id);
    })
  }),
  // Expense Management
  expenses: router({
    getAll: publicProcedure.query(async () => {
      const { getAllExpenses: getAllExpenses2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllExpenses2();
    }),
    create: publicProcedure.input(z2.object({
      budgetId: z2.number().optional(),
      category: z2.string().min(1),
      description: z2.string().min(1),
      amount: z2.string(),
      expenseDate: z2.string(),
      vendor: z2.string().optional(),
      status: z2.enum(["pending", "approved", "paid"]).optional()
    })).mutation(async ({ input }) => {
      const { createExpense: createExpense2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { expenseDate, ...data } = input;
      return await createExpense2({
        ...data,
        expenseDate: new Date(expenseDate)
      });
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      budgetId: z2.number().optional(),
      category: z2.string().optional(),
      description: z2.string().optional(),
      amount: z2.string().optional(),
      expenseDate: z2.string().optional(),
      vendor: z2.string().optional(),
      status: z2.enum(["pending", "approved", "paid"]).optional()
    })).mutation(async ({ input }) => {
      const { updateExpense: updateExpense2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, expenseDate, ...data } = input;
      const updateData = {
        ...data,
        ...expenseDate ? { expenseDate: new Date(expenseDate) } : {}
      };
      return await updateExpense2(id, updateData);
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteExpense: deleteExpense2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteExpense2(input.id);
    })
  }),
  // Web Content Management
  webPages: router({
    getAll: publicProcedure.query(async () => {
      const { getAllWebPages: getAllWebPages2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllWebPages2();
    }),
    getBySlug: publicProcedure.input(z2.object({ slug: z2.string() })).query(async ({ input }) => {
      const { getWebPageBySlug: getWebPageBySlug2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getWebPageBySlug2(input.slug);
    }),
    create: publicProcedure.input(z2.object({
      slug: z2.string().min(1),
      title: z2.string().min(1),
      content: z2.string().min(1),
      status: z2.enum(["draft", "published"]).optional(),
      updatedBy: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { createWebPage: createWebPage2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await createWebPage2(input);
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      slug: z2.string().optional(),
      title: z2.string().optional(),
      content: z2.string().optional(),
      status: z2.enum(["draft", "published"]).optional(),
      updatedBy: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { updateWebPage: updateWebPage2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, ...data } = input;
      return await updateWebPage2(id, data);
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteWebPage: deleteWebPage2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteWebPage2(input.id);
    })
  }),
  // HR Management - Employees
  employees: router({
    getAll: publicProcedure.query(async () => {
      const { getAllEmployees: getAllEmployees2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllEmployees2();
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      const { getEmployeeById: getEmployeeById2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getEmployeeById2(input.id);
    }),
    create: publicProcedure.input(z2.object({
      employeeId: z2.string().min(1),
      fullName: z2.string().min(1),
      email: z2.string().email(),
      phone: z2.string().optional(),
      position: z2.string().min(1),
      department: z2.enum(["management", "operations", "marketing", "technology", "finance", "hr"]),
      employmentType: z2.enum(["full-time", "part-time", "contract", "intern"]),
      salary: z2.string().optional(),
      currency: z2.string().optional(),
      hireDate: z2.string(),
      endDate: z2.string().optional(),
      status: z2.enum(["active", "on-leave", "terminated"]).optional(),
      address: z2.string().optional(),
      emergencyContact: z2.string().optional(),
      emergencyPhone: z2.string().optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { createEmployee: createEmployee2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { hireDate, endDate, ...data } = input;
      return await createEmployee2({
        ...data,
        hireDate: new Date(hireDate),
        ...endDate && { endDate: new Date(endDate) }
      });
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      employeeId: z2.string().optional(),
      fullName: z2.string().optional(),
      email: z2.string().email().optional(),
      phone: z2.string().optional(),
      position: z2.string().optional(),
      department: z2.enum(["management", "operations", "marketing", "technology", "finance", "hr"]).optional(),
      employmentType: z2.enum(["full-time", "part-time", "contract", "intern"]).optional(),
      salary: z2.string().optional(),
      currency: z2.string().optional(),
      hireDate: z2.string().optional(),
      endDate: z2.string().optional(),
      status: z2.enum(["active", "on-leave", "terminated"]).optional(),
      address: z2.string().optional(),
      emergencyContact: z2.string().optional(),
      emergencyPhone: z2.string().optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { updateEmployee: updateEmployee2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, hireDate, endDate, ...data } = input;
      return await updateEmployee2(id, {
        ...data,
        ...hireDate && { hireDate: new Date(hireDate) },
        ...endDate && { endDate: new Date(endDate) }
      });
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteEmployee: deleteEmployee2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteEmployee2(input.id);
    })
  }),
  // HR Management - Attendance
  attendance: router({
    getAll: publicProcedure.query(async () => {
      const { getAllAttendance: getAllAttendance2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllAttendance2();
    }),
    getByEmployeeId: publicProcedure.input(z2.object({ employeeId: z2.number() })).query(async ({ input }) => {
      const { getAttendanceByEmployeeId: getAttendanceByEmployeeId2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAttendanceByEmployeeId2(input.employeeId);
    }),
    create: publicProcedure.input(z2.object({
      employeeId: z2.number(),
      date: z2.string(),
      checkIn: z2.string().optional(),
      checkOut: z2.string().optional(),
      status: z2.enum(["present", "absent", "late", "half-day", "leave"]),
      leaveType: z2.enum(["sick", "vacation", "personal", "unpaid"]).optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { createAttendance: createAttendance2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { date: date2, ...data } = input;
      return await createAttendance2({
        ...data,
        date: new Date(date2)
      });
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      employeeId: z2.number().optional(),
      date: z2.string().optional(),
      checkIn: z2.string().optional(),
      checkOut: z2.string().optional(),
      status: z2.enum(["present", "absent", "late", "half-day", "leave"]).optional(),
      leaveType: z2.enum(["sick", "vacation", "personal", "unpaid"]).optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { updateAttendance: updateAttendance2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, date: date2, ...data } = input;
      return await updateAttendance2(id, {
        ...data,
        ...date2 && { date: new Date(date2) }
      });
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteAttendance: deleteAttendance2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteAttendance2(input.id);
    })
  }),
  // Accounting - Invoices
  invoices: router({
    getAll: publicProcedure.query(async () => {
      const { getAllInvoices: getAllInvoices2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllInvoices2();
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      const { getInvoiceById: getInvoiceById2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getInvoiceById2(input.id);
    }),
    create: publicProcedure.input(z2.object({
      invoiceNumber: z2.string().min(1),
      clientName: z2.string().min(1),
      clientEmail: z2.string().email().optional(),
      description: z2.string().min(1),
      amount: z2.string(),
      currency: z2.string().optional(),
      taxAmount: z2.string().optional(),
      totalAmount: z2.string(),
      status: z2.enum(["draft", "sent", "paid", "overdue", "cancelled"]).optional(),
      issueDate: z2.string(),
      dueDate: z2.string(),
      paidDate: z2.string().optional(),
      paymentMethod: z2.string().optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { createInvoice: createInvoice2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { issueDate, dueDate, paidDate, ...data } = input;
      return await createInvoice2({
        ...data,
        issueDate: new Date(issueDate),
        dueDate: new Date(dueDate),
        ...paidDate && { paidDate: new Date(paidDate) }
      });
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      invoiceNumber: z2.string().optional(),
      clientName: z2.string().optional(),
      clientEmail: z2.string().email().optional(),
      description: z2.string().optional(),
      amount: z2.string().optional(),
      currency: z2.string().optional(),
      taxAmount: z2.string().optional(),
      totalAmount: z2.string().optional(),
      status: z2.enum(["draft", "sent", "paid", "overdue", "cancelled"]).optional(),
      issueDate: z2.string().optional(),
      dueDate: z2.string().optional(),
      paidDate: z2.string().optional(),
      paymentMethod: z2.string().optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { updateInvoice: updateInvoice2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, issueDate, dueDate, paidDate, ...data } = input;
      return await updateInvoice2(id, {
        ...data,
        ...issueDate && { issueDate: new Date(issueDate) },
        ...dueDate && { dueDate: new Date(dueDate) },
        ...paidDate && { paidDate: new Date(paidDate) }
      });
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteInvoice: deleteInvoice2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteInvoice2(input.id);
    })
  }),
  // Accounting - Transactions
  transactions: router({
    getAll: publicProcedure.query(async () => {
      const { getAllTransactions: getAllTransactions2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getAllTransactions2();
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      const { getTransactionById: getTransactionById2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await getTransactionById2(input.id);
    }),
    create: publicProcedure.input(z2.object({
      transactionNumber: z2.string().min(1),
      type: z2.enum(["income", "expense"]),
      category: z2.string().min(1),
      description: z2.string().min(1),
      amount: z2.string(),
      currency: z2.string().optional(),
      paymentMethod: z2.string().optional(),
      referenceNumber: z2.string().optional(),
      relatedInvoiceId: z2.number().optional(),
      relatedExpenseId: z2.number().optional(),
      transactionDate: z2.string(),
      status: z2.enum(["completed", "pending", "cancelled"]).optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { createTransaction: createTransaction2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { transactionDate, ...data } = input;
      return await createTransaction2({
        ...data,
        transactionDate: new Date(transactionDate)
      });
    }),
    update: publicProcedure.input(z2.object({
      id: z2.number(),
      transactionNumber: z2.string().optional(),
      type: z2.enum(["income", "expense"]).optional(),
      category: z2.string().optional(),
      description: z2.string().optional(),
      amount: z2.string().optional(),
      currency: z2.string().optional(),
      paymentMethod: z2.string().optional(),
      referenceNumber: z2.string().optional(),
      relatedInvoiceId: z2.number().optional(),
      relatedExpenseId: z2.number().optional(),
      transactionDate: z2.string().optional(),
      status: z2.enum(["completed", "pending", "cancelled"]).optional(),
      notes: z2.string().optional()
    })).mutation(async ({ input }) => {
      const { updateTransaction: updateTransaction2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { id, transactionDate, ...data } = input;
      return await updateTransaction2(id, {
        ...data,
        ...transactionDate && { transactionDate: new Date(transactionDate) }
      });
    }),
    delete: publicProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      const { deleteTransaction: deleteTransaction2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      return await deleteTransaction2(input.id);
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path3.dirname(__filename);
var envPath = path3.resolve(__dirname, "../../.env.local");
var envConfig = dotenv.config({ path: envPath });
console.log("[Server] Loaded environment from:", envPath);
console.log("[Server] DATABASE_URL loaded:", !!process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
  console.log("[Server] DATABASE URL (first 60 chars):", process.env.DATABASE_URL.substring(0, 60) + "...");
}
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
