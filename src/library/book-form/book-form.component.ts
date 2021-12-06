import {Component, Input, OnInit} from '@angular/core';
import {Book, Genre} from '../model/book';
import {DataProvider} from '../services/data-provider.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Author} from '../model/author';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export enum BookFormPath {
  EDIT = 'editBook/:id',
  CREATE = 'addBook'
}

@Component({
  selector: 'book-form',
  templateUrl: 'book-form.component.html',
  styleUrls: ['book-form.component.less']
})
export class BookFormComponent implements OnInit {
  form: FormGroup;
  obj: any;
  genres: Array<any>;
  authorList: Array<Author>
  searchAuthor: string = '';
  visibility: boolean = false;
  @Input() book?: Book = new Book();

  constructor(private dataProviderService: DataProvider, private router: Router, private activateRoute: ActivatedRoute) {
    this.genres = Object.keys(Genre);
  }

  public ngOnInit(): void {
    this.dataProviderService.findAuthors('<>').subscribe((result) => {
      this.authorList = result
    })
    if (this.activateRoute.snapshot && this.activateRoute.snapshot.routeConfig) {
      let path = <BookFormPath>this.activateRoute.snapshot.routeConfig.path;
      if (path === BookFormPath.EDIT) {
        let bookId = Number(this.activateRoute.snapshot.params.id);
        this.dataProviderService.getBooksById(bookId).subscribe((book) => {
          this.book = book;
          this.dataProviderService.getAuthorById(this.book.authorId).subscribe(result => {
            this.searchAuthor = result.firstName.concat(` ${result.lastName}`);
          })
        });
      }
      this.form = new FormGroup({
        title: new FormControl(this.book.title, [Validators.minLength(2)]),
        genre: new FormControl(this.book.genre, [Validators.required]),
        author: new FormControl(this.book.authorId, [Validators.minLength(4)]),
        publishingHouse: new FormControl(this.book.publishingHouse, [Validators.minLength(2)]),
        publicationDate: new FormControl(this.book.publicationDate, Validators.required),
        count: new FormControl(this.book.count, Validators.required)
      });
    }
  }

  public submit(): void {
    this.book.setTitle(this.form.controls['title'].value);
    this.book.setPublishingHouse(this.form.controls['publishingHouse'].value);
    this.book.setPublicationDate(this.form.controls['publicationDate'].value);
    this.book.setGenre(this.form.controls['genre'].value);
    this.book.setCount(this.form.controls['count'].value);

    let path = <BookFormPath>this.activateRoute.snapshot.routeConfig.path;
    if (path === BookFormPath.EDIT) {
      this.dataProviderService.updateBook(this.book).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
    if (path === BookFormPath.CREATE) {
      this.dataProviderService.addBook(this.book).subscribe(() => {
        this.router.navigate(['/home']);
        console.log(1)
      });
    }
  }

  public searchAuthors(searchText: string): void {
    this.dataProviderService.findAuthors(searchText).subscribe((result) => {
      this.authorList = result;
    })
  }

  public setAuthor(author: Author) {
    this.searchAuthor = author.firstName.concat(` ${author.lastName}`)
    this.book.setAuthorId(author.id);
    this.visibility = !this.visibility
  }

  public resetAuthor(): void {
    this.searchAuthor = '';
  }
}



