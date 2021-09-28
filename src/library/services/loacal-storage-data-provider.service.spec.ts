import {TestBed} from '@angular/core/testing';
import {data, TEST_STOARGE, testData} from "../json";
import {Book, STORAGE_NAME, TEST_STORAGE_NAME} from "../model/book";
import {LocalStorageDataProvider} from './local-storage-data-provider.service';

describe('DataProviderService', () => {
  let service: LocalStorageDataProvider;
  let book: Book = new Book();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageDataProvider]
    });
    service = TestBed.inject(LocalStorageDataProvider);
    localStorage.setItem(TEST_STORAGE_NAME, TEST_STOARGE)
  });
  afterEach(() => {
    localStorage.setItem(TEST_STORAGE_NAME, TEST_STOARGE)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return books', () => {
    localStorage.clear()
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));
    expect(service.getBooks('')).toBeDefined();
  });
  it(`"should add book`, () => {
    book.setId(12);
    localStorage.clear()
    localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
    let lentgh_book = service.getBooks('').length + 1;
    service.addBook(book);
    expect(lentgh_book == service.getBooks('').length).toBeTruthy()
  })
});

