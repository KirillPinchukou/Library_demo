import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Book, Genre} from '../model/book';
import {DataProvider, SearchCriteria, SearchCriteriaBuilder} from '../services/data-provider.service';
import {Author} from '../model/author';

@Component({
  selector: 'library-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
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
  authorList: Array<Author>;

  constructor(private dataProviderService: DataProvider, private addBookDialog: MatDialog, private updateBook: MatDialog) {
    this.genres = Object.keys(Genre)
  }

  ngOnInit() {
    this.dataProviderService.getAuthors().subscribe((result) => {
      this.authorList = result;
      console.log('reciveA', result);
    })
    this.searchCriteria = new SearchCriteriaBuilder()
      .withTitle(this.searchText)
      .withGenre(this.searchGenre)
      .withYearFrom(this.publishingYearsFrom)
      .withYearTill(this.publishingYearsTo)
      .withPagination(this.currentPage, this.booksPerPage)
      .build();

    this.dataProviderService.findBooks(this.searchCriteria).subscribe(
      value => {
        this.bookList = value.result;
        this.totalBookAmount = value.total;
      },
      error => console.error(error));
  }

  public searchBooks(currentPage: number): void {
    this.currentPage = 0;
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
        this.bookList = value.result;
        this.totalBookAmount = value.total
      },
      error => console.error(error));
  }

  public removeBook(book: Book): void {
    this.dataProviderService.removeBook(book).subscribe(() => {
      this.dataProviderService.findBooks(this.searchCriteria).subscribe(
        value => {
          this.bookList = value.result;
        })
    });
  }

  public editBook(book: Book): void {
      this.dataProviderService.updateBook(book).subscribe(() => {
        this.doSearch(this.currentPage);
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

  public signUp() {
    // let dialogRef = this.signUpDialog.open(RegistrationComponent);
    // dialogRef.componentInstance.addedClient.subscribe((addedClient: Client) => {
    //   this.dataProviderService.addBook(addedClient);
    // });
  }
}
