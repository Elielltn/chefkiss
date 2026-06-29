import { z } from "zod";

const ingredientSchema = z.object({
  name: z.string().min(1),
  quantity: z.string().min(1),
  unit: z.string().min(1),
});

export const createRecipeSchema = z.object({
  name: z.string().min(1),
  categories: z.array(z.string()).min(1).max(2),
  ingredients: z.array(ingredientSchema).min(1),
  steps: z.array(z.string().min(1)).min(1),
  tips: z.array(z.string()).optional(),
});
