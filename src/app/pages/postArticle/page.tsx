"use client";

import { AlertModal } from "@/components/molecules/AlertModal";
import { NavBar } from "@/components/molecules/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { postArticle } from "@/service/ArticleService";
import { useRouter } from "next/navigation";
import { useState } from "react";

function PostArticle() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [content, setContent] = useState("");

  const router = useRouter();
  const { user } = useUser();

  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
       const result = await postArticle(title, content, user.id, image);
        setModal(true);
        console.log(result)
      }
      else{
        setError("Usuário não encontrado, por favor realize login")
        setModal(true)
      }

      
    } catch (error: any) {
      setError(error.response.data.message);
      console.error(error)
      setModal(true);
    }
  };

  return (
    <div>
      <NavBar />

      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1>Novo Artigo</h1>

          <div className="flex">
            <Button
              variant="destructive"
              onClick={() => router.back()}
              className="mr-3"
            >
              Cancelar
            </Button>
            <Button variant="default" type="submit">
              Salvar
            </Button>
          </div>
        </header>

        <main>
          <Label>Título</Label>
          <Input
            placeholder="Adicione um título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></Input>

          <Label>Inserir Imagem</Label>
          <Input
            type="file"
            accept=".jpg, .png"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) setImage(selectedFile);
            }}
            required
          ></Input>

          <Label>Texto</Label>
          <Textarea
            placeholder="Digite seu artigo."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="pb-5"
          ></Textarea>
        </main>
        {error && <p>{error}</p>}
      </form>

      {modal && (
        <AlertModal
          onClose={() => router.push("/pages/articles") }
          title={error ? "Erro! ❌😢" : "Sucesso! ✅"}
          description={error || "Artigo postado com sucesso!"}
          open={modal}
        />
      )}
    </div>
  );
}

export default PostArticle;
