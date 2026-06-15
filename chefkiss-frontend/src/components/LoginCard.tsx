import { useState } from "react";
import FormField from "./FormField";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="text-[#4B2E2B] bg-[#D4A46B] w-[420px] border-2 border-[#593700] rounded-xl px-[36px] py-[40px]">
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
      <button className="transition text-orange-50 bg-[#593700] hover:bg-[#503200] rounded-lg w-full py-3 cursor-pointer font-medium">
        Entrar
      </button>
    </form>
  );
}

export default LoginCard;
