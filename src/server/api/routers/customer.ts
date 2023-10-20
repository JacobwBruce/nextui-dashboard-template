import {
  customerSchema,
  insertCustomerSchema,
} from "~/schema/customers/CustomerSchemas";
import { customers } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { asc, desc, eq, like, sql } from "drizzle-orm";

export const customerRouter = createTRPCRouter({
  create: publicProcedure
    .input(insertCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(customers).values(input);
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
    .input(
      z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
        sortBy: z.object({
          column: customerSchema.keyof(),
          direction: z.enum(["ascending", "descending"]),
        }),
        search: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { column, direction } = input.sortBy;
      const orderBy =
        direction === "ascending"
          ? asc(customers[column])
          : desc(customers[column]);
      const fullTextSearch = like(customers.name, `%${input.search}%`);

      const countResult = await ctx.db
        // for some reason tsserver doesn't think select can take any arguments
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .select({ count: sql<number>`count(*)` })
        .from(customers)
        .where(fullTextSearch);

      // adding ts-ignore becuase of the above reason
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const count: number = countResult[0].count;

      const result = await ctx.db
        .select()
        .from(customers)
        .where(fullTextSearch)
        .orderBy(orderBy)
        .limit(input.limit ?? 100)
        .offset(input.offset ?? 0);
      return {
        count,
        customers: result,
      };
    }),
  deleteMany: publicProcedure
    .input(z.set(z.number()))
    .mutation(async ({ ctx, input }) => {
      try {
        for (const id of input) {
          console.log(id);
          await ctx.db.delete(customers).where(eq(customers.id, id));
        }
        return { status: "ok" };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete customers",
        });
      }
    }),
});
