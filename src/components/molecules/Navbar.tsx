"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { AlertModal } from "./AlertModal";
import { MobileMenu } from "./MobileMenu";

export const NavBar = () => {
  const router = useRouter();
  const { user, refreshUserData } = useUser();

  const [modal, setModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setModal(true);
    refreshUserData();
  };

  return (
    <div>
      <div className="flex fixed right-0 z-[1000]  bg-white w-full items-center justify-between px-6 py-3 border-b border-gray-200">
        <PictureLogo />

        {/* Menu para telas grandes */}
        <div className="hidden lg:flex items-center">
          <Button variant="ghost" onClick={() => router.push("/pages/home")}>
            Home
          </Button>

          <Button variant="ghost" onClick={() => router.push("/pages/article/articles")}>
            Artigos
          </Button>

          <div className="border-l h-6 mx-4 self-center border-black" />

          {!user ? (
            <>
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Entrar
              </Button>
              <Button variant="default" onClick={() => router.push("/signUp")}>
                Registrar
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push("/pages/article/postArticle")}>
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
                    <DropdownMenuItem onClick={() => router.push("/pages/profile")}>
                      Ver perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/pages/article/myArticles")}>
                      Meus Artigos
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Menu Mobile: visível apenas em telas menores */}
        <div className="lg:hidden z-[1000] ">
          <MobileMenu user={user} onLogout={handleLogout} />
        </div>
      </div>

      <div className="top-0 z-55 bg-white w-full px-10 py-10" />

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
