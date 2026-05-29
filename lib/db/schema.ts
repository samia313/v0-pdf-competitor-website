import { pgTable, text, timestamp, boolean, serial, integer, jsonb } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Using neon_auth schema tables - these already exist

// --- App tables ------------------------------------------------------------

// Orders table for payment orders
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderId: text('orderId').notNull().unique(),
  userId: text('userId'),
  customerName: text('customerName').notNull(),
  customerEmail: text('customerEmail').notNull(),
  customerPhone: text('customerPhone').notNull(),
  planId: text('planId').notNull(),
  planName: text('planName').notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull().default('PKR'),
  paymentMethod: text('paymentMethod').notNull(),
  paymentStatus: text('paymentStatus').notNull().default('pending'),
  paymentProof: text('paymentProof'),
  notes: text('notes'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  verifiedAt: timestamp('verifiedAt'),
  verifiedBy: text('verifiedBy'),
})

// Subscriptions table
export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  userEmail: text('userEmail').notNull(),
  planId: text('planId').notNull(),
  planName: text('planName').notNull(),
  status: text('status').notNull().default('active'),
  startDate: timestamp('startDate').notNull().defaultNow(),
  endDate: timestamp('endDate').notNull(),
  orderId: text('orderId'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Admin users table
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  role: text('role').notNull().default('admin'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Usage tracking
export const usageTracking = pgTable('usage_tracking', {
  id: serial('id').primaryKey(),
  userId: text('userId'),
  ipAddress: text('ipAddress'),
  toolUsed: text('toolUsed').notNull(),
  fileSize: integer('fileSize'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Contact form submissions
export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  respondedAt: timestamp('respondedAt'),
})
