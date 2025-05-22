// app/pages/[id]/page.tsx
"use client";

import { NavBar } from "@/components/molecules/Navbar";
import { IArticle } from "@/interface/IArticle";
import { getArticleById } from "@/service/ArticleService";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useImageUrl } from "@/hooks/useImageUrl";
import { AvatarPhoto } from "@/components/atoms/AvatarPhoto";

interface Props {
  params: {
    id: string;
  };
}

function ArticleDetails({ params }: Props) {
  const { id } = params;
  const [article, setArticle] = useState<IArticle>();

  const articleImageUrl = useImageUrl(article?.image?.data);
  const authorImageUrl = useImageUrl(article?.author?.photo?.data);

  useEffect(() => {
    const fetchArticle = async (id: number) => {
      const response = await getArticleById(id);
      setArticle(response);
    };
    fetchArticle(Number(id));
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {article && (
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-2xl font-bold">{article?.title}</h1>
          <div className="flex items-center">
            {authorImageUrl && (
              <AvatarPhoto imageUrl={authorImageUrl} alt="foto do usuário" />
            )}
            <p className="pl-3">Por, {article?.author.name} </p>
            <p className="pr-2 pl-2">-</p>
            <p className="pr-3">
              {article?.releaseDate
                ? new Date(article.releaseDate).toLocaleDateString()
                : "Data indisponível"}
            </p>
            
          </div>

          {article?.editDate && (
            <p className="font-bold">
              editado em: {new Date(article.editDate).toLocaleString()}
            </p>
          )}
          <div className="w-full h-px bg-gray-300 my-4" />
          <div className="w-[100%] h-[400px] overflow-y-auto">
            {articleImageUrl && (
              <Image
                src={articleImageUrl}
                alt="Imagem do artigo"
                width={500} // largura da imagem (pode ser arbitrária)
                height={300} // altura maior que container para criar scroll
                style={{ width: "100%", height: "100%", objectFit: "contain" }} // largura 100%, altura automática mantendo proporção
              />
            )}
          </div>

          <div className="text-lg space-y-4 text-justify">
            {/* formatar o texto conforme escrito */}
            {article?.content?.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleDetails;
