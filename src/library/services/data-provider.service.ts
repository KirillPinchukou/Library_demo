import {Book} from "../model/book";
import {Observable} from "rxjs";


export abstract class DataProvider {
  abstract findBooks(criteria: SearchCriteria): Observable <Array<Book>>;

  abstract addBook(book: Book): Observable<Book>;

  abstract removeBook(book: Book): Observable<any>;

  abstract updateBook(book: Book): Observable<any>;
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
