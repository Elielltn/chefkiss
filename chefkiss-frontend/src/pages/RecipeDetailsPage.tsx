import TagBadge from "../components/TagBadge";
import RecipeSection from "../components/RecipeSection";
import IngredientContainer from "../components/IngredientContainer";
import StepContainer from "../components/StepContainer";

const tags = ["Sobremesa", "Doce"];
const recipeName = "Torta de chocolate";
const ingredients = [
  { name: "Chocolate", quantity: "1", unit: "Kg" },
  { name: "Leite", quantity: "1", unit: "L" },
  { name: "Sal", quantity: "20", unit: "Mg" },
  { name: "Leite", quantity: "1", unit: "L" },
];
const steps = ["Passo 1", "Passo 2", "Passo 3", "Passo 4"];
const tips = ["Cuidado para não queimar o recheio"];

function RecipeDetailsPage() {
  return (
    <div className="max-w-[1440px] w-full mx-auto flex flex-col py-[20px] px-[20px]">
      <div className="flex gap-[20px] mb-[28px] items-start">
        <button className="bg-transparent text-[#5C3010] border-[1.5px] border-solid border-[#8B5E2C] rounded-lg py-[11px] px-[22px] text-[14px] font-medium cursor-pointer py-[8px] px-[14px] text-[13px] shrink-0">
          ← Voltar
        </button>
        <div>
          <div className="flex gap-[6px] mb-[8px]">
            {tags.map((tag) => (
              <TagBadge label={tag} />
            ))}
          </div>
          <h1 className="text-[36px] text-[#593700] font-semibold">
            {recipeName}
          </h1>
        </div>
      </div>
      <div className="bg-[#D4A46B] border-2 border-[#593700] rounded-xl py-[32px] px-[36px]">
        <RecipeSection label={"Ingredientes"}>
          {ingredients.map((ing, i) => (
            <IngredientContainer key={i} ing={ing} />
          ))}
        </RecipeSection>
        <RecipeSection label={"Como fazer"} gap={14}>
          {steps.map((step, i) => (
            <StepContainer key={i} step={step} i={i} />
          ))}
        </RecipeSection>
        {tips.length > 0 && (
          <RecipeSection label={"Dicas"} gap={10}>
            {tips.map((tip, i) => (
              <div
                key={i}
                className="bg-[#FFFAF2] border-l-[3px] border-l-[#3D1800] rounded-r-lg px-[14px] py-[10px] text-[14px] text-[#1A0800] leading-[1.55] font-sans"
              >
                💡 {tip}
              </div>
            ))}
          </RecipeSection>
        )}
      </div>
    </div>
  );
}

export default RecipeDetailsPage;
