import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BookFormComponent} from './book-form/book-form.component';
import {EditBookComponent} from './edit-book/edit-book.component';
import {Book, Genre} from './model/book';
import {DataProvider, SearchCriteria, SearchCriteriaBuilder} from './services/data-provider.service';


@Component({
  selector: 'library-root',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less']
})
export class LibraryComponent implements OnInit {
  searchText: string = '';
  searchGenre: string;
  bookList: Array<Book>;
  genres: Array<string>;
  publishingYearsFrom: number;
  publishingYearsTo: number;
  searchCriteria: SearchCriteria;
  booksPerPage: number = 20;
  currentPage: number = 0;
  totalBookAmount: number;
  currentFilter: string = 'id';
  filterOrder: string = 'ASC';

  constructor(private dataProviderService: DataProvider, private addBookDialog: MatDialog, private updateBook: MatDialog) {
    this.genres = Object.keys(Genre)
  }

  ngOnInit() {
    this.searchCriteria = new SearchCriteriaBuilder()
      .withTitle(this.searchText)
      .withGenre(this.searchGenre)
      .withYearFrom(this.publishingYearsFrom)
      .withYearTill(this.publishingYearsTo)
      .withPagination(this.currentPage, this.booksPerPage)
      .build();

    this.dataProviderService.findBooks(this.searchCriteria).subscribe(
      value => {
        this.bookList = value.result.map(obj => this.mapBook(obj));
        this.totalBookAmount = value.total
      },
      error => console.error(error));
  }

  public searchBooks(currentPage: number): void {
    this.currentPage = 0;
    this.doSearch(this.currentPage);
    this.doSearch(this.currentPage);
  }

  public doSearch(currentPage: number): void {
    this.searchCriteria = new SearchCriteriaBuilder()
      .withTitle(this.searchText)
      .withGenre(this.searchGenre)
      .withYearFrom(this.publishingYearsFrom)
      .withYearTill(this.publishingYearsTo)
      .withPagination(currentPage, this.booksPerPage)
      .withSort(this.currentFilter, this.filterOrder)
      .build();

    this.dataProviderService.findBooks(this.searchCriteria).subscribe(
      value => {
        this.bookList = value.result.map(obj => this.mapBook(obj));
      },
      error => console.error(error));
  }

  public onOpenDialogClick(): void {
    let dialogRef = this.addBookDialog.open(BookFormComponent);
    dialogRef.componentInstance.addedBook.subscribe((addedBook: Book) => {
      this.dataProviderService.addBook(addedBook).subscribe(() => {
        this.bookList.push(addedBook)
      });
    });
  }

  public removeBook(book: Book): void {
    this.dataProviderService.removeBook(book).subscribe(() => {
      this.dataProviderService.findBooks(this.searchCriteria).subscribe(
        books => {
          this.bookList = books.result;
        })
    });
  }

  public editBook(book: Book): void {
    let dialogRef = this.updateBook.open(EditBookComponent, {data: book});
    dialogRef.componentInstance.editedBook.subscribe((editedBook) => {
      this.dataProviderService.updateBook(editedBook).subscribe(() => {
      });
    });
  }

  public nextPage(): void {
    if (this.totalBookAmount > (this.currentPage + 1) * this.booksPerPage && this.bookList.length >= (this.currentPage + 1) * this.booksPerPage) {
      this.currentPage++;
      this.doSearch(this.currentPage);
    }
  }

  public previosPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.doSearch(this.currentPage);
    }
  }

  public changeOrder(): void {
    if (!(this.currentFilter === 'id')){
      if (this.filterOrder === 'ASC') {
        this.filterOrder = 'DESC'
      } else {
        this.filterOrder = 'ASC'
      }
      this.doSearch(this.currentPage);
    }

  }

  public setFilter(filterName: string): void {

  }

  private mapBook(obj: any): Book {
    let book = new Book();
    book.setId(parseInt(obj['id']));
    book.setTitle(obj['title']);
    book.setAuthor(obj['author']);
    book.setGenre(obj['genre']);
    book.setPublishingHouse(obj['publishingHouse']);
    book.setPageNum(parseInt(obj['pageNum']));
    book.setBookCover(obj['bookCover']);
    let date = new Date(Date.parse(obj['publicationDate']));
    book.setPublicationDate(date);
    return book;
  }

  public signUp() {
    // let dialogRef = this.signUpDialog.open(RegistrationComponent);
    // dialogRef.componentInstance.addedClient.subscribe((addedClient: Client) => {
    //   this.dataProviderService.addBook(addedClient);
    // });
  }
}
