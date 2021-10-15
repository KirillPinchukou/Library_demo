import {TestBed} from '@angular/core/testing';
import {TEST_STOARGE, testData} from "../../json";
import {Book, Genre, STORAGE_NAME, TEST_STORAGE_NAME} from "../../model/book";
import {LocalStorageDataProvider} from './local-storage-data-provider.service';
import {compareBooks} from "../compare-books";
import {SearchCriteria} from "../data-provider.service";

describe('DataProviderService', () => {
  let service: LocalStorageDataProvider;
  let book: Book;
  let bookList: Array<Book>;
  let searchText: string;

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
    let searchCriteria = new SearchCriteria('Idiot', Genre.History, 1000, 2000);
    let result = service.findBooks(searchCriteria);
    for (let i = 0; i < result.length; i++) {
      let actual = result[i].getTitle();
      let expected = searchCriteria.searchTitle;
      expect(actual).toEqual(expected)
    }
    searchCriteria = new SearchCriteria('', Genre.History, 1, 20000);
    result = service.findBooks(searchCriteria);
    for (let i = 0; i < result.length; i++) {
      let actual = result[i].getGenre();
      let expected = searchCriteria.searchGenre;
      expect(actual).toEqual(expected)
    }
    searchCriteria = new SearchCriteria('', undefined, 2000, 1955);
    result = service.findBooks(searchCriteria);
    for (let i = 0; i < result.length; i++) {
      let actual = result[i].getPublicationDate().getFullYear();
      let expected = searchCriteria.searchYearTo
      expect(actual >= expected).toBeTruthy()
    }
  });
  it(`"should add book`, () => {
    book = new Book();
    book.setId(12);
    book.setGenre(Genre.Fantasy);
    book.setPublicationDate(new Date());
    book.setPublishingHouse('OZ');
    book.setTitle('ABBA');
    book.setAuthor('Rara');
    let searchCriteria = new SearchCriteria('', undefined, undefined, undefined);

    localStorage.clear()
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));

    service.findBooks(searchCriteria);
    service.addBook(book);
    let expectedBooks = service.findBooks(searchCriteria);
    expect(compareBooks(expectedBooks[expectedBooks.length - 1], book)).toBeTruthy()
  })
});


