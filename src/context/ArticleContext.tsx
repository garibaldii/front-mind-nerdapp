'use client'

import { getArticles } from '@/service/ArticleService'
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'

type ArticleContextType = {
  articles: any[]
  loading: boolean
  refreshArticleData: () => void
}

export const ArticleContext = createContext<ArticleContextType | undefined>(undefined)

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Memoiza a função para manter a mesma referência entre renders, e evita o redimensionamento desnecessário
  const fetchData = useCallback(async () => {
    try {
      const articlesData = await getArticles()
      setArticles(articlesData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Executa o fetch quando o provider monta
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <ArticleContext.Provider value={{ articles, loading, refreshArticleData: fetchData }}>
      {children}
    </ArticleContext.Provider>
  )
}

export const useArticle = () => {
  const context = useContext(ArticleContext)
  if (!context) throw new Error('useArticle must be used within ArticleProvider')
  return context
}
