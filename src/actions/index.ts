import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase";

export const server = {
  filterCars: defineAction({
    input: z.object({
      brand: z.string().optional(),
      engine: z.string().optional(),
      body: z.string().optional(),
      slug: z.string().optional(),
      image_src: z.string().optional(),
      offset: z.number().default(0), // новый параметр
      limit: z.number().default(15), // новый параметр
    }),
    handler: async ({
      brand = "",
      engine = "",
      body = "",
      offset = 0,
      limit = 11,
    }) => {
      let query = supabase
        .from("vehicles")
        .select("id, brand, model, body, engine, slug, image_src", {
          count: "exact",
        })
        .not("image_src", "is", null)
        .range(offset, offset + limit - 1); // пагинация в Supabase

      if (brand) query = query.eq("brand", brand);
      if (engine) query = query.eq("engine", engine);
      if (body) query = query.eq("body", body);

      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return {
        cars: data || [],
        total: count || 0,
        hasMore: offset + limit < (count || 0),
      };
    },
  }),
};
