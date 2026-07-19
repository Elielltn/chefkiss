import Logo from "./Logo";
import { ChefHat, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/auth");
  }

  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
          <ChefHat className="size-6" strokeWidth={1.75} />
        </span>
        <div>
          <Logo fontSize={48} />
          <p className="mt-1.5 text-sm text-muted-foreground">
            Seu caderno pessoal de receitas
          </p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-secondary hover:border-border-strong focus-visible:focus-ring"
      >
        <LogOut className="size-4" />
        Sair
      </button>
    </header>
  );
}

export default Header;
