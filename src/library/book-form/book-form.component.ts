import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataProvider} from "../services/data-provider.service";
import {Book} from "../model/book";

@Component({
  selector: 'book-form',
  templateUrl: 'book-form.component.html',
  styleUrls: ['book-form.component.less']
})
export class BookFormComponent implements OnInit {
  form: FormGroup;
  @Input() book?: Book = new Book();
  genres = [{name: 'history', id: 1}, {name: 'fantasy', id: 2}, {name: 'three', id: 3}]

  constructor(private dataProviderService: DataProvider) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.minLength(2)]),
      genre: new FormControl('', [Validators.minLength(3)]),
      author: new FormControl('', [Validators.minLength(4)]),
      publishingHouse: new FormControl('', [Validators.minLength(2)]),
      pageNum: new FormControl('', Validators.pattern("^[0-9]*$")),
      publicationDate: new FormControl('', Validators.required)
    });
    this.form.statusChanges.subscribe((status) => {
      console.log(status);

    })
  }

  submit() {
    this.dataProviderService.addBook(this.book);
  }
}



