import type { typeIngredient } from "../types/typeIngridient";

type ingredientContainerProps = {
  ing: typeIngredient;
};

function IngredientContainer({ ing }: ingredientContainerProps) {
  return (
    <div className="bg-[#FFFAF2] flex items-center justify-between rounded-lg px-4 py-2.5">
      <span className="text-[#1A0800] text-sm font-normal font-sans">
        {ing.name}
      </span>
      <span className="text-[#5C3010] bg-[#DDB87070] rounded-md px-2.5 py-0.5 text-[13px] font-medium font-sans">
        {ing.quantity} {ing.unit}
      </span>
    </div>
  );
}

export default IngredientContainer;
