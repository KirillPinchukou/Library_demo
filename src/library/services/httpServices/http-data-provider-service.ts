import {HttpClient, HttpHandler} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Book} from '../../model/book';
import {BookResult, DataProvider, SearchCriteria} from '../data-provider.service';
import {Author} from '../../model/author';
import {Order} from '../../model/order';
import {Feedback} from '../../model/feedback';

@Injectable({
  providedIn: 'root'
})
export class HttpDataProvider extends DataProvider {

  private readonly optionsPost = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  private readonly optionsGet = {
    headers: {
      'Accept': 'application/json',
    },
  }

  constructor(private httpClient: HttpClient) {
    super();
  }

  getBooks(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Object>>(`${environment.URL}/books`, this.optionsGet)
      .pipe(
        map(response => response.map(obj => this.mapBook(obj)))
      );
  }

  getBooksById(id: number): Observable<Book> {
    return this.httpClient.get<Object>(`${environment.URL}/books/${id}`, this.optionsGet)
      .pipe(
        map(response => this.mapBook(response))
      );
  }

  public findBooks(searchCriteria: SearchCriteria): Observable<BookResult> {
    const optionsPost = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic bWVAa29sZHlyLmNvbTprb2xkeXI='
      }
    };

    let body = searchCriteria || {};
    if (searchCriteria) {
      return this.httpClient.post<BookResult>(`${environment.URL}/books/search`, body, optionsPost)
        .pipe(map(httpResponse => {
          httpResponse.result = httpResponse.result.map(obj => this.mapBook(obj));
          return httpResponse;
        }));
    } else {
      return this.httpClient.get<BookResult>(`${environment.URL}/books`)
        .pipe(map(httpResponse => {
          httpResponse.result = httpResponse.result.map(obj => this.mapBook(obj));
          return httpResponse;
        }));
    }
  }

  public addBook(book: Book): Observable<any> {
    return this.httpClient.post(`${environment.URL}/books`, book, this.optionsPost);
  }

  public removeBook(book: Book): Observable<any> {
    return this.httpClient.delete(`${environment.URL}/books/${book.getId()}`);
  }

  public takeBook(book: Book, readerId: number): Observable<any> {
    let body = {bookId: book.id, readerId: readerId, ordered: new Date()};
    return this.httpClient.post<Observable<any>>(`${environment.URL}/books/take`, body, this.optionsPost);
  }

  public updateBook(book: Book): Observable<any> {
    return this.httpClient.put(`${environment.URL}/books/${book.getId()}`, book, this.optionsPost);
  }

  public getAuthors(): Observable<Array<Author>> {
    return this.httpClient.get<Array<Object>>(`${environment.URL}/authors`, this.optionsGet)
      .pipe(
        map(result => result.map(obj => this.mapAuthor(obj)))
      );
  }

  public getAuthorById(id: number): Observable<Author> {
    return this.httpClient.get<Object>(`${environment.URL}/authors/${id}`, this.optionsGet)
      .pipe(
        map(result => this.mapAuthor(result))
      );
  }

  public findAuthors(searchText: string): Observable<Array<Author>> {
    let url = searchText ? `${environment.URL}/authors?search=${searchText}` : `${environment.URL}/authors`;
    return this.httpClient.get<Array<Object>>(url, this.optionsGet)
      .pipe(
        map(result => result.map(obj => this.mapAuthor(obj)))
      );
  }

  public addAuthor(author: Author): Observable<any> {
    return this.httpClient.post(`${environment.URL}/authors`, author, this.optionsPost);
  }

  public getCookie(): string {
    return document.cookie;
  }

  public getReaderOrders(readerId: number, returned: boolean): Observable<Array<Order>> {
    let url = !!returned ? `${environment.URL}/readers/${readerId}/orders?returned=${returned}` : `${environment.URL}/readers/${readerId}/orders`;
    return this.httpClient.get<Array<Object>>(url, this.optionsGet)
      .pipe(
        map(result => result.map(obj => this.mapOrder(obj)))
      );
  }

  public returnBook(order: Order): Observable<any> {
    return this.httpClient.post(`${environment.URL}/books/return`, order, this.optionsPost)
  }

  public createFeedback(feedBack: Feedback): Observable<any> {
    return this.httpClient.post(`${environment.URL}/books/feedback`, feedBack, this.optionsPost);
  }

  public deleteFeedback(feedbackId: number): Observable<any> {
    return this.httpClient.delete(`${environment.URL}/books/feedbacks/${feedbackId}`);
  }

  public getReaderFeedbacks(readerId: number): Observable<Array<Feedback>> {
    return this.httpClient.get<Array<Object>>(`${environment.URL}/readers/${readerId}/feedbacks`, this.optionsGet)
      .pipe(
        map(response => response.map(obj => this.mapFeedBack(obj)))
      );
  }

  public getBookFeedbacks(bookId: number): Observable<Array<Feedback>> {
    return this.httpClient.get<Array<Object>>(`${environment.URL}/books/${bookId}/feedbacks`, this.optionsGet)
      .pipe(
        map(response => response.map(obj => this.mapFeedBack(obj)))
      );
  }

  public getBookOrders(bookId: number): Observable<Array<Order>> {
    return this.httpClient.get<Array<Object>>(`${environment.URL}/books/${bookId}/orders`, this.optionsGet)
      .pipe(
        map(response => response.map(obj => this.mapOrder(obj)))
      );
  }


  private mapBook(obj: any): Book {
    let book = new Book();
    book.setId(parseInt(obj['id']));
    book.setTitle(obj['title']);
    book.setAuthorId(obj['authorId']);
    book.setGenre(obj['genre']);
    book.setPublishingHouse(obj['publishingHouse']);
    book.setPageNum(parseInt(obj['pageNum']));
    book.setBookCover(obj['bookCover']);
    book.setCount(obj['count']);
    let date = new Date(Date.parse(obj['publicationDate']));
    book.setPublicationDate(date);
    return book;
  }

  private mapAuthor(obj: any): Author {
    let author = new Author();
    author.setAuthorId(parseInt(obj['id']));
    author.setFirstName(obj['firstName']);
    author.setLastName(obj['lastName']);
    author.setDateOfBirth(obj['dateOfBirth']);
    author.setBooks(obj['books']);
    return author;
  }

  private mapOrder(obj: any): Order {
    let order = new Order();
    order.setOrderId(parseInt(obj['id']));
    order.setBooks(obj['bookId']);
    order.setReaderId(obj['readerId']);
    order.setReturnDate(obj['returned']);
    order.setOrderDate(obj['ordered']);
    order.setBook(obj['book']);
    return order;
  }

  private mapFeedBack(obj: any): Feedback {
    let feedback = new Feedback();
    feedback.setId(parseInt(obj['id']))
    feedback.setBookId(parseInt(obj['bookId']));
    feedback.setClientId(parseInt(obj['readerId']));
    feedback.setDate(obj['date']);
    feedback.setText(obj['text']);
    feedback.setRate(obj['rate']);
    return feedback;
  }
}
