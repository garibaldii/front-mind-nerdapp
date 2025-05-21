"use client"

import { NavBar } from "@/components/molecules/Navbar"
import { FeaturedArticle } from "@/components/molecules/FeaturedArticle"
import { useArticle } from "@/context/ArticleContext"

const Home = () => {
  const { articles } = useArticle()

  const firstArticle = articles[0]

  // Pega os 4 últimos artigos (excluindo o primeiro)
  const lastFourArticles = []
  for (let i = articles.length - 1; i >= 1 && lastFourArticles.length < 4; i--) {
    lastFourArticles.push(articles[i])
  }

  return (
    <div className="min-h-screen relative">
      <NavBar />

      {articles.length && <div className="flex flex-col items-center w-full mt-3">
        <main className="flex justify-center items-stretch p-3 gap-8 max-w-7xl w-full mt-10">

          {/* Lado esquerdo */}
          <div className="w-1/3 h-full flex flex-col ">
            <FeaturedArticle
              article={firstArticle}
              title={true}
              content={false}
              author={true}
              image={true}
              hoverEffect={false}
            />
          </div>

          {/* Lado direito  */}
          <div className="w-1/3 bg-[#090909] text-white p-4 h-full flex flex-col justify-between ">
            <h2 className="text-2xl font-semibold mb-4">New</h2>
            <div className="flex flex-col gap-4 flex-1 ">
              {lastFourArticles.map((article, index) => (
                <FeaturedArticle
                  key={index}
                  article={article}
                  title={true}
                  content={true}
                  author={false}
                  image={false}
                  hoverEffect={true}
                />
              ))}
            </div>
          </div>
        </main>

        <footer className="mt-3">
          <div className="flex">últimos 3, depois dos 4</div>
        </footer>
      </div>
      }

    </div>
  )
}

export default Home
