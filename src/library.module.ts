import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
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
import {AuthorizationComponent} from './library/authorization/authorization.component';
import {AuthGuard} from './app/auth/auth.guard';
import {RegisterComponent} from './library/register/register.component';
import {AuthorizationInterceptor} from './library/interceptor/interceptor.service';
import {ReaderProvider} from './library/services/client.service';
import {ReaderService} from './library/services/reader-service/reader-service';
import {ConfirmationComponent} from './library/confirmation/confirmation.component';
import {ReaderProfileComponent} from './library/reader-profile/reader-profile.component';
import {FeedbackComponent} from './library/feedback/feedback.component';
import {ReaderFeedbacksComponent} from './library/reader-feedbacks/reader-feedbacks.component';
import {RateComponent} from './library/rate/rate.component';
import {AdminCabinetComponent} from './library/admin-cabinet/admin-cabinet.component';
import {UserStatisticComponent} from './library/user-statistics/user-statistic.component';
import {BookStatisticComponent} from './library/book-statistic/book-statistic.component';

const libraryRoutes: Routes = [
  {path: 'addBook', component: BookFormComponent, canActivate: [AuthGuard]},
  {path: 'editBook/:id', component: BookFormComponent, canActivate: [AuthGuard]},
  {path: 'home/:id', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'editBook', component: EditBookComponent, canActivate: [AuthGuard]},
  {path: 'addAuthor', component: AuthorFormComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'profile', component: ReaderProfileComponent, canActivate: [AuthGuard]},
  {path: 'feedback/:id', component: FeedbackComponent, canActivate: [AuthGuard]},
  {path: 'confirm/:type', component: ConfirmationComponent},
  {path: 'feedbacks', component: ReaderFeedbacksComponent, canActivate: [AuthGuard]},
  {path: 'admin-cabinet', component: AdminCabinetComponent, canActivate: [AuthGuard]},
  {path: 'reader-stat/:readerId', component: UserStatisticComponent, canActivate: [AuthGuard]},
  {path: 'book-stat/:bookId', component: BookStatisticComponent, canActivate: [AuthGuard]},

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
    RegisterComponent,
    AuthorizationComponent,
    AuthorFormComponent,
    ConfirmationComponent,
    ReaderProfileComponent,
    FeedbackComponent, ReaderFeedbacksComponent,
    RateComponent,
    AdminCabinetComponent,
    UserStatisticComponent,
    BookStatisticComponent,

  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(libraryRoutes),
    MatInputModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [{provide: DataProvider, useClass: HttpDataProvider},
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    {provide: ReaderProvider, useClass: ReaderService},
    {provide: MatDialogRef, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [LibraryComponent]
})

export class LibraryModule {

  constructor() {
  }
}
