import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LibraryComponent} from "./library.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {STORAGE_NAME} from "./model/book";
import {testData} from "./json";
import {LocalStorageDataProvider} from "./services/local-storage-data-provider.service";
import {DataProvider} from "./services/data-provider.service";
import {MatDialogModule} from "@angular/material/dialog";

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [LibraryComponent,],
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LibraryComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`"should gets books"`, () =>{
    localStorage.clear()
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));
    expect(component.getBooks()).toBeDefined();
  });

});
