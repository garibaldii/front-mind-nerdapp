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

  useEffect(() => {
    setLiked(isArticleLiked(user?.likedArticles, Number(articleId)));
    setLikesCount(Number(initialLikes) || 0);
  }, [user?.likedArticles, articleId, initialLikes]);

  const handleLikeClick = async () => {
    try {
      if (!user) return;

      if (!liked) {
        await likeArticle(user.id,  Number(articleId));
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      } else {
        await unlikeArticle(user.id,  Number(articleId));
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
