import { Sparkles, ArrowRight } from "lucide-react";
import LandingPreviewCard from "./LandingPreviewCard";
import { useNavigate } from "react-router";

function LandingHero() {
  const navigete = useNavigate();
  return (
    <section className="mx-auto max-w-6xl px-6 pt-10 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
          <Sparkles className="size-3.5 text-accent" /> Um caderno de receitas
          moderno
        </span>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Suas receitas favoritas,{" "}
          <span className="text-accent">sempre à mão</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
          ChefKiss é o caderno digital para quem ama cozinhar. Organize,
          encontre e cozinhe suas receitas com uma interface calorosa e
          elegante.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigete("/auth")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-elevated focus-visible:focus-ring"
          >
            Começar agora
            <ArrowRight className="size-4" />
          </button>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-colors hover:border-accent hover:text-primary focus-visible: focus-ring"
          >
            Saiba mais
          </a>
        </div>
      </div>
      <LandingPreviewCard />
    </section>
  );
}

export default LandingHero;
