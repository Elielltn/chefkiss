import RecipeCard from "./RecipeCard";
import type { typeRecipe } from "../types/typeRecipe";

type recipesGridProps = {
  recipes: typeRecipe[];
  isLoading: boolean;
  showLoading: boolean;
  onClick: () => void;
  hasMore: boolean;
  unauthorized: boolean;
};

function RecipesGrid({
  recipes,
  isLoading,
  showLoading,
  onClick,
  hasMore,
  unauthorized,
}: recipesGridProps) {
  return (
    <section
      aria-label="Lista de receitas"
      className="mt-6 rounded-2xl border border-border bg-surface-2/60 p-5 shadow-soft"
    >
      {showLoading && isLoading ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="font-display text-xl text-foreground">
            Aguarde enquanto buscamos suas receitas...
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center"></div>
      ) : unauthorized ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="font-display text-xl text-foreground">
            Faça login para acessar as suas receitas.
          </p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <p className="font-display text-xl text-foreground">
            Nenhuma receita encontrada
          </p>
          <p className="text-sm text-muted-foreground">
            Tente outro termo ou adicione uma nova receita.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              categories={recipe.categories}
            ></RecipeCard>
          ))}
        </div>
      )}
      {recipes.length > 0 && hasMore && !isLoading ? (
        <button
          onClick={onClick}
          className="mx-auto mt-6 block w-36 rounded-xl bg-primary text-sm text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-elevated focus-visible:focus-ring py-3"
        >
          Mostrar mais
        </button>
      ) : null}
    </section>
  );
}

export default RecipesGrid;
