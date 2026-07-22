import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

function LandingCta() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="overflow-hidden rounded-2xl border border-border bg-primary p-10 text-center shadow-elevated md:p-14">
        <h2 className="font-display text-3xl font-semibold text-primary-foreground md:text-4xl">
          Pronto para abrir seu caderno?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/80 md:text-base">
          Crie sua conta gratuitamente e comece a organizar suas receitas hoje
          mesmo.
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate("/auth")}
            className="inline-flex items-center gap-2 rounded-xl bg-surface px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-all hover:shadow-elevated focus-visible:focus-ring"
          >
            Entrar no ChefKiss
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default LandingCta;
