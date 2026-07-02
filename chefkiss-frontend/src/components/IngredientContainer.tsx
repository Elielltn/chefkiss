import type { typeIngredient } from "../types/typeIngridient";

type ingredientContainerProps = {
  ing: typeIngredient;
  i: number;
};

function IngredientContainer({ ing, i }: ingredientContainerProps) {
  return (
    <li
      key={i}
      className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 shadow-soft"
    >
      <span className="text-sm text-foreground">{ing.name}</span>
      <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
        {ing.quantity} {ing.unit}
      </span>
    </li>
  );
}

export default IngredientContainer;
