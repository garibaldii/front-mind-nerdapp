'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { IUser } from '@/interface/IUser';


interface Props {
  user: IUser | null;
  onLogout: () => void;
}

export const MobileMenu = ({ user, onLogout }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden ">
      <Button variant="ghost" onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white px-6 py-4 shadow-md space-y-3 z-[1000]">
          <Button variant="ghost" className="w-full text-left" onClick={() => router.push("/pages/home")}>
            Home
          </Button>
          <Button variant="ghost" className="w-full text-left" onClick={() => router.push("/pages/article/articles")}>
            Artigos
          </Button>

          <div className="w-full h-px bg-gray-300 my-4" />

          {/* Área exclusiva do usuário */}
          {!user ? (
            <>

              <Button variant="ghost" className="w-full text-left" onClick={() => router.push("/login")}>
                Entrar
              </Button>
              <Button variant="default" className="w-full text-left" onClick={() => router.push("/signUp")}>
                Registrar
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="w-full text-left" onClick={() => router.push("/pages/article/postArticle")}>
                Publicar
              </Button>
              <Button variant="ghost" className="w-full text-left" onClick={() => router.push("/pages/profile")}>
                Ver perfil
              </Button>
              <Button variant="ghost" className="w-full text-left" onClick={() => router.push("/pages/article/myArticles")}>
                Meus Artigos
              </Button>
              <Button variant="destructive" className="w-full text-left" onClick={onLogout}>
                Log out
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
