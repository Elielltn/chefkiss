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

export const listRecipeSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(48).default(8),
  search: z.string().optional(),
  category: z.string().optional(),
});

export const recipeIdSchema = z.object({
  id: z.uuid(),
});

export const updateRecipeSchema = createRecipeSchema;
