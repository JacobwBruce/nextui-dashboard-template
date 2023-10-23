import { type DrizzleEntity } from "~/server/db";
import { creditCards } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function getCustomersCreditCards(
  db: DrizzleEntity,
  customerId: number,
) {
  try {
    const result = await db
      .select()
      .from(creditCards)
      .where(eq(creditCards.customerId, customerId));
    return result;
  } catch (error) {
    return error;
  }
}
