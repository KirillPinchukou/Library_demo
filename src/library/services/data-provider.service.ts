import {Book} from "../model/book";
import {Observable} from "rxjs";


export abstract class DataProvider {
  abstract findBooks(criteria: SearchCriteria): Observable <Array<Book>>;

  abstract addBook(book: Book): Observable <Array<Book>>;

  abstract removeBook(book: Book): void;

  abstract updateBook(book: Book): void;
}

export class SearchCriteria {
  public title: string;
  public genre: string;
  public publishYearTill: number;
  public publishYearFrom: number;

  constructor(title: string, genre: string, publishYearFrom: number, publishYearTill: number) {
    this.title = title;
    this.genre = genre;
    this.publishYearFrom = publishYearFrom;
    this.publishYearTill = publishYearTill;
  }
}
