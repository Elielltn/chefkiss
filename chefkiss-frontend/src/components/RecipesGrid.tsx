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
    <div className="grid grid-cols-4 gap-[20px] bg-[#D4A46B] border-2 border-[#593700] rounded-xl p-[40px]">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          name={recipe.name}
          tags={recipe.tags}
        ></RecipeCard>
      ))}
    </div>
  );
}

export default RecipesGrid;
