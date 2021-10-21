import {Book} from "../model/book";
import {Observable} from "rxjs";


export abstract class DataProvider {
  abstract findBooks(criteria: SearchCriteria): Observable<Array<Book>>;

  abstract addBook(book: Book): Observable<Book>;

  abstract removeBook(book: Book): Observable<any>;

  abstract updateBook(book: Book): Observable<any>;

  abstract getBooks(): Observable<Array<Book>>;

  abstract getBooksById(id: number): Observable<Book>;
}

export class SearchCriteria {
  public title: string;
  public genre: Array<string>;
  public publishYearTill: number;
  public publishYearFrom: number;

  constructor(title: string, genre: Array<string>, publishYearFrom: number, publishYearTill: number) {
    this.title = title;
    this.genre = genre;
    this.publishYearFrom = publishYearFrom;
    this.publishYearTill = publishYearTill;
  }
}
