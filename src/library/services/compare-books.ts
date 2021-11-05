import {Book} from '../model/book';

export const compareBooks = (b1:Book,b2:Book) => {
  return (b1.title === b2.title && b1.authorId === b2.authorId)
}
