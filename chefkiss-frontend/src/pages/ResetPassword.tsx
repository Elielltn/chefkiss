import { ChefHat, CheckCircle2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string>("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Link inválido.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    const response = await fetch(
      "https://chefkiss-sandy.vercel.app/auth/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      },
    );

    if (!response.ok) {
      setError("Link inválido ou expirado.");
      return;
    }

    // TODO: chamada real para atualizar a senha do usuário
    setDone(true);
  }

  return (
    <main className="grid min-h-dvh place-items-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elevated">
            <ChefHat className="size-7" strokeWidth={1.75} />
          </span>
          <h1 className="font-display text-4xl font-semibold leading-none text-foreground">
            Nova senha
          </h1>
          <p className="text-sm text-muted-foreground">
            Escolha uma nova senha para acessar sua conta.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-elevated">
          {done ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-6" strokeWidth={1.75} />
              </span>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Senha atualizada
              </h2>
              <p className="text-sm text-muted-foreground">
                Sua senha foi redefinida com sucesso. Você já pode entrar com a
                nova senha.
              </p>
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-2 hover:underline"
              >
                <ArrowLeft className="size-4" strokeWidth={2} />
                Ir para o login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Nova senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Confirmar senha
                </label>
                <input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-destructive">{error}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-elevated focus-visible:focus-ring"
              >
                Salvar nova senha
              </button>

              <p className="text-center text-xs text-muted-foreground">
                <button
                  onClick={() => {
                    navigate("/auth");
                  }}
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  Voltar ao login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
