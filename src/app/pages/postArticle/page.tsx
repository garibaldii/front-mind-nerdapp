'use client'

import { NavBar } from "@/components/molecules/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { postArticle } from "@/service/ArticleService"
import { useRouter } from "next/navigation"
import { useState } from "react"


function PostArticle() {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState<File | undefined>(undefined)
    const [content, setContent] = useState("")

    const router = useRouter()

    const [error, setError] = useState("")

    const handleSubmit = async () => {

        try {
            const result = await postArticle(title, content, 1, image)
            alert("Artigo publicado com sucesso!")
            console.log(result)
        } catch (error: any) {
            setError(error.response.data.message)
        }
    }

    return (
        <div>
            <NavBar />

            <form onSubmit={handleSubmit}>
                <header className="flex justify-between">
                    <h1>Novo Artigo</h1>

                    <div className="flex">
                        <Button variant="destructive" onClick={() => router.back()} className="mr-3">Cancelar</Button>
                        <Button variant="default" type="submit">Salvar</Button>
                    </div>
                </header>

                <main>
                    <Label>Título</Label>
                    <Input
                        placeholder="Adicione um título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    ></Input>

                    <Label>Inserir Imagem</Label>
                    <Input
                        type="file"
                        accept=".jpg, .png"
                        onChange={(e) => {
                            const selectedFile = e.target.files?.[0]
                            if (selectedFile) setImage(selectedFile)
                        }}
                        required
                    ></Input>

                    <Label>Texto</Label>
                    <Textarea
                        placeholder="Digite seu artigo."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="pb-5"
                    ></Textarea>
                </main>
                {error && <p>{error}</p>}

            </form>
        </div>
    )
}

export default PostArticle