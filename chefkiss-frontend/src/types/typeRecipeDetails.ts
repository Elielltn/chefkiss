import type { typeIngredient } from "./typeIngridient";

export type typeRecipeDetails = {
  name: string;
  categories: string[];
  steps: string[];
  tips: string[];
  ingredients: typeIngredient[];
};
