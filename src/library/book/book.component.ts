import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../model/book';
import {DataProvider} from '../services/data-provider.service';
import {Author} from '../model/author';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less']
})
export class BookComponent implements OnInit {
  title = '';
  author: Author;
  @Input() book?: Book
  @Output() removedBook = new EventEmitter<Book>();
  @Output() editedBook = new EventEmitter<Book>();

  constructor(private dataProviderService: DataProvider) {
  }

  ngOnInit() {
    this.dataProviderService.getAuthorById(this.book.authorId)
      .subscribe((result) => {
        this.author = result;
      });
  }

  public removeBook(): void {
    this.removedBook.emit(this.book);
  }

  public editBook(): void {
    this.editedBook.emit(this.book);
  }
}


