import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ReaderService} from '../../library/services/reader-service/reader-service';
import {ReaderProvider} from '../../library/services/client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  auth: boolean;

  constructor(private readerService: ReaderProvider, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.readerService.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/authorization'])
      return false;
    }
  }
}
