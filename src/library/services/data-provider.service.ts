import {Book, Genre} from "../model/book";


export abstract class DataProvider {
  abstract getBooks(searchCriteria: SearchCriteria): Array<Book>;

  abstract addBook(book: Book): void;

  abstract removeBook(book: Book): void;

  abstract updateBook(book: Book): void;
}

export class SearchCriteria {
  public searchTitle: string;
  public searchGenre: Genre;
  public searchYearTo: number;
  public searchYearFrom: number;

  constructor(searchTitle: string, searchGenre: Genre, searchYearTo: number, searchYearFrom: number) {
    this.searchTitle = searchTitle;
    this.searchGenre = searchGenre;
    this.searchYearFrom = searchYearFrom;
    this.searchYearTo = searchYearTo;
  }
}
