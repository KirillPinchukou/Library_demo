import {Component, OnInit} from '@angular/core';
import {Book, Genre} from '../model/book';
import {DataProvider, SearchCriteria, SearchCriteriaBuilder} from '../services/data-provider.service';
import {Author} from '../model/author';
import {BookChangeEvent} from "../book/book.component";

@Component({
  selector: 'library-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  searchText: string = '';
  searchGenre: string;
  books: Array<Book>;
  genres: Array<string>;
  publishingYearsFrom: number;
  publishingYearsTo: number;
  searchCriteria: SearchCriteria;
  booksPerPage: number = 20;
  currentPage: number = 0;
  totalBookAmount: number;
  currentFilter: string = 'id';
  filterOrder: string = 'ASC';
  authors: Array<Author>;

  constructor(private dataProviderService: DataProvider) {
    this.genres = Object.keys(Genre)
  }

  ngOnInit() {
    this.dataProviderService.getAuthors().subscribe((result) => {
      this.authors = result;
      console.log('authors: ', result);
    })
    this.searchBooks();
  }

  public searchBooks(): void {
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

    this.dataProviderService.findBooks(this.searchCriteria).subscribe(page => {
      this.books = page.result;
      this.totalBookAmount = page.total
    }, error => console.error(error));
  }

  public bookChanged(event: BookChangeEvent): void {
    if (event.type === 'remove') {
      this.dataProviderService.removeBook(event.book).subscribe(() => {
        this.doSearch(this.currentPage);
      });
    } else {
      this.dataProviderService.updateBook(event.book).subscribe(() => {
        this.doSearch(this.currentPage);
      });
    }
  }

  public nextPage(): void {
    if (this.totalBookAmount > (this.currentPage + 1) * this.booksPerPage && this.books.length >= (this.currentPage + 1) * this.booksPerPage) {
      this.currentPage++;
      this.doSearch(this.currentPage);
    }
  }

  public previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.doSearch(this.currentPage);
    }
  }

  public changeOrder(): void {
    if (!(this.currentFilter === 'id')) {
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
