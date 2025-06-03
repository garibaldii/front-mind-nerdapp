import axios from 'axios'
//axios para facilitar a comunicacao http com o back-end

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
});

//este interceptor irá "pendurar" o token em toda requisicao à api
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if(token) config.headers.Authorization = `Bearer ${token}`

    return config
})