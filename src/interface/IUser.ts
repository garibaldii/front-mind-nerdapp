import { IArticle } from "./IArticle"

export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string
    articles?: IArticle[]
}