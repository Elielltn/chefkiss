import { ChefHat, CheckCircle2, ArrowLeft, TriangleAlert } from "lucide-react";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.SubmitEvent) {
    setError("");
    e.preventDefault();

    if (!email) {
      setError("Digite o email da conta para recuperar a senha.");
      return;
    }

    try {
      await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      setError("Não foi possível enviar o e-mail. Verifique sua conexão.");
    }

    setSent(true);
  }

  return (
    <main className="grid min-h-dvh place-items-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elevated">
            <ChefHat className="size-7" strokeWidth={1.75} />
          </span>
          <h1 className="font-display text-4xl font-semibold leading-none text-foreground">
            Recuperar senha
          </h1>
          <p className="text-sm text-muted-foreground">
            Informe seu email e enviaremos um link para você criar uma nova
            senha.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-elevated">
          {sent ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-6" strokeWidth={1.75} />
              </span>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Email enviado
              </h2>
              <p className="text-sm text-muted-foreground">
                Se existir uma conta associada a{" "}
                <span className="font-medium text-foreground">{email}</span>,
                você receberá em instantes um link para redefinir sua senha.
              </p>
              <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-2 hover:underline">
                <ArrowLeft className="size-4" strokeWidth={2} />
                Voltar para o login
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  className="mb-3 h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/25"
                />

                {error ? (
                  <span className="flex gap-1 items-center mb-3 text-sm text-destructive">
                    <TriangleAlert className="size-5" /> {error}
                  </span>
                ) : null}
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-elevated focus-visible:focus-ring"
              >
                Enviar link de recuperação
              </button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Lembrou sua senha?{" "}
                <button className="font-medium text-primary underline-offset-2 hover:underline">
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

export default ForgotPassword;
