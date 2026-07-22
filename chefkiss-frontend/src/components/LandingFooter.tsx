import { ChefHat } from "lucide-react";

function LandingFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <ChefHat className="size-4" />
          <span>© {new Date().getFullYear()} ChefKiss</span>
        </div>
        <p>Cozinhado com carinho.</p>
      </div>
    </footer>
  );
}

export default LandingFooter;
