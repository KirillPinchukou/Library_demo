import {Injectable} from '@angular/core';
import {Book, STORAGE_NAME} from "../model/book";
import {DataProvider, SearchCriteria} from "./data-provider.service";
import * as R from 'ramda'

type BookPredicate = (book: Book) => boolean;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataProvider extends DataProvider {
  private books: Array<Book>;

  public getBooks(searchCriteria: SearchCriteria): Array<Book> {
    if (searchCriteria) {
      this.books = this.loadBooks();
      const predicates = this.composeFilter(searchCriteria);

      return R.filter(book => {
        for (const predicate of predicates) {
          if (!predicate.call(this, book)) {
            return false;
          }
        }
        return true;
      }, this.books);

    } else {
      return this.books;
    }
  }

  private composeFilter(searchCriteria: SearchCriteria) {
    let predicates: Array<BookPredicate> = [];
    if (searchCriteria.searchTitle) {
      predicates.push(book => book.getTitle().toLocaleLowerCase().includes(searchCriteria.searchTitle.toLocaleLowerCase()));
    }
    if (searchCriteria.searchGenre) {
      predicates.push(book => book.getGenre().toLocaleLowerCase() === searchCriteria.searchGenre.toLocaleLowerCase());
    }
    if (searchCriteria.searchYearFrom) {
      predicates.push(book => book.getPublicationDate().getFullYear() <= searchCriteria.searchYearFrom);
    }
    if (searchCriteria.searchYearTo) {
      predicates.push(book => book.getPublicationDate().getFullYear() >= searchCriteria.searchYearTo);
    }
    return predicates;
  }

  public addBook(book: Book): void {

    this.books.push(book);
    this.putDataToLocalStorage(JSON.stringify(this.books));
  }

  public removeBook(book: Book): void {
    throw new Error('Method not implemented.');
  }

  public updateBook(book: Book): void {
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
    let tmpBooks: Array<any> = JSON.parse(this.getDataFromLocalStorage());
    return tmpBooks.map((obj: any) => this.mapBook(obj));
  }
}



