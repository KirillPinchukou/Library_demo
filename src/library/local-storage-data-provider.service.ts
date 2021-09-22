import {Injectable} from '@angular/core';
import {Book} from "./model/Book";

export abstract class DataProvider {
  abstract getBooks(searchText: string): Array<Book>;
  abstract addBook(book: Book): void;
  abstract removeBook(book: Book): void;
  abstract updateBook(book: Book): void;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataProvider extends DataProvider {
  books: Array<Book>;

  constructor() {
    super();
    let tmpBooks: Array<any> = JSON.parse(this.getDataFromLocalStorage());
    this.books = tmpBooks.map((obj: any) => this.mapBook(obj));

  }

  public getBooks(searchText: string): Array<Book> {
    if (searchText) {
      return this.books.filter(book => book.getTitle().includes(searchText));
    }
    return this.books;
  }

  public addBook(book: Book): void {
    this.books.push(book);
    this.putDataToLocalStorage(JSON.stringify(this.books));
  }

  removeBook(book: Book): void {
    throw new Error('Method not implemented.');
  }

  updateBook(book: Book): void {
    throw new Error('Method not implemented.');
  }

  private mapBook(obj: any): Book {
    let book = new Book();
    book.setId(parseInt(obj['id']));
    book.setTitle(obj['title']);
    book.setAuthor(obj['author']);
    book.setGenre(obj['genre']);
    book.setPageNum(parseInt(obj['pageNum']));
    book.setBookCover(obj['bookCover']);
    return book;
  }

  private getDataFromLocalStorage(): string {
    return localStorage.getItem('library');
  }

  private putDataToLocalStorage(data: string): void {
    localStorage.setItem('library', data);
  }
}

