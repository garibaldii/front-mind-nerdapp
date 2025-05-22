'use client'

import { NavBar } from "@/components/molecules/Navbar"
import ArticleDataTable from "@/components/ui/datatable/ArticleDataTable"
import { useUser } from "@/context/UserContext"

function MyArticles() {
  const { user } = useUser()

  return (
    <div>
      <NavBar />
      {user && user.articles && (
        <ArticleDataTable
          articles={user.articles}
        />
      )}
    </div>
  )
}   

export default MyArticles
