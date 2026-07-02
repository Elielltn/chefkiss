import { useState } from "react";
import FormField from "./FormField";
import { useNavigate } from "react-router";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <form className="rounded-2xl border border-border bg-card p-7 shadow-elevated">
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

      <button
        onClick={() => navigate("/recipes")}
        className="mt-7 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary-hover hover:shadow-elevated focus-visible:focus-ring"
      >
        Entrar
      </button>
    </form>
  );
}

export default LoginCard;
