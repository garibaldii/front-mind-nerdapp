"use client";

import Image from "next/image";
import { IArticle } from "@/interface/IArticle";
import { useEffect, useState } from "react";

type Props = {
  article: IArticle;
};

export const FeaturedArticle = ({ article }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (article?.image?.data) {
      const byteArray = new Uint8Array(article.image.data);
      const blob = new Blob([byteArray], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [article]);

  return (
    <div className="pr-3">
      {imageUrl && (
        <Image src={imageUrl} alt="Imagem do artigo" width={500} height={500} />
      )}
      <div className="pb-3">{article.title}</div>
      <div className="flex justify-around">
        <div className="flex justify-around">
          por {article.author?.name},{" "}
          {new Date(article.releaseDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
