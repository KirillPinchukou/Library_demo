import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Book, Genre} from '../model/book';
import {DataProvider} from '../services/data-provider.service';
import {Router} from '@angular/router';

@Component({
  selector: 'edit-book',
  templateUrl: 'edit-book.component.html',
  styleUrls: ['edit-book.component.less']
})
export class EditBookComponent implements OnInit {
  form: FormGroup;
  genres: Array<any>;

  @Input() book?: Book;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Book,private dataProviderService: DataProvider, private router: Router) {
    this.book = this.data;
    this.genres = Object.keys(Genre)
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.data.title, [Validators.minLength(2)]),
      genre: new FormControl(this.data.title, [Validators.required]),
      author: new FormControl(this.data.title, [Validators.minLength(4)]),
      publishingHouse: new FormControl(this.data.publishingHouse, [Validators.minLength(2)]),
      pageNum: new FormControl(this.data.title, Validators.pattern('^[0-9]*$')),
      publicationDate: new FormControl(this.book.publicationDate, Validators.required)
    });
  }

  public submit(): void {
    this.dataProviderService.updateBook(this.book).subscribe(() => {
      this.router.navigate(['/home']);
    });

  }
}



