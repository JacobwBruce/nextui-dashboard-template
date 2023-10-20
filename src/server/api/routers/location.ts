import { createTRPCRouter } from "../trpc";
import { z } from "zod";
import { publicProcedure } from "../trpc";
import { env } from "~/env.mjs";
import { TRPCError } from "@trpc/server";

export const locationRouter = createTRPCRouter({
  search: publicProcedure.input(z.string()).query(async ({ input }) => {
    const api_key = env.GOOGLE_MAPS_API_KEY;

    if (!api_key) throw new Error("No Google Maps API key provided");

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${api_key}`,
    );
    const data = await response.json();

    if (data.status !== "OK") {
      console.error(data);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong with the Google Maps API",
      });
    }

    const locations: Array<string> = data.predictions.map(
      (location: any) => location.description,
    );

    return locations;
  }),
});
