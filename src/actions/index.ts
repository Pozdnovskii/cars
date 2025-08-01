import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase";

export const server = {
  filterCars: defineAction({
    input: z.object({
      brand: z.string().optional(),
      engine: z.string().optional(),
    }),
    handler: async ({ brand = "", engine = "" }) => {
      let query = supabase
        .from("vehicles")
        .select("id, brand, model, body, engine");

      if (brand) query = query.eq("brand", brand);
      if (engine) query = query.eq("engine", engine);

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  }),
};
