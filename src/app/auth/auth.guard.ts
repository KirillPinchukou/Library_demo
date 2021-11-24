import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ReaderService} from '../../library/services/reader-service/reader-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  auth: boolean;

  constructor(private readerService: ReaderService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.readerService.getAuthorization()) {
      return true;
    } else {
      this.router.navigate(['/authorization'])
      return false;
    }
  }
}
