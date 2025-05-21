import { IUser } from "./IUser";
 interface IImageBuffer {
  type: string
  data: number[]
}


export interface IArticle {
  title: string;
  content: string;
  author: IUser;
  releaseDate: Date;
  image?: IImageBuffer 
}
