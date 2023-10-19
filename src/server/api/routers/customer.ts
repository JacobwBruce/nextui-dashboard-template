import { insertCustomerSchema } from "~/schema/customers/CustomerSchemas";
import { customers } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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
});
