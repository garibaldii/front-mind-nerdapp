"use client";

import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingIcon from "../../../public/LoadingIcon";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "register" && password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-custom-lds-blur w-2/4 rounded-lg space-y-6 min-h-[0px] flex flex-col justify-center"
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
          className={error ? "border-red-500" : ""}
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
          className={error ? "border-red-500" : ""}
        />
      </div>

      {type === "register" && (
        <div className="flex flex-col">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            required
            className={error ? "border-red-500" : ""}
          />
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full p-6">
        {loading ? <LoadingIcon /> : type === "login" ? "Entrar" : "Registrar"}
      </Button>

      <p className="text-red-700">{error}</p>
    </form>
  );
};
