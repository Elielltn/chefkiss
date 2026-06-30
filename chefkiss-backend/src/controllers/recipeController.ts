import type { Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import prisma from "../lib/prisma.js";
import {
  createRecipeSchema,
  listRecipeSchema,
} from "../schemas/recipeSchemas.js";

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

export async function listRecipes(req: AuthRequest, res: Response) {
  const result = listRecipeSchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  const { page, limit, search, category } = result.data;

  const where = {
    authorId: req.userId as string,
    ...(search && { name: { contains: search, mode: "insensitive" as const } }),
    ...(category && { categories: { has: category } }),
  };

  const [recipes, total] = await Promise.all([
    prisma.recipe.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: "asc" },
    }),
    prisma.recipe.count({ where }),
  ]);

  res.status(200).json({
    data: recipes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
