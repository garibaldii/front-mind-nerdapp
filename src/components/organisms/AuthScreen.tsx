'use client';

import { AuthForm } from "@/components/organisms/AuthForm";
import FullLogo from "../../../public/FullLogo";

interface AuthScreenProps {
  type: "login" | "register";
  onSubmit: (email: string, password: string) => Promise<void>;
  title: string;
  link?: React.ReactNode;
}
//componente que varia conforme o prop informado, pensado a fim de evitar a duplicação de código
export const AuthScreen = ({ type, onSubmit, title, link }: AuthScreenProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full relative">
      <div className="hidden sm:flex justify-center items-center w-3/4 bg-[#090909] min-h-screen">
        <FullLogo />
      </div>

      <div className="flex flex-col justify-center items-center w-1/2">
        <h2 className="text-center text-xl mb-4">{title}</h2>

        {/*Formulário que muda a interface conforme o tipo */}
        <AuthForm type={type} onSubmit={onSubmit} />

        {link && <div className="mt-4">{link}</div>}
      </div>
    </div>
  );
};
