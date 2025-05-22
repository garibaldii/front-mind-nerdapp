'use client'

import { NavBar } from "@/components/molecules/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useArticle } from "@/context/ArticleContext"
import { useUser } from "@/context/UserContext"
import { updateUser } from "@/service/UserService"
import { joinNames } from "@/utils/NameUtils"
import { useRouter } from "next/navigation"
import { useState } from "react"

function Profile() {
    const router = useRouter()

    const { user, refreshUserData } = useUser()
    const {refreshArticleData} =  useArticle()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (user) {
                const fullName = joinNames(firstName, lastName)

                const response = await updateUser(user.id, fullName)
                console.log(response)

                //chama o banco para atualizar tanto o usuário, quanto o seus artigos
                refreshUserData()
                refreshArticleData()

                alert("Dados Atualizados!")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <NavBar />

            <form onSubmit={handleSubmit} >
                <header className="flex justify-between">
                    <h1>Editar Perfil</h1>

                    <div className="flex">
                        <Button variant="destructive" onClick={() => router.back()} className="mr-3">Cancelar</Button>
                        <Button variant="default" type="submit">Salvar</Button>
                    </div>
                </header>

                <main>
                    <Label>Nome</Label>
                    <Input
                        placeholder="Digite seu nome"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    ></Input>

                    <Label>Sobrenome</Label>
                    <Input
                        placeholder="Digite seu sobrenome"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    ></Input>
                </main>
            </form>
        </div>
    )
}

export default Profile