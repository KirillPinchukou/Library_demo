import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { BookComponent } from './book/book.component';
import { GenrePipe, PageNumPipe } from './book/pipes/book.pipe';
import { EditBookComponent } from './edit-book/edit-book.component';
import { LibraryComponent } from './library.component';
import { DataProvider } from './services/data-provider.service';
import { HttpDataProvider } from './services/httpServices/http-data-provider-service';

const libraryRoutes: Routes = [
  {path: 'addBook', component: BookFormComponent}
]

@NgModule({
  declarations: [
    LibraryComponent,
    BookComponent,
    BookFormComponent,
    PageNumPipe,
    GenrePipe,
    EditBookComponent
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
