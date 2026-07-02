import Input from "./Input";
import { units } from "../constants/units";
import type { typeIngredient } from "../types/typeIngridient";

type ingredientInputAreaProps = {
  ingredient: typeIngredient;
  ingsArr: typeIngredient[];
  onRemoveIngredient: () => void;
  onChange: (key: string, newValue: string) => void;
};

function IngredientInputArea({
  ingredient,
  ingsArr,
  onRemoveIngredient,
  onChange,
}: ingredientInputAreaProps) {
  return (
    <div className="flex items-center gap-[8px]">
      <Input
        value={ingredient.name}
        placeholder="Ingrediente"
        setValue={(newValue) => onChange("name", newValue)}
      />
      <Input
        value={ingredient.quantity}
        placeholder="Quantidade"
        setValue={(newValue) => onChange("quantity", newValue)}
      />
      <select
        className="h-10 rounded-lg border border-border bg-surface px-2 text-sm focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
        value={ingredient.unit}
        onChange={(e) => {
          onChange("unit", e.target.value);
        }}
      >
        {units.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>
      {ingsArr.length > 1 && (
        <button
          className="bg-transparent border-none cursor-pointer text-[20px] px-[4px] leading-none shrink-[0]"
          onClick={() => onRemoveIngredient()}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default IngredientInputArea;
