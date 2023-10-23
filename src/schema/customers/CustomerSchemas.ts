import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { customers } from "~/server/db/schema";
import {
  addressErrorMessages,
  customerNumberErrorMessages,
  nameErrorMessages,
  phoneErrorMessages,
} from "../errors/customer/CustomerErrorMessages";

export const insertCustomerSchema = createInsertSchema(customers, {
  email: z.string().email(),
  phone: z.string(phoneErrorMessages).min(10).max(10).regex(/^\d+$/),
  name: z.string(nameErrorMessages).min(1).max(256),
  customerNumber: z.string(customerNumberErrorMessages).min(1).max(256),
  address: z.string(addressErrorMessages).min(2).max(256),
});

export type InsertCustomerValues = z.infer<typeof insertCustomerSchema>;

export const customerSchema = createSelectSchema(customers);

export type Customer = z.infer<typeof customerSchema>;

export const getCustomersSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  sortBy: z.object({
    column: customerSchema.keyof(),
    direction: z.enum(["ascending", "descending"]),
  }),
  search: z.string(),
});

export type GetCustomersInput = z.infer<typeof getCustomersSchema>;
