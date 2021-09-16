import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {LibraryComponent} from "./library.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {DataProviderService} from "./data-provider.service";
import {Book} from "./model/Book";
import {BookComponent} from "./book/book.component";


@NgModule({
  declarations: [
    LibraryComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [DataProviderService],
  bootstrap: [LibraryComponent]
})
export class LibraryModule {
  constructor() {
  }
}
