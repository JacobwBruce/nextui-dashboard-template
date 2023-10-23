import { Client } from "@planetscale/database";
import mysql from "mysql2/promise";
import { drizzle as MySqlDrizzle } from "drizzle-orm/mysql2";
import { drizzle as PlanetScaleDrizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "~/env.mjs";
import * as schema from "./schema";

const isPlanetScale = env.DATABASE_URL.includes("planetscale");

export const db = isPlanetScale
  ? PlanetScaleDrizzle(
      new Client({
        url: env.DATABASE_URL,
      }).connection(),
      { schema },
    )
  : MySqlDrizzle(
      await mysql.createConnection({
        uri: env.DATABASE_URL,
      }),
    );

export type DrizzleEntity = typeof db;
