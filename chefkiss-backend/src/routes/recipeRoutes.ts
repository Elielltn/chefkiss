import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createRecipe,
  listRecipes,
  getRecipeById,
  deleteRecipe,
} from "../controllers/recipeController.js";

const router = Router();

router.post("/", authMiddleware, createRecipe);
router.get("/", authMiddleware, listRecipes);
router.get("/:id", authMiddleware, getRecipeById);
router.delete("/:id", authMiddleware, deleteRecipe);

export default router;
