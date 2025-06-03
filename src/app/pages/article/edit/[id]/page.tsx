"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NavBar } from "@/components/molecules/Navbar";
import { useUser } from "@/context/UserContext";
import { getArticleById, updateArticle } from "@/service/ArticleService";
import { IArticle } from "@/interface/IArticle";
import { useImageUrl } from "@/hooks/useImageUrl";

import Image from "next/image";
import { AlertModal } from "@/components/molecules/AlertModal";

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();

  const [article, setArticle] = useState<IArticle | undefined>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);

  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const imageUrl = useImageUrl(article?.image?.data);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const data = await getArticleById(Number(id));
        setArticle(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        setError("Erro ao carregar o artigo.");
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateArticle(Number(id), title, content, image);
      setModal(true)
    } catch (err: any) {
      setError(err.response.data.message);
      setModal(true)
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between mb-5">
          <h1>Editar Artigo</h1>
          <div className="flex">
            <Button
              variant="destructive"
              onClick={() => router.back()}
              className="mr-3"
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </header>

        <main>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Imagem do artigo"
              width={400}
              height={500}
              className="mb-5"
            />
          )}

          <Label>Título</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Label>Imagem</Label>
          <Input
            type="file"
            accept=".jpg, .png"
            required
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) setImage(selectedFile);
            }
            }

          ></Input>
          <Label>Texto</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mb-10"
          />
        </main>

        {modal && (
          <AlertModal
            onClose={() => router.push("/pages/article/articles")}
            title={error ? "Erro! ❌😢" : "Sucesso! ✅"}
            description={error || "Artigo atualizado com sucesso!"}
            open={modal}
          />
        )}
      </form>
    </div>
  );
}
