import {Author} from '../model/author';
import {Book} from '../model/book';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {Feedback} from '../model/feedback';

export interface BookResult {
  result: Array<Book>;
  page?: number;
  size?: number;
  total: number;
}
export interface AuthorResult {
  result: Array<Author>;
  page: number;
  size: number;
  total: number;
}
export interface PageResult {
  result: Array<Book>;
  page: number;
  size: number;
  total: number;
}

export abstract class DataProvider {
  abstract getBooks(): Observable<Array<Book>>;

  abstract getBooksById(id: number): Observable<Book>;

  abstract getAuthors() :Observable<Array<Author>>;

  abstract findBooks(criteria: SearchCriteria): Observable<BookResult>;

  abstract addBook(book: Book): Observable<Book>;

  abstract removeBook(book: Book): Observable<any>;

  abstract updateBook(book: Book): Observable<any>;

  abstract findAuthors(searchText: string): Observable<Array<Author>>;

  abstract addAuthor(author: Author): Observable<Author>;

  abstract getAuthorById(id: number): Observable<Author>;

  abstract getCookie(): string;

  abstract getReaderOrders(readerId: number, returned?: boolean): Observable<Array<Order>>;

   abstract returnBook(order: Order): Observable<any>;

  abstract createFeedback(feedBack: Feedback): Observable<any>;

  abstract getReaderFeedbacks(readerId: number): Observable<Array<Feedback>>;

  abstract deleteFeedback(feedbackId: number): Observable<any>;

  abstract getBookFeedbacks(bookId: number): Observable<Array<Feedback>>;

  abstract getBookOrders(bookId: number): Observable<Array<Order>>;

}

export class Pagination {
  public size: number;
  public index: number;
}

export class Sort {
  public name: string;
  public order: string;
}

export class SearchCriteria {
  public title: string;
  public author: string;
  public genre: Array<string>;
  public note: string;
  public publisher: string;
  public publishYearTill: number;
  public publishYearFrom: number;
  public page: Pagination;
  public sort: Sort;
}

export class SearchCriteriaBuilder {
  private title: string;
  private author: string;
  private genre: Array<string>;
  private note: string;
  private publisher: string;
  private publishYearTill: number;
  private publishYearFrom: number;
  private sort: Sort;
  private page: Pagination;

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
      if (!this.genre) {
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

  public withPagination(index: number, size: number): SearchCriteriaBuilder {
    if (!this.page) {
      this.page = new Pagination()
    }
    this.page.size = size;
    this.page.index = index;
    return this;
  }

  public withSort(name: string, order: string): SearchCriteriaBuilder {
    if (!this.sort) {
      this.sort = new Sort();
    }
    this.sort.order = order;
    this.sort.name = name;
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
    if (this.genre && this.genre.length > 0) {
      criteria.genre = this.genre;
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
    if (this.sort) {
      criteria.sort = this.sort;
    }
    if (this.page) {
      criteria.page = this.page;
    }
    return criteria;
  }
}
