import type { Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import prisma from "../lib/prisma.js";
import {
  createRecipeSchema,
  listRecipeSchema,
  recipeIdSchema,
} from "../schemas/recipeSchemas.js";
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
      include: { ingredients: true },
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

export async function getRecipeById(req: AuthRequest, res: Response) {
  const result = recipeIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  const { id } = result.data;

  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: { ingredients: true },
  });

  if (!recipe) {
    return res.status(404).json({ error: "Receita não encontrada." });
  }

  if (recipe.authorId !== req.userId) {
    return res.status(403).json({ error: "Acesso negado." });
  }

  return res.status(200).json(recipe);
}

export async function deleteRecipe(req: AuthRequest, res: Response) {
  const result = recipeIdSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  const { id } = result.data;

  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });

  if (!recipe) {
    return res.status(404).json({ error: "Receita não encontrada." });
  }

  if (recipe.authorId !== req.userId) {
    return res.status(403).json({ error: "Acesso negado." });
  }

  await prisma.recipe.delete({
    where: {
      id,
    },
  });

  return res.status(204).send();
}
