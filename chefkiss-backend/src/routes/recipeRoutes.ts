import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createRecipe, listRecipes } from "../controllers/recipeController.js";

const router = Router();

router.post("/", authMiddleware, createRecipe);
router.get("/", authMiddleware, listRecipes);

export default router;
