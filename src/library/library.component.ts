import {Component, OnInit} from '@angular/core';
import {Book} from "./model/Book";
import {DataProvider, LocalStorageDataProvider} from "./local-storage-data-provider.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'library-root',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  title = 'LibraryDemo';
  searchText: string = '';

  constructor(private dataProviderService: DataProvider) {
  }

  public setSearchText(text: string): void {
    this.searchText = text;
  }

  public getBooks(): Array<Book> {
    return this.dataProviderService.getBooks(this.searchText);
  }

  // public addBooks(addBook: Book): Book {
  //   return this.dataProviderService.addBooks(addBook);
  // }
}
