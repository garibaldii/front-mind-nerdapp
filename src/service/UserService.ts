import { api } from "./http"


export const login = async (email: string, password: string) => {
    const response = await api.post("/user/login", { email, password })

    const token = response.data.token

    localStorage.setItem("token", token)

    return response.data
}

export const logout = async () => {
    localStorage.removeItem("token")
}


export const singUp = async (email: string, password: string) => {
    const response = await api.post("/user/signUp", { email, password })

    const data = response.data

    return data
}


export const getUserById = async (id: number) => {
    const response = await api.get(`/user/${id}`)

    const data = response.data

    return data
}

export const updateUser = async (id: number, name: string, photo?: File | null) => {
    const formData = new FormData()
    formData.append("name", name)
    if (photo) formData.append("photo", photo)

    const response = await api.put(`/user/${id}`, formData , {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    const data = response.data

    return data
};
