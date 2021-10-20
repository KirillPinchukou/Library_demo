import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less']
})
export class BookComponent {
  title = '';
  
  @Input() book?: Book
  @Output() removedBook = new EventEmitter<Book>();
  @Output() editedBook = new EventEmitter<Book>();

  public removeBook(): void {
    this.removedBook.emit(this.book);
  }
  
  public editBook(): void {
    this.editedBook.emit(this.book);
  }
}


