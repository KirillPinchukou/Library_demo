import {Injectable} from '@angular/core';
import {Book, STORAGE_NAME} from "../model/book";
import {DataProvider} from "./data-provider.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataProvider extends DataProvider {
  private books: Array<Book>;

  public getBooks(searchText: string): Array<Book> {
    this.books = this.loadBooks();
    if (searchText) {
      this.books = this.books.filter(book => book.getTitle().includes(searchText));
    }
    return this.books;
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
    book.setPublicationDate(obj['publicationDate'])
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
