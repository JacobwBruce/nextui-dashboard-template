import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  getCustomersSchema,
  insertCustomerSchema,
} from "~/schema/customers/CustomerSchemas";
import { creditCards, customers } from "~/server/db/schema";
import {
  createCustomer,
  deleteCustomers,
  getCustomerById,
  getCustomers,
  getCustomersCount,
} from "../repositories/CustomersRepository";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getCustomersCreditCards } from "../repositories/CardsRepository";

export const customerRouter = createTRPCRouter({
  create: publicProcedure
    .input(insertCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await createCustomer(ctx.db, input);
        return { status: "ok" };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create customer",
        });
      }
    }),
  getAll: publicProcedure
    .input(getCustomersSchema)
    .query(async ({ ctx, input }) => {
      const promises = [
        getCustomers(ctx.db, input),
        getCustomersCount(ctx.db, input),
      ];
      const [customers, count] = await Promise.all(promises);
      return {
        count,
        customers,
      };
    }),
  deleteMany: publicProcedure
    .input(z.set(z.number()))
    .mutation(async ({ ctx, input }) => {
      try {
        await deleteCustomers(ctx.db, input);
        return { status: "ok" };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete customers",
        });
      }
    }),
  getById: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const customer = await getCustomerById(ctx.db, input);

    if (!customer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Customer not found",
      });
    }
    const creditCards = getCustomersCreditCards(ctx.db, input);
    return { ...customer, creditCards };
  }),
});
