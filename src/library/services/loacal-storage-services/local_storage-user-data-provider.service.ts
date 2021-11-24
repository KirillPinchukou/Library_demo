import {Injectable} from '@angular/core';
import {Reader, USER_STORAGE_NAME} from "../../model/reader";
import {ReaderProvider, ClientSearchCriteria} from "../client.service";
import {BookResult, DataProvider, SearchCriteria} from '../data-provider.service';
import {Observable} from 'rxjs';
import {Author} from '../../model/author';
import {Feedback} from '../../model/feedback';
import {Book} from '../../model/book';
import {Order} from '../../model/order';

type UserPredicate = (client: Reader) => boolean;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageUserDataProvider extends DataProvider  {
  private clients: Array<Reader>;

  public getClients(searchCriteria: ClientSearchCriteria): Array<Reader> {
      this.clients = this.loadClients();
      return this.clients;
    }

 public addClient(client: Reader) {
 }
  private getDataFromLocalStorage(): string {
    return localStorage.getItem(USER_STORAGE_NAME);
  }

  private putDataToLocalStorage(data: string): void {
    localStorage.setItem(USER_STORAGE_NAME, data);
  }

  private loadClients(): Array<Reader> {
    let tmpClients: Array<any> = JSON.parse(this.getDataFromLocalStorage());
    return tmpClients.map((obj: any) => this.mapClient(obj));
  }


  public mapClient(obj: any): Reader {
    let client = new Reader();
    client.setId(parseInt(obj['id']));
    client.setLastName(obj['name']);
    client.setMail(obj['mail']);
    client.setAddress(obj['address']);
    client.setPhoneNumber(obj['phoneNumber']);
    return client;
  }

  addAuthor(author: Author): Observable<Author> {
    return undefined;
  }

  addBook(book: Book): Observable<Book> {
    return undefined;
  }

  createFeedback(feedBack: Feedback): Observable<any> {
    return undefined;
  }

  findAuthors(searchText: string): Observable<Array<Author>> {
    return undefined;
  }

  findBooks(criteria: SearchCriteria): Observable<BookResult> {
    return undefined;
  }

  getAuthorById(id: number): Observable<Author> {
    return undefined;
  }

  getAuthors(): Observable<Array<Author>> {
    return undefined;
  }

  getBooks(): Observable<Array<Book>> {
    return undefined;
  }

  getBooksById(id: number): Observable<Book> {
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

  removeBook(book: Book): Observable<any> {
    return undefined;
  }

  returnBook(order: Order): Observable<any> {
    return undefined;
  }

  takeBook(book: Book, readerId: number): Observable<any> {
    return undefined;
  }

  updateBook(book: Book): Observable<any> {
    return undefined;
  }
}
