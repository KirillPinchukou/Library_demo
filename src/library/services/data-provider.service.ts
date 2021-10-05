import {Book, Genre} from "../model/book";

export abstract class DataProvider {
  abstract getBooks(searchText: string, searchGenre: Genre, publishingYearsTo: number, publishingYearsFrom: number):Array<Book>;

  abstract addBook(book: Book): void;

  abstract removeBook(book: Book): void;

  abstract updateBook(book: Book): void;
}
