"use client"

import { NavBar } from "@/components/molecules/Navbar"
import { FeaturedArticle } from "@/components/molecules/FeaturedArticle"
import { useArticle } from "@/context/ArticleContext"

const Home = () => {
  const { articles } = useArticle()

  if (articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando artigo...</p>
      </div>
    )
  }

  const firstArticle = articles[0]

  return (
    <div className="min-h-screen relative">
      <NavBar />

      <div className="flex items-center justify-center h-screen pt-20">
        <main className="flex p-3">
          <FeaturedArticle article={firstArticle} />
          <div>últimos 4 artigos publicados</div>
        </main>
        <footer>
          <div>últimos 3, depois dos 4</div>
        </footer>
      </div>
    </div>
  )
}

export default Home
