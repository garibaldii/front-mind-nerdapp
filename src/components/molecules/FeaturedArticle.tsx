"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { IArticle } from "@/interface/IArticle";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

import { useImageUrl } from "@/hooks/useImageUrl";

type Props = {
  article: IArticle;
  title: boolean;
  content: boolean;
  author: boolean;
  image: boolean;
  hoverEffect: boolean;
};

export const FeaturedArticle = ({
  article,
  title,
  content,
  author,
  image,
  hoverEffect,
}: Props) => {
  const router = useRouter();

  const imageUrl = useImageUrl(article.image?.data, image);

  const handleClick = () => {
    router.push(`/pages/article/${article.id}`); //redireciona o usuário ao artigo clicado via id = "pages/article/[id]"
  };

  return (
    <div
      className={`transition-colors duration-300 rounded-lg 
  ${hoverEffect ? "hover:bg-gray-700 cursor-pointer" : "mr-1 ml-1"} `}
    >
      {image && imageUrl && (
        <Image
          src={imageUrl}
          alt="Imagem do artigo"
          width={300}
          height={500}
          className={`w-full object-cover cursor-pointer
    h-[200px] sm:h-[60vh]`} // <- define altura menor no mobile e ajusta em telas maiores
          onClick={handleClick}
        />

      )}
      {title && (
        <div
          className="pb-3 text-lg font-bold cursor-pointer"
          onClick={handleClick}
        >
          {article.title}
        </div>
      )}
      {content && (
        <div className="line-clamp-2 text-[#919191]" onClick={handleClick}>
          {article.content}
        </div>
      )}

      {author && (
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-gray-600">
            por {article.author.name}, {new Date(article.releaseDate).toLocaleDateString()}
            {article?.editDate && (
              <> — editado em {new Date(article.editDate).toLocaleDateString()}</>
            )}
          </p>
          <Button className="bg-[#FF3B30]" onClick={handleClick}>
            LER MAIS
          </Button>
        </div>
      )}

    </div>
  );
};
