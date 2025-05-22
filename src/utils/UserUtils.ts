import { IArticle } from "@/interface/IArticle";

export const joinNames = (firstName: string, lastName: string) => {
  return firstName.concat(` ${lastName}`);
};

export const isArticleLiked = (
  likedArticles: IArticle[] | undefined,
  articleId: number
): boolean => {
  return likedArticles?.some((a) => a.id === articleId) ?? false;
};
