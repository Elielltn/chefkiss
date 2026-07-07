import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import TagBadge from "../components/TagBadge";
import IngredientContainer from "../components/IngredientContainer";
import StepContainer from "../components/StepContainer";
import Logo from "../components/Logo";
import type { typeRecipeDetails } from "../types/typeRecipeDetails";

import { ArrowLeft, Lightbulb } from "lucide-react";

function RecipeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<typeRecipeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRecipeDetails() {
      setIsLoading(true);
      setShowLoading(false);

      const loadingTimer = setTimeout(() => {
        setShowLoading(true);
      }, 400);

      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Faça login para ver detalhes das suas receitas");
        clearTimeout(loadingTimer);
        return;
      }

      const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      clearTimeout(loadingTimer);

      if (!response.ok) {
        setError(true);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      setData(data);
      setIsLoading(false);
    }

    fetchRecipeDetails();
  }, [id]);
  
  if (isLoading) {
    return null; // ou um container vazio do mesmo tamanho, pra evitar layout shift
  }

  if (isLoading && showLoading) {
    return (
      <main className="min-h-dvh grid place-items-center">
        <div className="flex flex-col items-center gap-1.5">
          <Logo fontSize={42} />
          <div className="flex flex-col items-center gap-1.5">
            <p>Carregando receita...</p>
            <button
              onClick={() => navigate("/recipes")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-secondary hover:border-border-strong focus-visible:focus-ring"
            >
              <ArrowLeft className="size-4" />
              Voltar
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-dvh grid place-items-center">
        <div className="flex flex-col items-center gap-1.5">
          <Logo fontSize={42} />
          <div className="flex flex-col items-center gap-1.5">
            <p>Receita não encontrada.</p>
            <button
              onClick={() => navigate("/recipes")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-secondary hover:border-border-strong focus-visible:focus-ring"
            >
              <ArrowLeft className="size-4" />
              Voltar
            </button>
          </div>
        </div>
      </main>
    );
  }

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
          {data?.categories.map((cat) => (
            <TagBadge key={cat} label={cat} />
          ))}
        </div>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
          {data?.name}
        </h1>

        <article className="mt-8 rounded-2xl border border-border bg-surface-2/60 p-6 shadow-soft md:p-8">
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Ingredientes
            </h2>
            <ul className="mt-4 space-y-2">
              {data?.ingredients.map((ing, i) => (
                <IngredientContainer key={i} ing={ing} i={i} />
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Como fazer
            </h2>
            <ol className="mt-4 space-y-4">
              {data?.steps.map((s, i) => (
                <StepContainer key={i} step={s} i={i} />
              ))}
            </ol>
          </section>

          {(data?.tips?.length ?? 0) > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Dicas
              </h2>
              {data?.tips.map((tip, i) => (
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
