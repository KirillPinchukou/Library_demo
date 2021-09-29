import {TestBed} from '@angular/core/testing';
import {data, TEST_STOARGE, testData} from "../json";
import {Book, Genre, STORAGE_NAME, TEST_STORAGE_NAME} from "../model/book";
import {LocalStorageDataProvider} from './local-storage-data-provider.service';
import {compareBooks} from "./compare-books";


describe('DataProviderService', () => {
  let service: LocalStorageDataProvider;
  let book: Book;

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
    book = new Book();
    book.setId(12);
    book.setGenre(Genre.Fantasy);
    book.setPublicationDate(new Date());
    book.setPublishingHouse('OZ');
    book.setTitle('ABBA');
    book.setAuthor('Rara');
    localStorage.clear()
    localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
    service.getBooks('');
    service.addBook(book);
    expect(compareBooks(service.getBooks('')[service.getBooks('').length -1],book)).toBeTruthy()
  })
});


