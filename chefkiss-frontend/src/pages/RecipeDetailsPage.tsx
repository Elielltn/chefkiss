import TagBadge from "../components/TagBadge";
import IngredientContainer from "../components/IngredientContainer";
import StepContainer from "../components/StepContainer";

import { ArrowLeft, Lightbulb } from "lucide-react";

import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-4xl px-6 py-10 md:py-14">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("/recipes")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-secondary hover:border-border-strong focus-visible:focus-ring"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </button>
          {tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
          {recipeName}
        </h1>

        <article className="mt-8 rounded-2xl border border-border bg-surface-2/60 p-6 shadow-soft md:p-8">
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Ingredientes
            </h2>
            <ul className="mt-4 space-y-2">
              {ingredients.map((ing, i) => (
                <IngredientContainer ing={ing} i={i} />
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Como fazer
            </h2>
            <ol className="mt-4 space-y-4">
              {steps.map((s, i) => (
                <StepContainer step={s} i={i} />
              ))}
            </ol>
          </section>

          {tips.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Dicas
              </h2>
              {tips.map((tip, i) => (
                <div
                  key={i}
                  className="mt-4 flex items-start gap-3 rounded-lg border-l-4 border-accent bg-surface px-4 py-3 shadow-soft"
                >
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent" />
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </section>
          )}
        </article>
      </div>
    </main>
  );
}

export default RecipeDetailsPage;
