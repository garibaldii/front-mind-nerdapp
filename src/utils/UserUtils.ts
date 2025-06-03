import { IArticle } from "@/interface/IArticle";

export const joinNames = (firstName: string, lastName: string) => {
  return firstName.concat(` ${lastName}`);
};

//faz a verificacao se o artigo se encontra na lista de artigos curtidos do usuário.
export const isArticleLiked = (
  likedArticles: IArticle[] | undefined,
  articleId: number
): boolean => {
  return likedArticles?.some((a) => a.id === articleId) ?? false;
};
