import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReaderProvider} from '../services/client.service';

@Injectable({
  providedIn: 'root'
})
export class CookieInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let dataProvider = this.injector.get(ReaderProvider);
    let authorization = dataProvider.getAuthorization();
    if (authorization) {
      authorization = `Basic ${dataProvider.getAuthorization()}`
      return next.handle(httpRequest.clone({setHeaders:{Authorization: authorization}}));
    }
    else {
      return next.handle(httpRequest);
    }
  }

}
