import { ChefHat } from "lucide-react";
import Logo from "./Logo";
import { useNavigate } from "react-router";

function LandingHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between max-w-6xl mx-auto px-6 py-6">
      <div className="flex gap-2 items-center">
        <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
          <ChefHat className="size-5" strokeWidth={1.75} />
        </span>
        <Logo fontSize={38} />
      </div>
      <button
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-accent hover:text-primary focus-visible:focus-ring"
        onClick={() => navigate("/auth")}
      >
        Entrar
      </button>
    </header>
  );
}

export default LandingHeader;
