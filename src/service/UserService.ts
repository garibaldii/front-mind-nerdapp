import { api } from "./http"


export const login = async (email: string, password: string) => {
    const response = await api.post("/user/login", {email, password})

    const data = response.data

    return data
}