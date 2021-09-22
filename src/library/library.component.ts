import {Component} from '@angular/core';
import {Book} from "./model/book";
import {DataProvider} from "./services/data-provider.service";


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
}
