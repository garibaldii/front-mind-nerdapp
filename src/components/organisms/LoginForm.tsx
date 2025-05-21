"use client";

import { login } from "@/service/UserService";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingIcon from "../../../public/LoadingIcon";
import FullLogo from "../../../public/FullLogo";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);

      router.push("/pages/home");
      console.log(result);
    } catch (error: any) {
      console.error(error)
      setError(error.response.data.message); //takes the error from backend error treatment
      setLoading(false);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex  items-center justify-center min-h-screen w-full relative">

      <div className="flex  justify-center items-center w-3/4 bg-[#090909] min-h-screen item-center">
        <FullLogo />
      </div>

      <div className="flex flex-col justify-center items-center  w-1/2 ">
        <h2 className="text-center text-xl mb-4">Conectar</h2>

        <form
          onSubmit={handleSubmit}
          className=" bg-custom-lds-blur w-2/4 rounded-lg space-y-6 min-h-[0px] flex flex-col justify-center"
        >
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              className={`${error ? "border-red-500" : ""} `}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              className={`${error ? "border-red-500" : ""}`}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full p-6">
            {loading ? <LoadingIcon /> : "Entrar"}
          </Button>
          <a href="">Novo usuário? Clique aqui</a>

          <p className="text-red-700">{error}</p>
        </form>
      </div>
    </div>
  );
};
