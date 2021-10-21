import {Injectable} from '@angular/core';
import {Book, STORAGE_NAME} from "../../model/book";
import {DataProvider, SearchCriteria} from "../data-provider.service";
import {Observable} from "rxjs";

type BookPredicate = (book: Book) => boolean;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataProvider extends DataProvider {
  private books: Array<Book>;

  public findBooks(searchCriteria: SearchCriteria):  Observable <Array<Book>> {
    if (searchCriteria) {
      this.books = this.loadBooks();
      const predicates = this.composeFilter(searchCriteria);
      return new Observable<Array<Book>>(subscriber => {
        subscriber.next(this.books);
      });
    }
    return undefined;


     // return R.filter(book => {
     //   for (const predicate of predicates) {
     //     if (!predicate.call(this, book)) {
     //       return false;
     //     }
     //   }
     //   return true;
     // }, this.books);

   }

   getBooks(): Observable<Array<Book>> {
     return undefined;
   }

  getBooksById(id: number): Observable<Book> {
     return undefined;
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
    book.setAuthor(obj['author']);
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
  }



