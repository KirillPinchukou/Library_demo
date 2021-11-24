import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Book} from '../model/book';
import {DataProvider} from '../services/data-provider.service';
import {Author} from '../model/author';
import {ReaderService} from '../services/reader-service/reader-service';
import {Reader} from '../model/reader';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationComponent, TYPES} from '../confirmation/confirmation.component';
import {Router} from '@angular/router';


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
  title = '';
  author: Author;
  types;
  isSupervisor: boolean
  currentReader: Reader;
  @Input() book?: Book
  @Output() bookChanged = new EventEmitter<BookChangeEvent>();

  constructor(private dataProviderService: DataProvider, private readerProvider: ReaderService, private matDialog: MatDialog, public router: Router,) {
    this.types = TYPES;
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
    this.readerProvider.getLoggedUser().subscribe((reader) => {
      this.currentReader = reader;
      if ((reader.roles.filter(role => role.name === 'supervisor').length > 0)) {
        this.isSupervisor = true;
      }
    })
  }

  public onOpenDialogClick(event: TYPES): void {
    let dialogRef = this.matDialog.open(ConfirmationComponent,);
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
}


