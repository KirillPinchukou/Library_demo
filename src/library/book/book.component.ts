import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Book} from '../model/book';
import {DataProvider} from '../services/data-provider.service';
import {Author} from '../model/author';
import {Reader} from '../model/reader';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationComponent, TYPES} from '../confirmation/confirmation.component';
import {Router} from '@angular/router';
import {ReaderProvider} from '../services/client.service';

export interface BookChangeEvent {
  type: TYPES;
  book: Book;
}

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less']
})
export class BookComponent implements OnInit {
  author: Author;
  types;
  inStock: boolean = false;
  isSupervisor: boolean
  currentReader: Reader;
  @Input() book?: Book
  @Output() bookChanged = new EventEmitter<BookChangeEvent>();

  constructor(private dataProviderService: DataProvider, private readerProvider: ReaderProvider, private matDialog: MatDialog, public router: Router,) {
    this.types = TYPES;
  }

  ngOnInit() {
    this.book.count > 0 ? this.inStock = true : this.inStock = false;
    if (this.book?.authorId) {
      this.dataProviderService.getAuthorById(this.book.authorId).subscribe((result) => {
        this.author = result;
      })
    } else {
      this.dataProviderService.getAuthorById(0).subscribe((result) => {
        this.author = result;
      })
    }
      this.currentReader = this.readerProvider.getCurrentUser();
      if ((this.currentReader.roles.filter(role => role.name === 'supervisor').length > 0)) {
        this.isSupervisor = true;
      }
  }

  public onOpenDialogClick(event: TYPES): void {
    let dialogRef = this.matDialog.open(ConfirmationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.bookChanged.emit({
          type: event,
          book: this.book
        })
      } else {
        this.router.navigate(['/home']);
      }
    })
  }

  showError(message: string) {
    alert(message);
  }
}


