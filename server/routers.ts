import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createApplication, createContact, createNewsletterSubscriber, getAllApplications, getAllContacts, getAllNewsletterSubscribers, updateApplicationStatus, deleteApplication, updateContactStatus, deleteContact, unsubscribeNewsletter } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Application submissions
  applications: router({
    submit: publicProcedure
      .input(z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        country: z.string().min(1),
        city: z.string().min(1),
        track: z.enum(["technical", "business"]),
        careerPath: z.enum(["egypt", "uae", "international", "entrepreneurship"]),
        education: z.string().min(1),
        currentRole: z.string().optional(),
        yearsExperience: z.number().optional(),
        technicalBackground: z.string().optional(),
        motivation: z.string().min(1),
        goals: z.string().min(1),
        linkedinUrl: z.string().optional(),
        portfolioUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          console.log("[API] Application submission received:", input.email, "for", input.track, "track");
          const result = await createApplication(input);
          console.log("[API] Application saved successfully");
          
          // Notify owner about new application
          try {
            await notifyOwner({
              title: "New Orkestra Ventures Application",
              content: `New application from ${input.fullName} (${input.email}) for ${input.track} track.`,
            });
          } catch (notifyError) {
            console.warn("[API] Application notification failed (non-critical):", notifyError);
          }
          
          return { success: true };
        } catch (error) {
          console.error("[API] Application submission failed:", error);
          throw error;
        }
      }),
  }),

  // Contact form submissions
  contacts: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(1),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        try {
          console.log("[API] Contact submission received:", input.email);
          const result = await createContact(input);
          console.log("[API] Contact saved successfully");
          
          // Notify owner about new contact
          try {
            await notifyOwner({
              title: "New Contact Form Submission",
              content: `${input.name} (${input.email}) sent a message: ${input.subject}`,
            });
          } catch (notifyError) {
            console.warn("[API] Notification failed (non-critical):", notifyError);
          }
          
          return { success: true };
        } catch (error) {
          console.error("[API] Contact submission failed:", error);
          throw error;
        }
      }),
  }),

  // Admin queries and mutations
  admin: router({
    getStats: publicProcedure.query(async () => {
      const applications = await getAllApplications();
      const contacts = await getAllContacts();
      const newsletterSubs = await getAllNewsletterSubscribers();
      
      return {
        totalApplications: applications.length,
        totalContacts: contacts.length,
        totalNewsletter: newsletterSubs.length,
        recentApplications: applications.slice(0, 5),
        recentContacts: contacts.slice(0, 5),
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
    
    updateApplicationStatus: publicProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "reviewing", "accepted", "rejected"]),
      }))
      .mutation(async ({ input }) => {
        await updateApplicationStatus(input.id, input.status);
        return { success: true };
      }),
    
    deleteApplication: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteApplication(input.id);
        return { success: true };
      }),
    
    updateContactStatus: publicProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "in_progress", "resolved"]),
      }))
      .mutation(async ({ input }) => {
        await updateContactStatus(input.id, input.status);
        return { success: true };
      }),
    
    deleteContact: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteContact(input.id);
        return { success: true };
      }),
    
    unsubscribeNewsletter: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await unsubscribeNewsletter(input.id);
        return { success: true };
      }),
  }),

  // Newsletter subscriptions
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          console.log("[API] Newsletter subscription requested:", input.email);
          const result = await createNewsletterSubscriber(input);
          console.log("[API] Newsletter subscription saved successfully");
          return { success: true };
        } catch (error) {
          if (error instanceof Error && error.message === 'Email already subscribed') {
            console.warn("[API] Email already subscribed:", input.email);
            return { success: false, error: 'This email is already subscribed to our newsletter.' };
          }
          console.error("[API] Newsletter subscription failed:", error);
          throw error;
        }
      }),
  }),

  // ============================================
  // ENTERPRISE MODULE ROUTERS
  // ============================================

  // Lead/CRM Management
  leads: router({
    getAll: publicProcedure.query(async () => {
      const { getAllLeads } = await import("./db");
      return await getAllLeads();
    }),
    create: publicProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        source: z.enum(["website", "referral", "event", "social_media", "partner", "other"]).optional(),
        status: z.enum(["new", "contacted", "qualified", "converted", "lost"]).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { createLead } = await import("./db");
        return await createLead(input);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
        source: z.enum(["website", "referral", "event", "social_media", "partner", "other"]).optional(),
        status: z.enum(["new", "contacted", "qualified", "converted", "lost"]).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateLead } = await import("./db");
        const { id, ...data } = input;
        return await updateLead(id, data);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteLead } = await import("./db");
        return await deleteLead(input.id);
      }),
  }),

  // Cohort Management
  cohorts: router({
    getAll: publicProcedure.query(async () => {
      const { getAllCohorts } = await import("./db");
      return await getAllCohorts();
    }),
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        code: z.string().min(1),
        startDate: z.string(),
        endDate: z.string(),
        capacity: z.number(),
        enrolled: z.number().optional(),
        status: z.enum(["planning", "recruiting", "active", "completed"]).optional(),
        location: z.string().optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { createCohort } = await import("./db");
        const { startDate, endDate, ...data } = input;
        return await createCohort({
          ...data,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        });
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        code: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        capacity: z.number().optional(),
        enrolled: z.number().optional(),
        status: z.enum(["planning", "recruiting", "active", "completed"]).optional(),
        location: z.string().optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateCohort } = await import("./db");
        const { id, startDate, endDate, ...data } = input;
        const updateData = {
          ...data,
          ...(startDate ? { startDate: new Date(startDate) } : {}),
          ...(endDate ? { endDate: new Date(endDate) } : {}),
        };
        return await updateCohort(id, updateData);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteCohort } = await import("./db");
        return await deleteCohort(input.id);
      }),
  }),

  // Mentor Management
  mentors: router({
    getAll: publicProcedure.query(async () => {
      const { getAllMentors } = await import("./db");
      return await getAllMentors();
    }),
    create: publicProcedure
      .input(z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        expertise: z.string().optional(),
        bio: z.string().optional(),
        status: z.enum(["active", "inactive"]).optional(),
        sessionsCompleted: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { createMentor } = await import("./db");
        return await createMentor(input);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        company: z.string().optional(),
        expertise: z.string().optional(),
        bio: z.string().optional(),
        status: z.enum(["active", "inactive"]).optional(),
        sessionsCompleted: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateMentor } = await import("./db");
        const { id, ...data } = input;
        return await updateMentor(id, data);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteMentor } = await import("./db");
        return await deleteMentor(input.id);
      }),
  }),

  // Budget Management
  budgets: router({
    getAll: publicProcedure.query(async () => {
      const { getAllBudgets } = await import("./db");
      return await getAllBudgets();
    }),
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        category: z.enum(["operations", "marketing", "programs", "hr", "other"]),
        allocated: z.string(),
        spent: z.string().optional(),
        fiscalYear: z.number(),
        status: z.enum(["active", "closed"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { createBudget } = await import("./db");
        return await createBudget(input);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        category: z.enum(["operations", "marketing", "programs", "hr", "other"]).optional(),
        allocated: z.string().optional(),
        spent: z.string().optional(),
        fiscalYear: z.number().optional(),
        status: z.enum(["active", "closed"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateBudget } = await import("./db");
        const { id, ...data } = input;
        return await updateBudget(id, data);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteBudget } = await import("./db");
        return await deleteBudget(input.id);
      }),
  }),

  // Expense Management
  expenses: router({
    getAll: publicProcedure.query(async () => {
      const { getAllExpenses } = await import("./db");
      return await getAllExpenses();
    }),
    create: publicProcedure
      .input(z.object({
        budgetId: z.number().optional(),
        category: z.string().min(1),
        description: z.string().min(1),
        amount: z.string(),
        expenseDate: z.string(),
        vendor: z.string().optional(),
        status: z.enum(["pending", "approved", "paid"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { createExpense } = await import("./db");
        const { expenseDate, ...data } = input;
        return await createExpense({
          ...data,
          expenseDate: new Date(expenseDate),
        });
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        budgetId: z.number().optional(),
        category: z.string().optional(),
        description: z.string().optional(),
        amount: z.string().optional(),
        expenseDate: z.string().optional(),
        vendor: z.string().optional(),
        status: z.enum(["pending", "approved", "paid"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateExpense } = await import("./db");
        const { id, expenseDate, ...data } = input;
        const updateData = {
          ...data,
          ...(expenseDate ? { expenseDate: new Date(expenseDate) } : {}),
        };
        return await updateExpense(id, updateData);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteExpense } = await import("./db");
        return await deleteExpense(input.id);
      }),
  }),

  // Web Content Management
  webPages: router({
    getAll: publicProcedure.query(async () => {
      const { getAllWebPages } = await import("./db");
      return await getAllWebPages();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const { getWebPageBySlug } = await import("./db");
        return await getWebPageBySlug(input.slug);
      }),
    create: publicProcedure
      .input(z.object({
        slug: z.string().min(1),
        title: z.string().min(1),
        content: z.string().min(1),
        status: z.enum(["draft", "published"]).optional(),
        updatedBy: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { createWebPage } = await import("./db");
        return await createWebPage(input);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        slug: z.string().optional(),
        title: z.string().optional(),
        content: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
        updatedBy: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateWebPage } = await import("./db");
        const { id, ...data } = input;
        return await updateWebPage(id, data);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteWebPage } = await import("./db");
        return await deleteWebPage(input.id);
      }),
  }),

  // HR Management - Employees
  employees: router({
    getAll: publicProcedure.query(async () => {
      const { getAllEmployees } = await import("./db");
      return await getAllEmployees();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const { getEmployeeById } = await import("./db");
        return await getEmployeeById(input.id);
      }),
    create: publicProcedure
      .input(z.object({
        employeeId: z.string().min(1),
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        position: z.string().min(1),
        department: z.enum(["management", "operations", "marketing", "technology", "finance", "hr"]),
        employmentType: z.enum(["full-time", "part-time", "contract", "intern"]),
        salary: z.string().optional(),
        currency: z.string().optional(),
        hireDate: z.string(),
        endDate: z.string().optional(),
        status: z.enum(["active", "on-leave", "terminated"]).optional(),
        address: z.string().optional(),
        emergencyContact: z.string().optional(),
        emergencyPhone: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { createEmployee } = await import("./db");
        const { hireDate, endDate, ...data } = input;
        return await createEmployee({
          ...data,
          hireDate: new Date(hireDate),
          ...(endDate && { endDate: new Date(endDate) }),
        });
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        employeeId: z.string().optional(),
        fullName: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        position: z.string().optional(),
        department: z.enum(["management", "operations", "marketing", "technology", "finance", "hr"]).optional(),
        employmentType: z.enum(["full-time", "part-time", "contract", "intern"]).optional(),
        salary: z.string().optional(),
        currency: z.string().optional(),
        hireDate: z.string().optional(),
        endDate: z.string().optional(),
        status: z.enum(["active", "on-leave", "terminated"]).optional(),
        address: z.string().optional(),
        emergencyContact: z.string().optional(),
        emergencyPhone: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateEmployee } = await import("./db");
        const { id, hireDate, endDate, ...data } = input;
        return await updateEmployee(id, {
          ...data,
          ...(hireDate && { hireDate: new Date(hireDate) }),
          ...(endDate && { endDate: new Date(endDate) }),
        });
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteEmployee } = await import("./db");
        return await deleteEmployee(input.id);
      }),
  }),

  // HR Management - Attendance
  attendance: router({
    getAll: publicProcedure.query(async () => {
      const { getAllAttendance } = await import("./db");
      return await getAllAttendance();
    }),
    getByEmployeeId: publicProcedure
      .input(z.object({ employeeId: z.number() }))
      .query(async ({ input }) => {
        const { getAttendanceByEmployeeId } = await import("./db");
        return await getAttendanceByEmployeeId(input.employeeId);
      }),
    create: publicProcedure
      .input(z.object({
        employeeId: z.number(),
        date: z.string(),
        checkIn: z.string().optional(),
        checkOut: z.string().optional(),
        status: z.enum(["present", "absent", "late", "half-day", "leave"]),
        leaveType: z.enum(["sick", "vacation", "personal", "unpaid"]).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { createAttendance } = await import("./db");
        const { date, ...data } = input;
        return await createAttendance({
          ...data,
          date: new Date(date),
        });
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        employeeId: z.number().optional(),
        date: z.string().optional(),
        checkIn: z.string().optional(),
        checkOut: z.string().optional(),
        status: z.enum(["present", "absent", "late", "half-day", "leave"]).optional(),
        leaveType: z.enum(["sick", "vacation", "personal", "unpaid"]).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateAttendance } = await import("./db");
        const { id, date, ...data } = input;
        return await updateAttendance(id, {
          ...data,
          ...(date && { date: new Date(date) }),
        });
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteAttendance } = await import("./db");
        return await deleteAttendance(input.id);
      }),
  }),

  // Accounting - Invoices
  invoices: router({
    getAll: publicProcedure.query(async () => {
      const { getAllInvoices } = await import("./db");
      return await getAllInvoices();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const { getInvoiceById } = await import("./db");
        return await getInvoiceById(input.id);
      }),
    create: publicProcedure
      .input(z.object({
        invoiceNumber: z.string().min(1),
        clientName: z.string().min(1),
        clientEmail: z.string().email().optional(),
        description: z.string().min(1),
        amount: z.string(),
        currency: z.string().optional(),
        taxAmount: z.string().optional(),
        totalAmount: z.string(),
        status: z.enum(["draft", "sent", "paid", "overdue", "cancelled"]).optional(),
        issueDate: z.string(),
        dueDate: z.string(),
        paidDate: z.string().optional(),
        paymentMethod: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { createInvoice } = await import("./db");
        const { issueDate, dueDate, paidDate, ...data } = input;
        return await createInvoice({
          ...data,
          issueDate: new Date(issueDate),
          dueDate: new Date(dueDate),
          ...(paidDate && { paidDate: new Date(paidDate) }),
        });
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        invoiceNumber: z.string().optional(),
        clientName: z.string().optional(),
        clientEmail: z.string().email().optional(),
        description: z.string().optional(),
        amount: z.string().optional(),
        currency: z.string().optional(),
        taxAmount: z.string().optional(),
        totalAmount: z.string().optional(),
        status: z.enum(["draft", "sent", "paid", "overdue", "cancelled"]).optional(),
        issueDate: z.string().optional(),
        dueDate: z.string().optional(),
        paidDate: z.string().optional(),
        paymentMethod: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateInvoice } = await import("./db");
        const { id, issueDate, dueDate, paidDate, ...data } = input;
        return await updateInvoice(id, {
          ...data,
          ...(issueDate && { issueDate: new Date(issueDate) }),
          ...(dueDate && { dueDate: new Date(dueDate) }),
          ...(paidDate && { paidDate: new Date(paidDate) }),
        });
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteInvoice } = await import("./db");
        return await deleteInvoice(input.id);
      }),
  }),

  // Accounting - Transactions
  transactions: router({
    getAll: publicProcedure.query(async () => {
      const { getAllTransactions } = await import("./db");
      return await getAllTransactions();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const { getTransactionById } = await import("./db");
        return await getTransactionById(input.id);
      }),
    create: publicProcedure
      .input(z.object({
        transactionNumber: z.string().min(1),
        type: z.enum(["income", "expense"]),
        category: z.string().min(1),
        description: z.string().min(1),
        amount: z.string(),
        currency: z.string().optional(),
        paymentMethod: z.string().optional(),
        referenceNumber: z.string().optional(),
        relatedInvoiceId: z.number().optional(),
        relatedExpenseId: z.number().optional(),
        transactionDate: z.string(),
        status: z.enum(["completed", "pending", "cancelled"]).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { createTransaction } = await import("./db");
        const { transactionDate, ...data } = input;
        return await createTransaction({
          ...data,
          transactionDate: new Date(transactionDate),
        });
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        transactionNumber: z.string().optional(),
        type: z.enum(["income", "expense"]).optional(),
        category: z.string().optional(),
        description: z.string().optional(),
        amount: z.string().optional(),
        currency: z.string().optional(),
        paymentMethod: z.string().optional(),
        referenceNumber: z.string().optional(),
        relatedInvoiceId: z.number().optional(),
        relatedExpenseId: z.number().optional(),
        transactionDate: z.string().optional(),
        status: z.enum(["completed", "pending", "cancelled"]).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateTransaction } = await import("./db");
        const { id, transactionDate, ...data } = input;
        return await updateTransaction(id, {
          ...data,
          ...(transactionDate && { transactionDate: new Date(transactionDate) }),
        });
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteTransaction } = await import("./db");
        return await deleteTransaction(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
