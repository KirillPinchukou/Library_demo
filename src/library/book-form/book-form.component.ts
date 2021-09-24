import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataProvider} from "../services/data-provider.service";
import {Book} from "../model/book";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'book-form',
  templateUrl: 'book-form.component.html',
  styleUrls: ['book-form.component.less']
})
export class BookFormComponent implements OnInit {
  form: FormGroup;
  book: Book = new Book();
  bookCoverImage: File;

  constructor(private dataProviderService: DataProvider, addBookDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.book.title, [Validators.required, Validators.minLength(4)]),
      genre: new FormControl('', Validators.minLength(4)),
      author: new FormControl('', Validators.minLength(4)),
      publishingHouse: new FormControl('', Validators.minLength(4)),
      pageNum: new FormControl('', Validators.minLength(4)),
      bookCover: new FormControl('', Validators.minLength(4))
    })
  }

  submit() {
    this.dataProviderService.addBook(this.book);
  }


}



