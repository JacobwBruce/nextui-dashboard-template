import {
  type GetCustomersInput,
  type InsertCustomerValues,
  getCustomersSchema,
} from "~/schema/customers/CustomerSchemas";
import { type DrizzleEntity } from "~/server/db";
import { asc, desc, like, eq, sql } from "drizzle-orm";

import { customers } from "~/server/db/schema";

export async function createCustomer(
  db: DrizzleEntity,
  customer: InsertCustomerValues,
) {
  try {
    await db.insert(customers).values(customer);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create customer");
  }
}

export async function getCustomers(
  db: DrizzleEntity,
  input: GetCustomersInput,
) {
  getCustomersSchema.parse(input);
  try {
    const { column, direction } = input.sortBy;
    const orderBy =
      direction === "ascending"
        ? asc(customers[column])
        : desc(customers[column]);
    const fullTextSearch = like(customers.name, `%${input.search}%`);

    const result = await db
      .select()
      .from(customers)
      .where(fullTextSearch)
      .orderBy(orderBy)
      .limit(input.limit ?? 100)
      .offset(input.offset ?? 0);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get customers");
  }
}

export async function getCustomersCount(
  db: DrizzleEntity,
  input: GetCustomersInput,
) {
  getCustomersSchema.parse(input);
  try {
    const fullTextSearch = like(customers.name, `%${input.search}%`);

    const countResult = await db
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
    return count;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get customers count");
  }
}

export async function deleteCustomers(db: DrizzleEntity, ids: Set<number>) {
  try {
    for (const id of ids) {
      await db.delete(customers).where(eq(customers.id, id));
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete customers");
  }
}

export async function getCustomerById(db: DrizzleEntity, id: number) {
  try {
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id));
    return customer;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get customer with id ${id}`);
  }
}
