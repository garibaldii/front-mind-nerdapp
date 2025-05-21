"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import PictureLogo from "../../../public/PictureLogo";

type tokenPayload = {
  email: string;
  id: string;
};

export const NavBar = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<tokenPayload>(token);
        const email = decoded.id;
        setEmail(email);
        setEmail(email);
      } catch (error: any) {
        console.error(error.data.response);
      }
    }
  }, []);

  return (
    <div>
<div className="flex fixed right-0 z-50 bg-white w-full items-center justify-between px-10 py-3 border-b border-gray-200">
        <PictureLogo />

        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => router.push("/pages/product")}
          >
            Home
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push("/pages/articles")}
          >
            Artigos
          </Button>

          <div className="border-l h-6 mx-4 self-center border-black" />

          <div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
            >
              Entrar{" "}
            </Button>
            <Button variant="default" onClick={() => router.push("/")}>
              Registrar{" "}
            </Button>
          </div>
        </div>
      </div>
      F
    </div>
  );
};
