import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';

// Messages table for the message wall
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Type exports
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert; 
