import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BookComponent} from "./book.component";
import {GenrePipe, PageNumPipe} from "./pipes/book.pipe";

describe('LibraryComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent, PageNumPipe, GenrePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

