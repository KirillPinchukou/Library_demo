import {Book} from "../model/book";
import {SearchCriteria} from "./local-storage-data-provider.service";

export abstract class DataProvider {
  abstract getBooks(searchCriteria:SearchCriteria):Array<Book>;

  abstract addBook(book: Book): void;

  abstract removeBook(book: Book): void;

  abstract updateBook(book: Book): void;
}
