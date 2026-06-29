import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createRecipe } from "../controllers/recipeController.js";

const router = Router();

router.post("/", authMiddleware, createRecipe);

export default router;
