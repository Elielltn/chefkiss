import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import SecHead from "./SecHead";
import CategoryBtn from "./CategoryBtn";
import IngredientInputArea from "./IngredientInputArea";
import StepInputArea from "./StepInputArea";
import TipInputArea from "./TipInputArea";
import type { typeIngredient } from "../types/typeIngridient";
import { categories } from "../constants/categories";
import { useState } from "react";

type addRecipeModalProps = {
  onClose: () => void;
};

function AddRecipeModal({ onClose }: addRecipeModalProps) {
  const [recipeName, setRecipeName] = useState("");
  const [recipeCats, setRecipeCats] = useState<string[]>([]);
  const [recipeIngs, setRecipeIngs] = useState<typeIngredient[]>([
    { name: "", quantity: "", unit: "g" },
  ]);
  const [recipeSteps, setRecipeSteps] = useState([""]);
  const [recipeTips, setRecipeTips] = useState([""]);

  function toggleCategory(category: string) {
    setRecipeCats((categories) =>
      categories.includes(category)
        ? categories.filter((x) => x !== category)
        : [...categories, category],
    );
  }

  function addIngredient() {
    setRecipeIngs((ings) => [...ings, { name: "", quantity: "", unit: "g" }]);
  }

  function handleRemoveIngredient(id: number) {
    setRecipeIngs((ings) => ings.filter((_, i) => i !== id));
  }

  function handleUpdateIngredient(id: number, key: string, newValue: string) {
    setRecipeIngs((ings) =>
      ings.map((ing, i) => (i === id ? { ...ing, [key]: newValue } : ing)),
    );
  }

  function handleAddStep() {
    setRecipeSteps((steps) => [...steps, ""]);
  }

  function handleRemoveStep(id: number) {
    setRecipeSteps((steps) => steps.filter((_, i) => i !== id));
  }

  function handleUpdateStep(id: number, newValue: string) {
    setRecipeSteps((recipeSteps) =>
      recipeSteps.map((step, i) => (i === id ? newValue : step)),
    );
  }

  function handleAddTip() {
    setRecipeTips((tips) => [...tips, ""]);
  }

  function handleRemoveTip(id: number) {
    setRecipeTips((recipeTips) => recipeTips.filter((_, i) => i !== id));
  }

  function handleUpdateTip(id: number, newValue: string) {
    setRecipeTips((tips) => tips.map((tip, i) => (i === id ? newValue : tip)));
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-10 flex items-center justify-center">
      <div className="modal bg-white rounded-xl max-h-[90vh] max-w-[640px] w-full flex flex-col overflow-hidden">
        <div className="flex align-center justify-between border-b-1 border-b-[#593700] px-[30px] py-[22px]">
          <h2 className="text-[22px]">Nova Receita</h2>
          <button onClick={onClose} className="text-[22px] cursor-pointer">
            ×
          </button>
        </div>
        <div className="py-[24px] px-[30px] overflow-y-auto flex flex-col gap-[26px]">
          <div>
            <Label labelContent="Nome da receita *" />
            <Input
              value={recipeName}
              setValue={setRecipeName}
              placeholder="Ex: Bolo de Limão Siciliano"
            />
          </div>

          <div>
            <SecHead title="Categorias" />
            <div className="flex flex-wrap gap-[8px] mt-[12px]">
              {categories.map((cat) => (
                <CategoryBtn
                  key={cat}
                  label={cat}
                  active={recipeCats.includes(cat)}
                  onClick={() => toggleCategory(cat)}
                />
              ))}
            </div>
          </div>

          <div>
            <SecHead title="Ingredientes" />
            <div className="flex flex-col gap-[10px] mt-[12px]">
              {recipeIngs.map((ing, i) => (
                <IngredientInputArea
                  key={i}
                  ingredient={ing}
                  ingsArr={recipeIngs}
                  onRemoveIngredient={() => handleRemoveIngredient(i)}
                  onChange={(key: string, newValue: string) =>
                    handleUpdateIngredient(i, key, newValue)
                  }
                />
              ))}
              <Button
                classes="self-start"
                style="dashed"
                text="+ Adicionar ingrediente"
                onClick={() => addIngredient()}
              />
            </div>
          </div>

          <div>
            <SecHead title="Passo a passo" />
            <div className="flex flex-col gap-[10px] mt-[12px]">
              {recipeSteps.map((step, i) => (
                <StepInputArea
                  key={i}
                  id={i}
                  stepsArr={recipeSteps}
                  step={step}
                  onRemoveStep={() => handleRemoveStep(i)}
                  onChange={(newValue: string) => handleUpdateStep(i, newValue)}
                />
              ))}
              <Button
                classes="self-start ml-[38px]"
                style="dashed"
                text="+ Adicionar passo"
                onClick={() => handleAddStep()}
              />
            </div>
          </div>

          <div>
            <SecHead title="Dicas (Opcional)" />
            <div className="flex flex-col gap-[10px] mt-[12px]">
              {recipeTips.map((tip, i) => (
                <TipInputArea
                  key={i}
                  tip={tip}
                  tipsArr={recipeTips}
                  onChange={(newValue: string) => handleUpdateTip(i, newValue)}
                  onRemoveTip={() => handleRemoveTip(i)}
                />
              ))}
              <Button
                classes="self-start"
                style="dashed"
                text="+ Adicionar ingrediente"
                onClick={() => handleAddTip()}
              />
            </div>
          </div>
        </div>
        <div className="py-[18px] px-[30px] border-t border-t-[#8B5E2C33] flex justify-between shrink-0">
          <button
            onClick={onClose}
            className="bg-transparent text-[#5C3010] border-[1.5px] border-solid border-[#8B5E2C] rounded-lg py-[11px] px-[22px] text-[14px] font-medium cursor-pointer font-sans"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="bg-[#3D1800] text-[#FDF5E6] border-none rounded-lg py-[11px] px-[22px] text-[14px] font-medium cursor-pointer font-sans flex items-center gap-[6px]"
          >
            Salvar receita →
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeModal;
