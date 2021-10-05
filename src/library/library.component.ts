import {Component, OnInit} from '@angular/core';
import {Book, Genre} from "./model/book";
import {DataProvider} from "./services/data-provider.service";
import {MatDialog} from "@angular/material/dialog";
import {BookFormComponent} from "./book-form/book-form.component";

@Component({
  selector: 'library-root',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less']
})
export class LibraryComponent implements OnInit {
  searchText: string = '';
  searchGenre:Genre;
  bookList: Array<Book>;
  genres:Array<any>;
  publishingYearsFrom :number;
  publishingYearsTo :number;
  constructor(private dataProviderService: DataProvider, private addBookDialog: MatDialog) {
    this.genres = Object.keys(Genre)
  }

  ngOnInit() {
    this.bookList = this.dataProviderService.getBooks(this.searchText,this.searchGenre,this.publishingYearsFrom,this.publishingYearsTo);
  }

  public searchBooks(): Array<Book> {
    this.bookList =  this.dataProviderService.getBooks(this.searchText,this.searchGenre,this.publishingYearsFrom,this.publishingYearsTo);
    return this.bookList;
  }

  onOpenDialogClick() {
    let dialogRef = this.addBookDialog.open(BookFormComponent);
    dialogRef.componentInstance.addedBook.subscribe((addedBook: Book) => {
      this.dataProviderService.addBook(addedBook);
    });
  }
}
