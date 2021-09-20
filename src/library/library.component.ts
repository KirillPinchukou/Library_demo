import {Component, Input} from '@angular/core';
import {Book} from "./model/Book";
import {DataProviderService} from "./data-provider.service";

@Component({
  selector: 'library-root',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  title = 'LibraryDemo';
  searchText: string = '';


  constructor(private dataProviderService: DataProviderService) {
  }

  public setSearchText(text: string): void {
    this.searchText = text;
  }

  public getBooks(): Array<Book> {
    return this.dataProviderService.getBooks(this.searchText);
  }
}
