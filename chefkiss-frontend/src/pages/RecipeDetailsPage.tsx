import { useParams, useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import TagBadge from "../components/TagBadge";
import IngredientContainer from "../components/IngredientContainer";
import StepContainer from "../components/StepContainer";
import Logo from "../components/Logo";
import type { typeRecipeDetails } from "../types/typeRecipeDetails";

import {
  ArrowLeft,
  Lightbulb,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import AddRecipeModal from "../components/AddRecipeModal";

function RecipeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<typeRecipeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    setDeleteError(null);

    const result = await fetch(
      `https://chefkiss-sandy.vercel.app/recipes/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (result.status === 401) {
      setDeleteError("Você precisa estar logado para excluir uma receita");
      setIsDeleting(false);
      return;
    }

    if (!result.ok) {
      setDeleteError("Ocorreu um erro ao excluir a receita.");
      setIsDeleting(false);
      return;
    }

    navigate("/recipes");
  }

  const fetchRecipeDetails = useCallback(
    async function fetchRecipeDetails() {
      setIsLoading(true);
      setShowLoading(false);
      setError("");

      const loadingTimer = setTimeout(() => {
        setShowLoading(true);
      }, 400);

      const response = await fetch(
        `https://chefkiss-sandy.vercel.app/recipes/${id}`,
        {
          credentials: "include",
        },
      );

      clearTimeout(loadingTimer);

      if (response.status === 401) {
        setError("Faça login para ver detalhes das suas receitas.");
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        setError("Receita não encontrada.");
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      setData(data);
      setIsLoading(false);
    },
    [id],
  );

  useEffect(() => {
    fetchRecipeDetails();
  }, [fetchRecipeDetails]);

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

  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <main className="min-h-dvh grid place-items-center">
        <div className="flex flex-col items-center gap-1.5">
          <Logo fontSize={42} />
          <div className="flex flex-col items-center gap-1.5">
            <p>{error}</p>
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

  if (!data) {
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
        <div className="flex flex-wrap items-center justify-between gap-3">
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUpdateOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-accent hover:text-primary focus-visible:focus-ring"
            >
              <Pencil className="size-4" /> Atualizar
            </button>
            <button
              onClick={() => setConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2 text-sm font-medium text-destructive shadow-soft transition-colors hover:bg-destructive hover:text-destructive-foreground hover:border-destructive focus-visible:focus-ring"
            >
              <Trash2 className="size-4" /> Excluir
            </button>
          </div>
        </div>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">
          {data.name}
        </h1>

        <article className="mt-8 rounded-2xl border border-border bg-surface-2/60 p-6 shadow-soft md:p-8">
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Ingredientes
            </h2>
            <ul className="mt-4 space-y-2">
              {data.ingredients.map((ing, i) => (
                <IngredientContainer key={i} ing={ing} i={i} />
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Como fazer
            </h2>
            <ol className="mt-4 space-y-4">
              {data.steps.map((s, i) => (
                <StepContainer key={i} step={s} i={i} />
              ))}
            </ol>
          </section>

          {(data.tips.length ?? 0) > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Dicas
              </h2>
              {data.tips.map((tip, i) => (
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

      {confirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirmar exclusão"
          className="fixed inset-0 z-50 grid place-items-center px-4 py-8 bg-primary/50 backdrop-blur-sm"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-card shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 px-6 pt-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="size-5" />
              </span>
              <div className="flex-1">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Excluir receita?
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Tem certeza que deseja excluir{" "}
                  <span className="font-medium text-foreground">
                    "{data.name}"
                  </span>
                  ? Essa ação não pode ser desfeita.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-border px-6 py-4">
              {deleteError && (
                <p className="px-6 text-sm text-destructive">{deleteError}</p>
              )}
              <button
                onClick={() => setConfirmOpen(false)}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary focus-visible:focus-ring"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-soft transition-all hover:opacity-90 hover:shadow-elevated focus-visible:focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="size-4" />
                {isDeleting ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {updateOpen && (
        <AddRecipeModal
          onClose={() => setUpdateOpen(false)}
          onSuccess={fetchRecipeDetails}
          update={true}
          id={id}
          name={data.name}
          prevCategories={data.categories}
          ingredients={data.ingredients}
          steps={data.steps}
          tips={data.tips}
        />
      )}
    </main>
  );
}

export default RecipeDetailsPage;
