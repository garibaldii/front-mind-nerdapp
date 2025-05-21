'use client'

import { NavBar } from "@/components/molecules/Navbar"
import { useUser } from "@/context/UserContext"

function MyArticles(){
    const {user, refreshUserData} = useUser()

    return(
        <div>
            <NavBar/>
        </div>
    )
}

export default MyArticles