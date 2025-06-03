"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { likeArticle, unlikeArticle } from "@/service/UserService";
import { isArticleLiked } from "@/utils/UserUtils";
import { LikeCounter } from "./LikeCounter";

type Props = {
  articleId: string;
  initialLikes: number | string;
};

export const LikeButton = ({ articleId, initialLikes }: Props) => {
  const { user } = useUser();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Number(initialLikes) || 0);


  //para inicializar já com a contagem de likes
  useEffect(() => {
    //verifica se o id do artigo já foi encontrado na lista de artigos curtidos do usuário
    setLiked(isArticleLiked(user?.likedArticles, Number(articleId)));
    //atualiza o contador
    setLikesCount(Number(initialLikes) || 0);

  },
    //a cada alteração das curtidas do usuário, redimensiona este componente
    [user?.likedArticles, articleId, initialLikes]);

  const handleLikeClick = async () => {
    try {
      //sem login nao consegue dar like
      if (!user) return;

      //se nao curtiu, chama a api para dar baixa no serviço
      if (!liked) { 
        await likeArticle(user.id, Number(articleId));
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      } else {
        //se curtiu, descurte...
        await unlikeArticle(user.id, Number(articleId));
        setLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Erro ao curtir/descurtir:", error);
    }
  };

  return (
    <LikeCounter liked={liked} count={likesCount} onClick={handleLikeClick} />
  );
};
