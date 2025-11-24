import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, applications, contacts, newsletterSubscribers, InsertApplication, InsertContact, InsertNewsletterSubscriber } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
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

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Application form submissions
 */
export async function createApplication(application: InsertApplication) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(applications).values(application);
  return result;
}

export async function getAllApplications() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(applications).orderBy(applications.createdAt);
}

export async function getApplicationById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Contact form submissions
 */
export async function createContact(contact: InsertContact) {
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

export async function getAllContacts() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(contacts).orderBy(contacts.createdAt);
}

/**
 * Newsletter subscriptions
 */
export async function createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(newsletterSubscribers).values(subscriber);
    return result;
  } catch (error) {
    // Handle duplicate email error
    if (error instanceof Error && error.message.includes('Duplicate entry')) {
      throw new Error('Email already subscribed');
    }
    throw error;
  }
}

export async function getAllNewsletterSubscribers() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, 1)).orderBy(newsletterSubscribers.createdAt);
}

/**
 * Update application status
 */
export async function updateApplicationStatus(id: number, status: "pending" | "reviewing" | "accepted" | "rejected") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(applications).set({ status }).where(eq(applications.id, id));
}

/**
 * Delete application
 */
export async function deleteApplication(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(applications).where(eq(applications.id, id));
}

/**
 * Update contact status
 */
export async function updateContactStatus(id: number, status: "new" | "in_progress" | "resolved") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(contacts).set({ status }).where(eq(contacts.id, id));
}

/**
 * Delete contact
 */
export async function deleteContact(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(contacts).where(eq(contacts.id, id));
}

/**
 * Unsubscribe from newsletter
 */
export async function unsubscribeNewsletter(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(newsletterSubscribers).set({ isActive: 0, unsubscribedAt: new Date() }).where(eq(newsletterSubscribers.id, id));
}


// Site Settings Functions
export async function getAllSiteSettings() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const { siteSettings } = await import("../drizzle/schema");
    return await db.select().from(siteSettings);
  } catch (error) {
    console.error("[Database] Error fetching site settings:", error);
    return [];
  }
}

export async function getSiteSetting(key: string) {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const { siteSettings } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    const results = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key));
    return results[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching site setting:", error);
    return null;
  }
}

export async function updateSiteSetting(key: string, value: string, type: "text" | "url" | "image" | "number" | "json" = "text") {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const { siteSettings } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    
    // Check if setting exists
    const existing = await getSiteSetting(key);
    
    if (existing) {
      // Update existing
      await db.update(siteSettings)
        .set({ settingValue: value, settingType: type })
        .where(eq(siteSettings.settingKey, key));
    } else {
      // Insert new
      await db.insert(siteSettings).values({
        settingKey: key,
        settingValue: value,
        settingType: type,
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error("[Database] Error updating site setting:", error);
    return null;
  }
}

// ============================================
// ENTERPRISE MODULE DATABASE FUNCTIONS
// ============================================

// Import new tables
import { leads, cohorts, mentors, budgets, expenses, webPages } from "../drizzle/schema";

// Lead Management Functions
export async function getAllLeads() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function createLead(data: typeof leads.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(leads).values(data);
}

export async function updateLead(id: number, data: Partial<typeof leads.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(leads).set(data).where(eq(leads.id, id));
}

export async function deleteLead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(leads).where(eq(leads.id, id));
}

// Cohort Management Functions
export async function getAllCohorts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(cohorts).orderBy(desc(cohorts.startDate));
}

export async function createCohort(data: typeof cohorts.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(cohorts).values(data);
}

export async function updateCohort(id: number, data: Partial<typeof cohorts.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(cohorts).set(data).where(eq(cohorts.id, id));
}

export async function deleteCohort(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(cohorts).where(eq(cohorts.id, id));
}

// Mentor Management Functions
export async function getAllMentors() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(mentors).orderBy(desc(mentors.createdAt));
}

export async function createMentor(data: typeof mentors.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(mentors).values(data);
}

export async function updateMentor(id: number, data: Partial<typeof mentors.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(mentors).set(data).where(eq(mentors.id, id));
}

export async function deleteMentor(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(mentors).where(eq(mentors.id, id));
}

// Budget Management Functions
export async function getAllBudgets() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(budgets).orderBy(desc(budgets.fiscalYear));
}

export async function createBudget(data: typeof budgets.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(budgets).values(data);
}

export async function updateBudget(id: number, data: Partial<typeof budgets.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(budgets).set(data).where(eq(budgets.id, id));
}

export async function deleteBudget(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(budgets).where(eq(budgets.id, id));
}

// Expense Management Functions
export async function getAllExpenses() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(expenses).orderBy(desc(expenses.expenseDate));
}

export async function createExpense(data: typeof expenses.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(expenses).values(data);
}

export async function updateExpense(id: number, data: Partial<typeof expenses.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(expenses).set(data).where(eq(expenses.id, id));
}

export async function deleteExpense(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(expenses).where(eq(expenses.id, id));
}

// Web Pages Management Functions
export async function getAllWebPages() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(webPages).orderBy(desc(webPages.updatedAt));
}

export async function getWebPageBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(webPages).where(eq(webPages.slug, slug)).limit(1);
  return result[0] || null;
}

export async function createWebPage(data: typeof webPages.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(webPages).values(data);
}

export async function updateWebPage(id: number, data: Partial<typeof webPages.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(webPages).set(data).where(eq(webPages.id, id));
}

export async function deleteWebPage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(webPages).where(eq(webPages.id, id));
}

// ==================== HR MANAGEMENT ====================

import { employees, attendance } from "../drizzle/schema";

export async function getAllEmployees() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(employees).orderBy(desc(employees.createdAt));
}

export async function getEmployeeById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(employees).where(eq(employees.id, id)).limit(1);
  return result[0] || null;
}

export async function createEmployee(data: typeof employees.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(employees).values(data);
}

export async function updateEmployee(id: number, data: Partial<typeof employees.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(employees).set(data).where(eq(employees.id, id));
}

export async function deleteEmployee(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(employees).where(eq(employees.id, id));
}

export async function getAllAttendance() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(attendance).orderBy(desc(attendance.date));
}

export async function getAttendanceByEmployeeId(employeeId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(attendance).where(eq(attendance.employeeId, employeeId)).orderBy(desc(attendance.date));
}

export async function createAttendance(data: typeof attendance.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(attendance).values(data);
}

export async function updateAttendance(id: number, data: Partial<typeof attendance.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(attendance).set(data).where(eq(attendance.id, id));
}

export async function deleteAttendance(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(attendance).where(eq(attendance.id, id));
}

// ==================== ACCOUNTING ====================

import { invoices, transactions } from "../drizzle/schema";

export async function getAllInvoices() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
}

export async function getInvoiceById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  return result[0] || null;
}

export async function createInvoice(data: typeof invoices.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(invoices).values(data);
}

export async function updateInvoice(id: number, data: Partial<typeof invoices.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(invoices).set(data).where(eq(invoices.id, id));
}

export async function deleteInvoice(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(invoices).where(eq(invoices.id, id));
}

export async function getAllTransactions() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(transactions).orderBy(desc(transactions.transactionDate));
}

export async function getTransactionById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(transactions).where(eq(transactions.id, id)).limit(1);
  return result[0] || null;
}

export async function createTransaction(data: typeof transactions.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(transactions).values(data);
}

export async function updateTransaction(id: number, data: Partial<typeof transactions.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(transactions).set(data).where(eq(transactions.id, id));
}

export async function deleteTransaction(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(transactions).where(eq(transactions.id, id));
}
