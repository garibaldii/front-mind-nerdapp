"use client";

import { FeaturedArticle } from "@/components/molecules/FeaturedArticle";
import { NavBar } from "@/components/molecules/Navbar";
import { useArticle } from "@/context/ArticleContext";
import { useEffect } from "react";

function Articles() {
  const { articles, refreshArticleData } = useArticle();

  useEffect(() => {
    console.log("estou rodando");
    refreshArticleData();
  }, [refreshArticleData]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {articles.map((article, index) => (
          <FeaturedArticle
            key={index}
            article={article}
            title={true}
            content={true}
            author={true}
            image={true}
            hoverEffect={false}
          />
        ))}
      </main>
    </div>
  );
}

export default Articles;
