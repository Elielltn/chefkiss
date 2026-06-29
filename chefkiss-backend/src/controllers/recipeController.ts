import type { Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import prisma from "../lib/prisma.js";
import { createRecipeSchema } from "../schemas/recipeSchemas.js";
import { error } from "node:console";

export async function createRecipe(req: AuthRequest, res: Response) {
  const result = createRecipeSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  const { name, categories, ingredients, steps, tips } = result.data;

  const recipe = await prisma.recipe.create({
    data: {
      name,
      categories,
      steps,
      tips: tips ?? [],
      authorId: req.userId as string,
      ingredients: {
        create: ingredients,
      },
    },
    include: {
      ingredients: true,
    },
  });

  return res.status(201).json(recipe);
}
