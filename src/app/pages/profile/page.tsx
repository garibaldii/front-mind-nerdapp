'use client'

import { AlertModal } from "@/components/molecules/AlertModal"
import { NavBar } from "@/components/molecules/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useArticle } from "@/context/ArticleContext"
import { useUser } from "@/context/UserContext"
import { useImageUrl } from "@/hooks/useImageUrl"
import { updateUser } from "@/service/UserService"
import { joinNames } from "@/utils/NameUtils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

function Profile() {
    const router = useRouter()



    const { user, refreshUserData } = useUser()
    const { refreshArticleData } = useArticle()

    const imageUrl = useImageUrl(user?.photo?.data);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [photo, setPhoto] = useState<File | undefined>(undefined);

    const [modal, setModal] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (user) {
                const fullName = joinNames(firstName, lastName)

                const response = await updateUser(user.id, fullName, photo)
                console.log(response)

                //chama o banco para atualizar tanto o usuário, quanto o seus artigos
                refreshUserData()
                refreshArticleData()

                //exibe mensagem de confirmação
                setModal(true)
            }
            else {
                setError("Por favor, realize login")
                setModal(true)
            }
        } catch (error: any) {
            setError(error.response.data.message)
            setModal(true)
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

                <div className="flex items-center">
                    {imageUrl &&
                        <Image
                            src={imageUrl}
                            alt={""}
                            width={100}
                            height={100}
                            className="rounded-[100%]"
                        />
                    }
                    <div className="pl-3 w-full">
                        <Label>Avatar</Label>
                        <Input
                            type="file"
                            accept=".jpg, .png"
                            onChange={(e) => {
                                const selectedFile = e.target.files?.[0];
                                if (selectedFile) setPhoto(selectedFile);
                            }}
                            className="w-full"
                        />
                    </div>
                </div>
                <main>
                    <Label>Nome</Label>

                    <Input
                        placeholder="Digite seu nome"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <Label>Sobrenome</Label>
                    <Input
                        placeholder="Digite seu sobrenome"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />


                </main>
            </form>


            {modal && (
                <AlertModal
                    onClose={() => router.push("/pages/article/articles")}
                    title={error ? "Erro! ❌😢" : "Sucesso! ✅"}
                    description={error || "Dados atualizados com sucesso!"}
                    open={modal}
                />
            )}

        </div>
    )
}

export default Profile