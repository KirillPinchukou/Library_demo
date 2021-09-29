import {Book} from "../model/book";

export const compareBooks = (b1:Book,b2:Book) => {
  if(b1.title === b2.title && b1.author === b2.author){
    return true;
  }
}
