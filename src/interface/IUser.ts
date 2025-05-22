import { IArticle, IImageBuffer } from "./IArticle"

export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string
    articles?: IArticle[]
    photo?: IImageBuffer
    likedArticles?: IArticle[]
}