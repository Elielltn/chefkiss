import { BookOpen, Search, Sparkles } from "lucide-react";

function LandingFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
          Feito para quem vive na cozinha
        </h2>
        <p className="mt-4 text-muted-foreground">
          Tudo que você precisa para organizar seu repertório culinário — sem
          complicação.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          {
            icon: BookOpen,
            title: "Organize seu acervo",
            desc: "Cadastre receitas com ingredientes, passos e categorias. Tudo em um só lugar.",
          },
          {
            icon: Search,
            title: "Encontre em segundos",
            desc: "Busca rápida por nome para achar aquela receita especial quando a fome bater.",
          },
          {
            icon: Sparkles,
            title: "Interface calorosa",
            desc: "Design tipográfico e paleta suave inspirados em cadernos editoriais de cozinha.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <article
            key={title}
            className="rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-elevated"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LandingFeatures;
