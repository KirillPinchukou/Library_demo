import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataProvider} from "../services/data-provider.service";
import {Book} from "../model/book";

@Component({
  selector: 'book-form',
  templateUrl: 'book-form.component.html',
  styleUrls: ['book-form.component.css']
})
export class BookFormComponent implements OnInit {
  form: FormGroup;
  book: Book = new Book();

  constructor(private dataProviderService: DataProvider) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      publishingHouse: new FormControl('', Validators.required),
      pageNum: new FormControl('', Validators.required),
      bookCover: new FormControl('', Validators.required)
    })
  }

  submit() {
    console.log(this.book)
    console.log(localStorage.getItem('jsonData'))
    this.dataProviderService.addBook(this.book);
  }
}
