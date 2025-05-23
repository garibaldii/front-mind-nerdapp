import { IUser } from "./IUser";
 export interface IImageBuffer {
  type: string
  data: number[]
}


export interface IArticle {
  id: number;
  title: string;
  content: string;
  author: IUser;
  releaseDate: Date;
  likes: number;
  image?: IImageBuffer 
  editDate?: Date
}
