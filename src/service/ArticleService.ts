import { api } from "./http"


export const getArticles = async () => {
    const response = await api.get("/article")

    const data = response.data

    return data
}