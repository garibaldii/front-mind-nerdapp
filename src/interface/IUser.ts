import { IArticle } from "./IArticle"

export interface IUser {
    name: string,
    email: string,
    password: string
    articles?: IArticle[]
}