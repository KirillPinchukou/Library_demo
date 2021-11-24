import {Injectable} from '@angular/core';
import * as R from 'ramda';
import {Observable} from 'rxjs';
import {Book, STORAGE_NAME} from '../../model/book';
import {BookResult, DataProvider, SearchCriteria} from '../data-provider.service';
import {Author} from '../../model/author';
import {Feedback} from '../../model/feedback';
import {Order} from '../../model/order';

type BookPredicate = (book: Book) => boolean;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataProvider extends DataProvider {
  private books: Array<Book>;

  public findBooks(searchCriteria: SearchCriteria): Observable<BookResult> {
    return new Observable<BookResult>((response) => {
      let books = this.loadBooks();
      if (searchCriteria) {
        const predicates = this.composeFilter(searchCriteria);
        const filtered = R.filter(book => {
          for (const predicate of predicates) {
            if (!predicate.call(this, book)) {
              return false;
            }
          }
          return true;
        }, books);

        response.next({result: filtered, total: books.length});
      } else {
        response.next({result: books, total: books.length});
      }
    });
  }

  getBooks(): Observable<Array<Book>> {
    return new Observable(subscriber => subscriber.next([]));
  }

  getBooksById(id: number): Observable<Book> {
    return new Observable(subscriber => subscriber.next(null));
  }

  private composeFilter(searchCriteria: SearchCriteria) {
    let predicates: Array<BookPredicate> = [];
    if (searchCriteria.title) {
      predicates.push(book => book.getTitle().toLocaleLowerCase().includes(searchCriteria.title.toLocaleLowerCase()));
    }
    if (searchCriteria.genre) {
      predicates.push(book => searchCriteria.genre.includes(book.getGenre().toLocaleLowerCase()));

    }
    if (searchCriteria.publishYearFrom) {
      predicates.push(book => book.getPublicationDate().getFullYear() <= searchCriteria.publishYearFrom);
    }
    if (searchCriteria.publishYearTill) {
      predicates.push(book => book.getPublicationDate().getFullYear() >= searchCriteria.publishYearTill);
    }
    return predicates;
  }

  public addBook(book: Book): Observable<Book> {
    return new Observable<Book>((subscriber) => {
      this.books.push(book);
      this.putDataToLocalStorage(JSON.stringify(this.books));
      subscriber.next(book)
    });
  }

  public removeBook(book: Book): Observable<Array<Book>> {
    throw new Error('Method not implemented.');
  }

  public updateBook(book: Book): Observable<Array<Book>> {
    throw new Error('Method not implemented.');
  }

  public mapBook(obj: any): Book {
    let book = new Book();
    book.setId(parseInt(obj['id']));
    book.setTitle(obj['title']);
    book.setAuthorId(obj['author']);
    book.setGenre(obj['genre']);
    book.setPublishingHouse(obj['publishingHouse']);
    book.setPageNum(parseInt(obj['pageNum']));
    book.setBookCover(obj['bookCover']);
    let date = new Date(Date.parse(obj['publicationDate']));
    book.setPublicationDate(date);
    return book;
  }

  private getDataFromLocalStorage(): string {
    return localStorage.getItem(STORAGE_NAME);
  }

  private putDataToLocalStorage(data: string): void {
    localStorage.setItem(STORAGE_NAME, data);
  }

  private loadBooks(): Array<Book> {
    let tmpClients: Array<any> = JSON.parse(this.getDataFromLocalStorage());
    return tmpClients.map((obj: any) => this.mapBook(obj));
  }
  public addAuthor(author: Author): Observable<Author> {
    return undefined;
  }
  public findAuthors(searchText: string): Observable<Array<Author>> {
    return undefined;
  }
  public getAuthorById(id: number): Observable<Author> {
    return undefined;
  }
  public getAuthors(): Observable<Array<Author>> {
    return undefined;
  }

  createFeedback(feedBack: Feedback): Observable<any> {
    return undefined;
  }

  getCookie(): string {
    return '';
  }

  getOrders(readerId: number): Observable<Array<Order>> {
    return undefined;
  }

  getReaderFeedbacks(readerId: number): Observable<Array<Feedback>> {
    return undefined;
  }

  returnBook(order: Order): Observable<any> {
    return undefined;
  }

  takeBook(book: Book, readerId: number): Observable<any> {
    return undefined;
  }
}
