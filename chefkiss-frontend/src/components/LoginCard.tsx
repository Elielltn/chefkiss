import { useState } from "react";
import FormField from "./FormField";
import ModeTab from "./ModeTab";
import { useNavigate } from "react-router";

type Mode = "signup" | "signin";

function LoginCard() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.log("Credenciais inválidas");
      return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    navigate("/recipes");
  }

  const isSignup = mode === "signup";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-7 shadow-elevated"
    >
      <div
        role="tablist"
        aria-label="Escolha entre entrar ou criar conta"
        className="mb-6 grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface-2 p-1"
      >
        <ModeTab
          active={mode === "signin"}
          onClick={() => setMode("signin")}
          label="Entrar"
        />
        <ModeTab
          active={mode === "signup"}
          onClick={() => setMode("signup")}
          label="Criar conta"
        />
      </div>

      <div className="space-y-5">
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
        />
        <FormField
          id="password"
          label="Senha"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
        />
      </div>

      <button className="mt-7 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-elevated focus-visible:focus-ring">
        {isSignup ? "Criar conta" : "Entrar"}
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {isSignup ? (
          <span>
            Já tem uma conta?{" "}
            <button
              className="font-medium text-primary underline-offset-2 hover:underline"
              onClick={() => setMode("signin")}
            >
              Entrar
            </button>
          </span>
        ) : (
          <span>
            Ainda não tem conta?{" "}
            <button
              className="font-medium text-primary underline-offset-2 hover:underline"
              onClick={() => setMode("signup")}
            >
              Criar conta
            </button>
          </span>
        )}
      </p>
    </form>
  );
}

export default LoginCard;
