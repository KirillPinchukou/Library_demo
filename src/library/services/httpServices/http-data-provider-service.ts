import {Injectable} from '@angular/core';
import {Book} from "../../model/book";
import {DataProvider, SearchCriteria} from "../data-provider.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

type BookPredicate = (book: Book) => boolean;

@Injectable({
  providedIn: 'root'
})
export class HttpDataProvider extends DataProvider {
  private books: Array<Book>;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public findBooks(searchCriteria: SearchCriteria): Observable<Array<Book>> {
    let body = searchCriteria || {};
    if (searchCriteria) {
      return this.httpClient.post<Array<Object>>(`${environment.URL}/books/search`, body)
        .pipe(
          map(httpResponse => {
            console.log(httpResponse)
            return httpResponse.map(obj => this.mapBook(obj));
          })
        )
    } else {
      return this.httpClient.get<Array<Object>>(`${environment.URL}/books`)
        .pipe(
          map(httpResponse => httpResponse.map(obj => this.mapBook(obj)))
        )
    }
  }

  public addBook(book: Book): Observable<Array<Book>>  {
    return this.httpClient.post<Array<Book>>(`${environment.URL}/books`, book);
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
}






