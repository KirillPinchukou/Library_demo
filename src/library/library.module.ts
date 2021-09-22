import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {LibraryComponent} from "./library.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {LocalStorageDataProvider} from "./services/local-storage-data-provider.service";
import {BookComponent} from "./book/book.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataProvider} from "./services/data-provider.service";


@NgModule({
  declarations: [
    LibraryComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: DataProvider, useValue: new LocalStorageDataProvider() }],
  bootstrap: [LibraryComponent]
})
export class LibraryModule {
  constructor() {
  }
}
