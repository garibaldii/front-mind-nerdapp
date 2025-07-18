"use client";

import { NavBar } from "@/components/molecules/Navbar";
import { FeaturedArticle } from "@/components/molecules/FeaturedArticle";
import { useArticle } from "@/context/ArticleContext";

const Home = () => {
  const { articles } = useArticle();

  if (!articles.length) {
    return (
      <div className="min-h-screen relative flex flex-col">
        <NavBar />
        <div className="flex flex-1 items-center justify-center px-4 text-center">
          <p className="text-lg sm:text-xl text-gray-400 max-w-xl">
            Opa, parece que ninguém ainda postou um artigo, tente postar para
            exibí-los na aqui!
          </p>
        </div>
      </div>
    );
  }

  const lastArticleIndex = articles.length - 1;
  const lastArticle = articles[lastArticleIndex];

  // Pega os próximos 4 artigos (excluindo o último)
  const lastFourArticles = [];
  for (
    let i = articles.length - 2;
    i >= 0 && lastFourArticles.length < 4;
    i--
  ) {
    lastFourArticles.push(articles[i]);
  }

  // Pega os últimos 3 artigos (excluindo os primeiros e 4 últimos usados)
  const LastThreeArticles = [];
  for (
    let i = articles.length - 6;
    i >= 1 && LastThreeArticles.length < 3;
    i--
  ) {
    LastThreeArticles.push(articles[i]);
  }

  return (
    <div className="min-h-screen relative">
      <NavBar />

      <div className="flex flex-col items-center justify-center w-full mt-3">
        <div className="w-[100%] lg:w-3/4">
          <main className="sm:flex justify-center items-stretch gap-8 max-w-7xl mt-10">
            {/* Lado esquerdo */}
            <div className="sm:w-1/2 flex flex-col mb-10 ">
              <FeaturedArticle
                article={lastArticle}
                title={true}
                content={false}
                author={true}
                image={true}
                hoverEffect={false}
              />
            </div>

            {/* Lado direito  */}
            <div className="sm:w-1/2 bg-[#090909] text-white p-4 h-full flex flex-col justify-between ">
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
            <div className="w-full justify-center">
              {/* Scroll apenas no mobile (default), grid no sm+ */}
              <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible p-1">
                {LastThreeArticles.map((article, index) => (
                  <div
                    key={index}
                    className="min-w-[85vw] max-w-[85vw] sm:min-w-0 sm:max-w-full sm:w-auto flex-shrink-0 sm:flex-shrink sm:col-span-1"
                  >
                    <FeaturedArticle
                      article={article}
                      title={true}
                      content={true}
                      author={false}
                      image={true}
                      hoverEffect={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
