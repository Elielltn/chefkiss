import { useState } from "react";
import FormField from "./FormField";
import ModeTab from "./ModeTab";
import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router";

type Mode = "signup" | "signin";

function LoginCard() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function getErrorMessage(response: Response): Promise<string> {
    const data = await response.json().catch(() => null);

    if (!data?.error) {
      return "Ocorreu um erro. Tente novamente.";
    }

    if (typeof data.error === "string") {
      return data.error;
    }

    if (Array.isArray(data.error) && data.error.length > 0) {
      return data.error[0].message;
    }

    return "Ocorreu um erro. Tente novamente.";
  }

  async function signIn(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");

    const response = await fetch(
      "https://chefkiss-sandy.vercel.app/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      setError(await getErrorMessage(response));
      return;
    }

    navigate("/recipes");
  }

  async function signUp(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");
    const response = await fetch(
      "https://chefkiss-sandy.vercel.app/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      setError(await getErrorMessage(response));
      return;
    }

    navigate("/recipes");
  }

  const isSignup = mode === "signup";

  return (
    <form
      onSubmit={isSignup ? signUp : signIn}
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

      <div
        style={{ marginBottom: error ? "20px" : "28px" }}
        className="space-y-5"
      >
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
        />
        <div>
          <FormField
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
          />
          {!isSignup && (
            <div className="mt-2 text-right">
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-xs font-medium text-primary underline-offset-2 hover:underline"
              >
                Esqueceu a senha?
              </span>
            </div>
          )}
        </div>
      </div>

      {error ? (
        <span className="flex gap-1 items-center mb-3 text-sm text-destructive">
          <TriangleAlert className="size-5" /> {error}
        </span>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-elevated focus-visible:focus-ring"
      >
        {isSignup ? "Criar conta" : "Entrar"}
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {isSignup ? (
          <span>
            Já tem uma conta?{" "}
            <button
              type="button"
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
              type="button"
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
