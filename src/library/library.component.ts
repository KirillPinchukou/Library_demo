import {Component} from '@angular/core';
import {Book} from "./model/book";
import {DataProvider} from "./services/data-provider.service";
import {MatDialog} from "@angular/material/dialog";
import {BookFormComponent} from "./book-form/book-form.component";


@Component({
  selector: 'library-root',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less']
})
export class LibraryComponent {
  title = 'LibraryDemo';
  searchText: string = '';

  constructor(private dataProviderService: DataProvider,private addBookDialog: MatDialog) {
  }

  public setSearchText(text: string): void {
    this.searchText = text;
  }

  public getBooks(): Array<Book> {
    return this.dataProviderService.getBooks(this.searchText);
  }
  onOpenDialogClick(){
    this.addBookDialog.open(BookFormComponent);
  }
}
