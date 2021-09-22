import {Book} from "../model/book";

export abstract class DataProvider {
  abstract getBooks(searchText: string): Array<Book>;
  abstract addBook(book: Book): void;
  abstract removeBook(book: Book): void;
  abstract updateBook(book: Book): void;
}
