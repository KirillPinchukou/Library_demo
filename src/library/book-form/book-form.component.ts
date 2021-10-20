import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book, Genre } from '../model/book';

@Component({
  selector: 'book-form',
  templateUrl: 'book-form.component.html',
  styleUrls: ['book-form.component.less']
})
export class BookFormComponent implements OnInit {
  form: FormGroup;
  genres: Array<any>;

  @Input() book?: Book = new Book();
  @Output() addedBook = new EventEmitter<Book>();

  constructor() {
    this.genres = Object.keys(Genre)
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.minLength(2)]),
      genre: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.minLength(4)]),
      publishingHouse: new FormControl('', [Validators.minLength(2)]),
      pageNum: new FormControl('', Validators.pattern('^[0-9]*$')),
      publicationDate: new FormControl('', Validators.required)
    });
  }

  public submit(): void {
    this.addedBook.emit(this.book);
  }
}
