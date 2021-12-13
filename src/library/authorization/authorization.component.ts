import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {Reader} from '../model/reader';
import {Router} from '@angular/router';
import {ReaderProvider} from '../services/client.service';

@Component({
  selector: 'authorization',
  templateUrl: 'authorization.component.html',
  styleUrls: ['authorization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input() reader?: Reader
  @Output() isLogged:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readerService: ReaderProvider, private router: Router, private changeDetector: ChangeDetectorRef) {
  }

  public onSubmit(): void {
    let userData = {username: this.form.email, password: this.form.password};
    this.readerService.setAuthorization(btoa(`${this.form.email}:${this.form.password}`));
    this.readerService.logIn(userData).subscribe((result) => {
        this.readerService.getLoggedUser().subscribe((result) => {
          this.readerService.setCurrentUser(result);
          this.changeDetector.detectChanges();
          this.router.navigate(['/home']);
          this.isSuccessful = true;
        })
      },
    )
  }
}
