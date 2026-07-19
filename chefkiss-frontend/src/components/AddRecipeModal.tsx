import Label from "./Label";
import AddButton from "./AddButton";
import SecHead from "./SecHead";
import CategoryBtn from "./CategoryBtn";
import IngredientInputArea from "./IngredientInputArea";
import StepInputArea from "./StepInputArea";
import TipInputArea from "./TipInputArea";
import type { typeIngredient } from "../types/typeIngridient";
import { categories } from "../constants/categories";
import { useState } from "react";

import { X, ArrowRight } from "lucide-react";

type addRecipeModalProps = {
  onClose: () => void;
  onSuccess: () => void;
  update?: boolean;
  id?: string;
  name?: string;
  prevCategories?: string[];
  ingredients?: typeIngredient[];
  steps?: string[];
  tips?: string[];
};

function AddRecipeModal({
  onClose,
  onSuccess,
  update,
  id,
  name,
  prevCategories,
  ingredients,
  steps,
  tips,
}: addRecipeModalProps) {
  const [recipeName, setRecipeName] = useState(name || "");
  const [recipeCats, setRecipeCats] = useState<string[]>(prevCategories || []);
  const [recipeIngs, setRecipeIngs] = useState<typeIngredient[]>(
    ingredients || [{ name: "", quantity: "", unit: "g" }],
  );
  const [recipeSteps, setRecipeSteps] = useState(steps || [""]);
  const [recipeTips, setRecipeTips] = useState(tips || [""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleCreateRecipe() {
    setErrorMessage(null);

    const response = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: recipeName,
        categories: recipeCats,
        ingredients: recipeIngs.filter((ing) => ing.name.trim() !== ""),
        steps: recipeSteps.filter((s) => s.trim() !== ""),
        tips: recipeTips.filter((t) => t.trim() !== ""),
      }),
    });

    if (response.status === 401) {
      setErrorMessage("Faça login para criar receitas.");
      return;
    }

    if (!response.ok) {
      setErrorMessage("Erro ao adicionar receita. Verifique os campos.");
      return;
    }

    onSuccess();
    onClose();
  }

  async function handleUpdateRecipe() {
    setErrorMessage(null);
    setIsUpdating(true);

    const response = await fetch(`http://localhost:3000/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: recipeName,
        categories: recipeCats,
        ingredients: recipeIngs.filter((ing) => ing.name.trim() !== ""),
        steps: recipeSteps.filter((s) => s.trim() !== ""),
        tips: recipeTips.filter((t) => t.trim() !== ""),
      }),
    });

    if (response.status === 401) {
      setErrorMessage("Faça login para criar receitas.");
      return;
    }

    if (!response.ok) {
      setIsUpdating(false);
      return setErrorMessage("Erro ao atualizar receita. Verifique os campos.");
    }

    setIsUpdating(false);
    onSuccess();
    onClose();
  }

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
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-elevated">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            {update ? "Atualizar Receita" : "Nova Receita"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:focus-ring"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] space-y-7 overflow-y-auto px-6 py-6">
          {/* Name */}
          <div>
            <Label labelContent="Nome da receita *" />
            <input
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="Ex: Bolo de Limão Siciliano"
              className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
            />
          </div>
          {/* Categories */}
          <div>
            <SecHead title="Categorias" />
            <div className="flex flex-wrap gap-[8px] mt-[12px]">
              {categories.map((cat) => (
                <CategoryBtn
                  key={cat}
                  label={cat}
                  catsArr={recipeCats}
                  active={recipeCats.includes(cat)}
                  onClick={() => toggleCategory(cat)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <SecHead title="Ingredientes" />
            <div className="space-y-3">
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
            </div>
            <AddButton
              text="Adicionar ingrediente"
              onClick={() => addIngredient()}
            />
          </div>

          <div className="space-y-3">
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
            </div>
            <AddButton text="Adicionar passo" onClick={() => handleAddStep()} />
          </div>

          <div className="space-y-3">
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
            </div>
            <AddButton text="Adicionar dica" onClick={() => handleAddTip()} />
          </div>
        </div>

        {errorMessage && (
          <p className="px-6 text-sm text-red-600">{errorMessage}</p>
        )}

        {/* footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary focus-visible:focus-ring"
          >
            Cancelar
          </button>
          <button
            onClick={update ? handleUpdateRecipe : handleCreateRecipe}
            disabled={isUpdating}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-elevated focus-visible:focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating
              ? "Atualizando receita..."
              : update
                ? "Atualizar receita"
                : "Salvar receita"}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeModal;
