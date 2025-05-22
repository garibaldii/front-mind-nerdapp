"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

import PictureLogo from "../../../public/PictureLogo";
import { logout } from "@/service/UserService";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { AlertModal } from "./AlertModal";

export const NavBar = () => {
  const router = useRouter();
  const { user, refreshUserData } = useUser();

  const [modal, setModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setModal(true)
    refreshUserData();
  };

  return (
    <div>
      <div className="flex fixed right-0 z-51 bg-white w-full items-center justify-between px-10 py-3 border-b border-gray-200">
        <PictureLogo />

        <div className="flex">
          <Button variant="ghost" onClick={() => router.push("/pages/home")}>
            Home
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push("/pages/articles")}
          >
            Artigos
          </Button>

          <div className="border-l h-6 mx-4 self-center border-black" />

          {!user ? (
            <div>
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Entrar
              </Button>
              <Button variant="default" onClick={() => router.push("/signUp")}>
                Registrar
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant={"ghost"}
                onClick={() => router.push("/pages/postArticle")}
              >
                Publicar
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    Olá, {user?.name || user?.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => router.push("/pages/profile")}
                    >
                      Ver perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/pages/myArticles")}
                    >
                      Meus Artigos
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
      <div className=" top-0 z-55 bg-white w-full px-10 py-10 " />

      {modal && (
        <AlertModal
          onClose={() => setModal(false)}
          title={"Atenção"}
          description={"Você foi deslogado"}
          open={modal}
        />
      )}
    </div>
  );
};
