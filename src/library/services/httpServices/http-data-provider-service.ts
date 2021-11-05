import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Book} from '../../model/book';
import {BookResult, DataProvider, SearchCriteria} from '../data-provider.service';
import {Author} from '../../model/author';

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
    return this.httpClient.get<Book>(`${environment.URL}/books/${id}`, this.optionsGet).pipe(
      map(response => {
        response = this.mapBook(response);
        return response;
      })
    )
  }

  public findBooks(searchCriteria: SearchCriteria): Observable<BookResult> {
    const optionsPost = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    let body = searchCriteria || {};
    if (searchCriteria) {
      return this.httpClient.post<BookResult>(`${environment.URL}/books/search`, body, optionsPost)
        .pipe(
          map(httpResponse => {
            httpResponse.result = httpResponse.result.map(obj => this.mapBook(obj));
            return httpResponse;
          })
        )
    } else {
      return this.httpClient.get<BookResult>(`${environment.URL}/books`)
        .pipe(
          map(httpResponse => {
            httpResponse.result = httpResponse.result.map(obj => this.mapBook(obj));
            return httpResponse;
          }))
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

  public getAuthors(): Observable<Array<Author>> {
    return this.httpClient.get<Array<Object>>(`${environment.URL}/authors`, this.optionsGet).pipe(
      map(result => {
        return result.map(obj => this.mapAuthor(obj))
      })
    );
  }

  public getAuthorById(id: number): Observable<Author> {
    return this.httpClient.get<Author>(`${environment.URL}/authors/${id}`, this.optionsGet).pipe(
      map(result => {
        return this.mapAuthor(result);
      })
    )
  }

  public findAuthors(searchText: string): Observable<Array<Author>> {
    let url = searchText ? `${environment.URL}/authors?search=${searchText}` : `${environment.URL}/authors`;
    return this.httpClient.get<Array<Object>>(url, this.optionsGet)
      .pipe(
        map(httpResponse => {
          return httpResponse.map(obj => this.mapAuthor(obj));
        })
      )
  }

  public addAuthor(author: Author): Observable<Author> {
    return this.httpClient.post<Author>(`${environment.URL}/authors`, author, this.optionsPost);
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
}





