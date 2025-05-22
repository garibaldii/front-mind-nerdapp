import { IArticle } from "@/interface/IArticle";
import { api } from "./http";
import { IUser } from "@/interface/IUser";

export const getArticles = async () => {
  const response = await api.get("/article");

  const data = response.data;

  return data;
};

export const getArticleById = async (id: number) => {
  const response = await api.get(`/article/${id}`);

  const data = response.data;

  console.log("artigo ", data);

  return data;
};

export const postArticle = async (
  title: string,
  content: string,
  authorId: number,
  image?: File | null
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("authorId", authorId.toString());
  if (image) {
    formData.append("image", image);
  }

  const response = await api.post("/article", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateArticle = async (
  id: number,
  title: string,
  content: string,
  image?: File | null
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }
  const response = await api.put(`/article/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  const data = response.data;

  return data;
};

export const deleteArticle = async (id: number) => {
  const response = await api.delete(`/article/${id}`)

  const data = response.data

  return data
}

