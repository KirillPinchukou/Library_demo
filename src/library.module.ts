import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {BookFormComponent} from './library/book-form/book-form.component';
import {BookComponent} from './library/book/book.component';
import {AuthorPipe, GenrePipe, PageNumPipe} from './library/book/pipes/book.pipe';
import {EditBookComponent} from './library/edit-book/edit-book.component';
import {HomeComponent} from './library/home/home.component';
import {DataProvider} from './library/services/data-provider.service';
import {HttpDataProvider} from './library/services/httpServices/http-data-provider-service';
import {LibraryComponent} from './library.component';
import {AuthorFormComponent} from './library/author/author-form/author-form.component';

const libraryRoutes: Routes = [
  {path: 'addBook', component: BookFormComponent},
  {path: 'editBook/:id', component: BookFormComponent},
  {path: 'home', component: HomeComponent},
  {path: 'editBook', component: EditBookComponent},
  {path: 'addAuthor', component: AuthorFormComponent},

]
@NgModule({
  declarations: [
    HomeComponent,
    BookComponent,
    BookFormComponent,
    PageNumPipe,
    GenrePipe,
    EditBookComponent,
    LibraryComponent,
    AuthorPipe,
    AuthorFormComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(libraryRoutes),
    MatInputModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [{provide: DataProvider, useClass: HttpDataProvider},{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [LibraryComponent]
})

export class LibraryModule {

  constructor() {
  }
}
