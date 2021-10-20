import {TestBed} from '@angular/core/testing';
import {TEST_STOARGE, testData} from "../../json";
import {Book, Genre, STORAGE_NAME, TEST_STORAGE_NAME} from "../../model/book";
import {LocalStorageDataProvider} from './local-storage-data-provider.service';
import {compareBooks} from "../compare-books";
import {SearchCriteria} from "../data-provider.service";
import {GenrePipe, PageNumPipe} from "../../book/pipes/book.pipe";

describe('DataProviderService', () => {
  let service: LocalStorageDataProvider;
  let book: Book;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageDataProvider],
      declarations: [GenrePipe,PageNumPipe]
    });
    service = TestBed.inject(LocalStorageDataProvider);
    localStorage.setItem(TEST_STORAGE_NAME, TEST_STOARGE)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return books', () => {
    localStorage.clear()
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));

    let searchCriteria = new SearchCriteria('Idiot', Genre.HISTORY, 1000, 2000);
    service.findBooks(searchCriteria).subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        let actual = result[i].getTitle();
        let expected = searchCriteria.title;
        expect(actual).toEqual(expected)
    }});

    searchCriteria = new SearchCriteria('', Genre.HISTORY, 1, 20000);
    service.findBooks(searchCriteria).subscribe((result) =>{
      for (let i = 0; i < result.length; i++) {
        let actual = result[i].getGenre();
        let expected = searchCriteria.genre;
        expect(actual).toEqual(expected)
      }
    });

    searchCriteria = new SearchCriteria('', undefined, 2000, 1955);
    service.findBooks(searchCriteria).subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        let actual = result[i].getPublicationDate().getFullYear();
        let expected = searchCriteria.publishYearTill
        expect(actual >= expected).toBeTruthy()
      }
    })

  });
  it(`"should add book`, () => {
    book = new Book();
    book.setId(12);
    book.setGenre(Genre.FANTASY);
    book.setPublicationDate(new Date());
    book.setPublishingHouse('OZ');
    book.setTitle('Bayazet');
    book.setAuthor('Pikul');
    let searchCriteria = new SearchCriteria('', undefined, undefined, undefined);

    localStorage.clear()
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));

    service.addBook(book).subscribe((result:Book) => {
      service.findBooks(searchCriteria).subscribe((result) => {
        expect(compareBooks(result[result.length - 1], book)).toBeTruthy()
      })
    });
  })
});


