// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  double,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const customers = mysqlTable("customers", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  customerNumber: varchar("customer_number", { length: 256 }).unique(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  phone: varchar("phone_number", { length: 256 }),
  address: varchar("address", { length: 256 }),
  specialInstructions: text("special_instructions"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const userRelations = relations(customers, ({ many }) => ({
  creditCards: many(creditCards),
}));

export const creditCards = mysqlTable("credit_cards", {
  id: int("id").primaryKey().autoincrement(),
  customerId: int("customer_id"),
  cardNumber: varchar("card_number", { length: 256 }).unique().notNull(),
  expirationDate: timestamp("expiration_date"),
  cvv: varchar("cvv", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const creditCardRelations = relations(creditCards, ({ one, many }) => ({
  customer: one(customers, {
    fields: [creditCards.customerId],
    references: [customers.id],
  }),
  transactions: many(transactions),
}));

export const transactions = mysqlTable("transactions", {
  id: int("id").primaryKey().autoincrement(),
  creditCardId: int("credit_card_id"),
  amount: double("amount").notNull(),
  completionDate: timestamp("completion_date"),
  requestDate: timestamp("request_date").notNull(),
  iataCode: varchar("iata_code", { length: 256 }),
  recurring: boolean("recurring").default(false),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const transactionRelations = relations(transactions, ({ one }) => ({
  creditCard: one(creditCards, {
    fields: [transactions.creditCardId],
    references: [creditCards.id],
  }),
}));
