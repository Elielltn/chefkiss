import { useState } from "react";
import FormField from "./FormField";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="text-orange-900 bg-orange-200 w-[420px] border border-orange-900 rounded-xl px-[36px] py-[40px]">
      <div className="mb-[20px]">
        <FormField
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-[28px]">
        <FormField
          label="Senha"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="transition text-orange-50 hover:text-orange-900 bg-orange-900 hover:bg-orange-50 rounded-lg w-full py-3 cursor-pointer font-medium">
        Entrar
      </button>
    </form>
  );
}

export default LoginCard;
