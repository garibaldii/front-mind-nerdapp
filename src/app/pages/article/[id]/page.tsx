// app/pages/[id]/page.tsx
'use client'

import { NavBar } from '@/components/molecules/Navbar';
import { IArticle } from '@/interface/IArticle';
import { getArticleById } from '@/service/ArticleService';
import {  useEffect, useState } from 'react';

import Image from "next/image";
import { useImageUrl } from '@/hooks/useImageUrl';


interface Props {
    params: {
        id: string;
    };
}

function ArticleDetails({ params }: Props) {
    const { id } = params;
    const [article, setArticle] = useState<IArticle>()

    const imageUrl = useImageUrl(article?.image?.data)

    useEffect(() => {
        const fetchArticle = async (id: number) => {
            const response = await getArticleById(id)
            setArticle(response)
        }  
        fetchArticle(Number(id))
    }, [id])

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />


            <div className='flex flex-col items-center justify-center '>
                <h1 className='text-2xl font-bold'>{article?.title}</h1>
                <div className='flex'>
                    <p>Por, {article?.author.name}</p>
                    <p className='pr-2 pl-2'>-</p>
                    <p>
                        {article?.releaseDate
                            ? new Date(article.releaseDate).toLocaleDateString()
                            : 'Data indisponível'}
                    </p>                    </div>

                <div className="w-full h-px bg-gray-300 my-4" />
                <div className="w-[70%] h-[400px] overflow-y-auto">
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt="Imagem do artigo"
                            width={500}  // largura da imagem (pode ser arbitrária)
                            height={800} // altura maior que container para criar scroll
                            style={{ width: '100%', height: 'auto' }} // largura 100%, altura automática mantendo proporção
                        />
                    )}
                </div>



                <p className='text-lg'>{article?.content}</p>
            </div>
            {/* seu código aqui */}
        </div>
    );
}


export default ArticleDetails