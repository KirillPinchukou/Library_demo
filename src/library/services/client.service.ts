import {Reader} from '../model/reader';
import {Observable} from 'rxjs';

export abstract class ReaderProvider {

  abstract addReader(reader: any): Observable<any>;

  abstract getAuthorization(): string;

  abstract setCurrentUser(reader: Reader): void;

  abstract getCurrentUser(): Reader;

  abstract setAuthorization(authorization: string): void;

  abstract getLoggedUser(): Observable<Reader>;

  abstract logIn(data: any): Observable<string>;

  abstract getReaderById(id: number): Observable<Reader>;

  abstract updateReader(reader: Reader): Observable<any>;

  abstract getReaders(): Observable<Array<Reader>>;

}

export class ClientSearchCriteria {
  public searchName: string;
  public searchMail: string;

  constructor(searchName: string, searchMail: string) {
    this.searchName = searchName;
    this.searchMail = searchMail;
  }
}
