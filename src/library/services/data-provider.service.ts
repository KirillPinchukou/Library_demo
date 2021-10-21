import {Observable} from "rxjs";
import {Book} from "../model/book";


export abstract class DataProvider {
  abstract findBooks(criteria: SearchCriteria): Observable <Array<Book>>;

  abstract addBook(book: Book): Observable<Book>;

  abstract removeBook(book: Book): Observable<any>;

  abstract updateBook(book: Book): Observable<any>;
}

export class SearchCriteria {
  public title: string;
  public author: string;
  public genre: Array<string>;
  public note: string;
  public publisher: string;
  public publishYearTill: number;
  public publishYearFrom: number;
}

export class SearchCriteriaBuilder {
  private title: string;
  private author: string;
  public genre: Array<string>;
  private note: string;
  private publisher: string;
  private publishYearTill: number;
  private publishYearFrom: number;

  public withTitle(title: string): SearchCriteriaBuilder {
    this.title = title;
    return this;
  }

  public withAuthor(author: string): SearchCriteriaBuilder {
    this.author = author;
    return this;
  }

  public withGenre(genre: string): SearchCriteriaBuilder {
    if (genre) {
      if (!!genre){
        this.genre = [];
      }
      this.genre.push(genre);
    }
    return this;
  }

  public withNote(note: string): SearchCriteriaBuilder {
    this.note = note;
    return this;
  }

  public withYearFrom(year: number): SearchCriteriaBuilder {
    this.publishYearFrom = year;
    return this;
  }

  public withPublisher(publisher: string): SearchCriteriaBuilder {
    this.publisher = publisher;
    return this;
  }

  public withYearTill(year: number): SearchCriteriaBuilder {
    this.publishYearTill = year;
    return this;
  }

  public build(): SearchCriteria {
    const criteria = new SearchCriteria();
    if (this.title) {
      criteria.title = this.title;
    }
    if (this.author) {
      criteria.author = this.author;
    }
    if (this.genre){
      if (this.genre.length > 0) {
        criteria.genre = this.genre;
      }
    }
    if (this.note) {
      criteria.note = this.note;
    }
    if (this.publishYearFrom) {
      criteria.publishYearFrom = this.publishYearFrom;
    }
    if (this.publisher) {
      criteria.publisher = this.publisher;
    }
    if (this.publishYearTill) {
      criteria.publishYearTill = this.publishYearTill;
    }
    return criteria;
  }
}
