import {Component, OnInit} from '@angular/core';
import {Book, Genre} from "./model/book";
import {DataProvider, SearchCriteria} from "./services/data-provider.service";
import {MatDialog} from "@angular/material/dialog";
import {BookFormComponent} from "./book-form/book-form.component";
import {EditBookComponent} from "./edit-book/edit-book.component";


@Component({
  selector: 'library-root',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less']
})
export class LibraryComponent implements OnInit {
  searchText: string = '';
  searchGenre: Array<string>;
  bookList: Array<Book>;
  genres: Array<string>;
  publishingYearsFrom: number;
  publishingYearsTo: number;
  searchCriteria: SearchCriteria;

  constructor(private dataProviderService: DataProvider, private addBookDialog: MatDialog, private updateBook: MatDialog,) {
    this.genres = Object.keys(Genre)

  }

  ngOnInit() {
    this.searchCriteria = new SearchCriteria(this.searchText, this.searchGenre, this.publishingYearsFrom, this.publishingYearsTo);
    this.dataProviderService.findBooks(this.searchCriteria).subscribe(value => this.bookList = value, error => console.error(error));
  }

  public searchBooks(): Array<Book> {
    this.searchCriteria = new SearchCriteria(this.searchText, this.searchGenre, this.publishingYearsFrom, this.publishingYearsTo);
    this.dataProviderService.findBooks(this.searchCriteria).subscribe(value => this.bookList = value, error => console.error(error));
    return this.bookList;
  }

  onOpenDialogClick() {
    let dialogRef = this.addBookDialog.open(BookFormComponent);
    dialogRef.componentInstance.addedBook.subscribe((addedBook: Book) => {
      this.dataProviderService.addBook(addedBook).subscribe(() => {
        this.bookList.push(addedBook)
      });
    });
  }

  removeBook(book: Book): void {
    this.dataProviderService.removeBook(book).subscribe(() => {
      this.dataProviderService.findBooks(this.searchCriteria).subscribe(
        (books) => this.bookList = books)
    });
  }

  editBook(book: Book) {
    let dialogRef = this.updateBook.open(EditBookComponent, {data: book});
    dialogRef.componentInstance.editedBook.subscribe((editedBook) => {
      this.dataProviderService.updateBook(editedBook).subscribe(() => {
      });
    });
  }

  public signUp() {
    // let dialogRef = this.signUpDialog.open(RegistrationComponent);
    // dialogRef.componentInstance.addedClient.subscribe((addedClient: Client) => {
    //   this.dataProviderService.addBook(addedClient);
    // });
  }
}
