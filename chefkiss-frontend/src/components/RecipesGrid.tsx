import RecipeCard from "./RecipeCard";

type recipeType = {
  id: string;
  name: string;
  tags: string[];
};

type recipesGridProps = {
  recipes: recipeType[];
};

function RecipesGrid({ recipes }: recipesGridProps) {
  return (
    <section
      aria-label="Lista de receitas"
      className="mt-6 rounded-2xl border border-border bg-surface-2/60 p-5 shadow-soft"
    >
      {recipes.length === 0 ? (
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
              name={recipe.name}
              tags={recipe.tags}
            ></RecipeCard>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecipesGrid;
