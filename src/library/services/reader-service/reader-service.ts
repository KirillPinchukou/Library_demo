import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Reader} from '../../model/reader';
import {ReaderProvider} from '../client.service';


@Injectable({
  providedIn: 'root'
})
export class ReaderService extends ReaderProvider{
  public authorization: string;
  public currentUser: Reader;
  private readonly optionsPost = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  private readonly optionsGet = {
    headers: {
      'Accept': 'application/json',
    }
  }

  public getCurrentUser(): Reader {
    return this.currentUser;
  }

  public setCurrentUser( reader: Reader) {
    this.currentUser = reader;
  }

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getAuthorization(): string {
    return this.authorization;
  }

  public setAuthorization(authorization: string): void {
    this.authorization = authorization;
  }

  public addReader(reader: any): Observable<any> {
    return this.httpClient.post(`${environment.URL}/readers`, reader,
      {
        headers: {
          'Accept': 'application/json',
        }
      });
  }

  public getLoggedUser(): Observable<Reader> {
    return this.httpClient.get<Object>(`${environment.URL}/readers/me`,  {
      headers: {
        'Accept': 'application/json',
      }
    }).pipe(
      map(result => this.mapReader(result))
    );
  }

  public logIn(data: any): Observable<string> {
    return new Observable(subscriber => {
      this.httpClient.post(`http://scw000112219:8082/login?username=${data.username}&password=${data.password}`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
      }).subscribe(response => {
          subscriber.next();
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
    })
  }

  public getReaderById(id: number):Observable<Reader> {
    return this.httpClient.get<Object>(`${environment.URL}/readers/${id}`, this.optionsGet)
      .pipe(
        map(response => this.mapReader(response))
      );
  }

  public updateReader(reader: Reader): Observable<any> {
    return this.httpClient.put(`${environment.URL}/readers/${reader.id}`, reader, this.optionsPost);
  }

  public getReaders(): Observable<Array<Reader>> {
    return this.httpClient.get<Array<Reader>>(`${environment.URL}/readers`, this.optionsGet);
  }

  private mapReader(obj: any): Reader {
    let reader = new Reader();
    reader.setId(parseInt(obj['id']));
    reader.setFirstName(obj['firstName']);
    reader.setLastName(obj['lastName']);
    reader.setMail(obj['mail']);
    reader.setPhoneNumber(obj['phoneNumber']);
    reader.setAddress(obj['address']);
    reader.setRoles(obj['roles']);
    return reader;
  }
}

export interface ReaderResult {
  id: number;
  firstName: string;
  lastName: string;
  mail: string;
  address: string
  phoneNumber: string;
  note: string;
  roles: [
    {
      name: string;
    }
  ]
}
