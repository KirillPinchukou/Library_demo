import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reader} from '../model/reader';
import {ReaderService} from '../services/reader-service/reader-service';
import {Router} from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.less']
})
export class RegisterComponent  implements OnInit{

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  currentReader: Reader;

  @Input() reader?: Reader;

  form: any = {
    id: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    address: null,
    mail: null,
    password: '',
  };

  constructor(private readerService: ReaderService) {

  }
  ngOnInit() {
    this.readerService.getLoggedUser().subscribe((reader) => {
      this.form.id = reader.id;
      this.currentReader =reader;
      this.form.firstName = reader.firstName;
      this.form.lastName = reader.lastName;
      this.form.address = reader.address;
      this.form.phoneNumber = reader.phoneNumber;
      this.form.mail = reader.mail;
    })
  }

  public onSubmit(): void {
    if (this.currentReader) {
      this.readerService.updateReader(this.form).subscribe(() => {
      })
    } else {
      this.readerService.addReader(this.form).subscribe(() => {
      })
    }
  }
}
