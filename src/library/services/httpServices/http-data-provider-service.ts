import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Book } from '../../model/book';
import { DataProvider, SearchCriteria } from '../data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class HttpDataProvider extends DataProvider {

  private readonly optionsPost = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  private readonly optionsGet = {
    headers: {
      'Accept': 'application/json'
    }
  }

  constructor(private httpClient: HttpClient) {
    super();
  }

  getBooks(): Observable<Array<Book>> {
    return this.httpClient.get<Array<Book>>(`${environment.URL}/books`, this.optionsGet);
  }

  getBooksById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${environment.URL}/books/${id}`, this.optionsGet);
  }

  public findBooks(searchCriteria: SearchCriteria): Observable<Array<Book>> {
    const optionsPost = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    let body = searchCriteria || {};
    if (searchCriteria) {
      return this.httpClient.post<Array<Object>>(`${environment.URL}/books/search`, body, optionsPost)
      .pipe(
        map(httpResponse => {
          console.log(httpResponse)
          return httpResponse.map(obj => this.mapBook(obj));
        })
      )
    } else {
      return this.httpClient.get<Array<Book>>(`${environment.URL}/books`)
      .pipe(
        map(httpResponse => httpResponse.map(obj => this.mapBook(obj)))
      )
    }
  }

  public addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${environment.URL}/books`, book, this.optionsPost);
  }

  public removeBook(book: Book): Observable<any> {
    return this.httpClient.delete(`${environment.URL}/books/${book.getId()}`)
  }

  public updateBook(book: Book): Observable<any> {
    return this.httpClient.put(`${environment.URL}/books/${book.getId()}`, book, this.optionsPost)
  }

  private mapBook(obj: any): Book {
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





