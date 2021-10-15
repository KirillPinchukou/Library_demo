import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {LibraryComponent} from "./library.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {BookComponent} from "./book/book.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataProvider} from "./services/data-provider.service";
import {BookFormComponent} from "./book-form/book-form.component";
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HttpDataProvider} from "./services/httpServices/http-data-provider-service";
import {HttpClientModule} from "@angular/common/http";
import {BookPipe, GenrePipe} from "./book/pipes/book.pipe";

const libraryRoutes: Routes = [
  {path: 'addBook', component: BookFormComponent}
]

@NgModule({
  declarations: [
    LibraryComponent,
    BookComponent,
    BookFormComponent,
    BookPipe,
    GenrePipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(libraryRoutes),
    MatInputModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [{provide: DataProvider, useClass: HttpDataProvider}],
  bootstrap: [LibraryComponent]
})

export class LibraryModule {

  constructor() {
  }
}
