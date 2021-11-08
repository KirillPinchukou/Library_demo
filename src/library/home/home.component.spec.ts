import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {STORAGE_NAME} from '../model/book';
import {testData} from '../json';
import {LocalStorageDataProvider} from '../services/loacal-storage-services/local-storage-data-provider.service';
import {DataProvider} from '../services/data-provider.service';
import {MatDialogModule} from '@angular/material/dialog';
import {GenrePipe, PageNumPipe} from '../book/pipes/book.pipe';
import {HttpDataProvider} from '../services/httpServices/http-data-provider-service';
import {HttpClient} from '@angular/common/http';

describe('LibraryComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [HomeComponent,GenrePipe,PageNumPipe],
      providers: [{provide: DataProvider, useValue: new HttpDataProvider(httpClient)}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));
  });

  // it('should create the app', () => {
  //   expect(component).toBeTruthy();
  // });
});
