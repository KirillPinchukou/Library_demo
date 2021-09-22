import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LibraryComponent} from "./library.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LibraryComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'LibraryDemo'`, () => {
    const fixture = TestBed.createComponent(LibraryComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('LibraryDemo');
  });

  it(`"should get books"`, () =>{
    expect(component.getBooks() != null);
  });
});
