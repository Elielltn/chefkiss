import { useNavigate } from "react-router";

type recipeCardProps = {
  name: string;
  tags: string[];
};

function RecipeCard({ name, tags }: recipeCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/recipe")}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-elevated focus-visible:focus-ring"
    >
      <div
        className="aspect-[16/10] w-full"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.32 0.05 45) 0%, oklch(0.22 0.04 45) 55%, oklch(0.18 0.03 45) 100%)",
        }}
        aria-hidden
      />
      <div className="border-t border-border bg-surface p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
          {name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {tags.slice(0, 2).join(" • ")}
        </p>
      </div>
    </div>
  );
}

export default RecipeCard;
