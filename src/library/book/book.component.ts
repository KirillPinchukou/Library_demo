import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../model/book';
import {DataProvider} from '../services/data-provider.service';
import {Author} from '../model/author';

export interface BookChangeEvent {
  type: String;
  book: Book;
}

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less']
})
export class BookComponent implements OnInit {
  title = '';
  author: Author;
  @Input() book?: Book
  @Output() bookChanged = new EventEmitter<BookChangeEvent>();

  constructor(private dataProviderService: DataProvider) {
  }

  ngOnInit() {
    if (this.book?.authorId) {
      this.dataProviderService.getAuthorById(this.book.authorId).subscribe((result) => {
        this.author = result;
      })
    } else {
      this.dataProviderService.getAuthorById(0).subscribe((result) => {
        this.author = result;
      })
    }
  }

  public removeBook(): void {
    this.bookChanged.emit({
      type: 'remove',
      book: this.book
    });
  }

  public editBook(): void {
    this.bookChanged.emit({
      type: 'edit',
      book: this.book
    });
  }
}


