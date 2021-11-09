import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BookComponent} from './book.component';
import {GenrePipe, PageNumPipe} from './pipes/book.pipe';
import {DataProvider} from '../services/data-provider.service';
import {HttpDataProvider} from '../services/httpServices/http-data-provider-service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LibraryComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let httpTesting: HttpTestingController;
  let httpClient: HttpClient

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent, PageNumPipe, GenrePipe],
      providers: [{provide: DataProvider, useValue: new HttpDataProvider(httpClient)}],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    let backend = TestBed.get(HttpTestingController)
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

