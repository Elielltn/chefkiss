import LoginCard from "../components/LoginCard";
import Logo from "../components/Logo";
import { ChefHat } from "lucide-react";

function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elevated">
            <ChefHat className="size-7" strokeWidth={1.75} />
          </span>
          <Logo fontSize={42} fontWeight={600} />
          <p className="text-sm text-muted-foreground">
            Entre para acessar seu caderno de receitas
          </p>
        </div>
        <LoginCard />
      </div>
    </main>
  );
}
export default LoginPage;
