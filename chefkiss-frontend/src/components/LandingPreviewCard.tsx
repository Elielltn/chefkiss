function LandingPreviewCard() {
  const prevArray = [
    "Torta de Chocolate",
    "Risoto de Cogumelos",
    "Pão Caseiro",
    "Salada Mediterrânea",
  ];
  return (
    <div className="relative mx-auto mt-16 max-w-4xl">
      <div className="rounded-2xl border border-border bg-surface-2/60 p-4 shadow-elevated md:p-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {prevArray.map((name, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
            >
              <div
                className="aspect-[16/10] w-full"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.32 0.05 45) 0%, oklch(0.22 0.04 45) 55%, oklch(0.18 0.03 45) 100%)",
                }}
                aria-hidden
              />
              <div className="border-t border-border bg-surface p-3">
                <p className="truncate font-display text-sm font-semibold text-foreground">
                  {name}
                </p>
                <p className="mt-1 truncate text-[11px] text-muted-foreground">
                  Sobremesas • Favoritos
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 -bottom-6 h-12 rounded-full bg-accent/20 blur-2xl"
      />
    </div>
  );
}

export default LandingPreviewCard;
