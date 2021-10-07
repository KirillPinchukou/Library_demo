import {Component, OnInit} from '@angular/core';
import {Book, Genre} from "./model/book";
import {DataProvider} from "./services/data-provider.service";
import {MatDialog} from "@angular/material/dialog";
import {BookFormComponent} from "./book-form/book-form.component";
import {SearchCriteria} from "./services/local-storage-data-provider.service";

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
  searchCriteria:SearchCriteria

  constructor(private dataProviderService: DataProvider, private addBookDialog: MatDialog) {
    this.genres = Object.keys(Genre)

  }

  ngOnInit() {
    this.searchCriteria = new SearchCriteria(this.searchText,this.searchGenre,this.publishingYearsFrom,this.publishingYearsTo);
    this.bookList = this.dataProviderService.getBooks(this.searchCriteria);
  }

  public searchBooks(): Array<Book> {
    this.searchCriteria = new SearchCriteria(this.searchText,this.searchGenre,this.publishingYearsFrom,this.publishingYearsTo);
    this.bookList =  this.dataProviderService.getBooks(this.searchCriteria);
    return this.bookList;
  }

  onOpenDialogClick() {
    let dialogRef = this.addBookDialog.open(BookFormComponent);
    dialogRef.componentInstance.addedBook.subscribe((addedBook: Book) => {
      this.dataProviderService.addBook(addedBook);
    });
  }
}
