import {TestBed} from '@angular/core/testing';
import {GenrePipe, PageNumPipe} from '../../book/pipes/book.pipe';
import {TEST_STOARGE, testData} from '../../json';
import {Book, Genre, STORAGE_NAME, TEST_STORAGE_NAME} from '../../model/book';
import {compareBooks} from '../compare-books';
import {SearchCriteriaBuilder} from '../data-provider.service';
import {LocalStorageDataProvider} from './local-storage-data-provider.service';

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

    let searchCriteria = new SearchCriteriaBuilder()
      .withGenre(Genre.HISTORY)
      .withYearFrom(1)
      .withYearTill(20000)
      .build();

    service.findBooks(searchCriteria).subscribe((response) => {
      for (let i = 0; i < response.result.length; i++) {
        let actual = response.result[i].getTitle();
        let expected = searchCriteria.title;
        expect(actual).toEqual(expected)
    }});

    service.findBooks(searchCriteria).subscribe((response) =>{
      for (let i = 0; i < response.result.length; i++) {
        let actual = response.result[i].getGenre();
        let expected = searchCriteria.genre.includes(actual);
        expect(expected).toBeTruthy()
      }
    });

    service.findBooks(searchCriteria).subscribe((response) => {
      for (let i = 0; i < response.result.length; i++) {
        let actual = response.result[i].getPublicationDate().getFullYear();
        let expected = searchCriteria.publishYearTill
        expect(actual >= expected).toBeTruthy()
      }
    })

  });
  it(`"should add book`, () => {

    let searchCriteria = new SearchCriteriaBuilder()
    .build();
    let book = new Book();
    book.setAuthorId(1);
    book.setId(12);
    book.setTitle('title');
    book.setGenre(Genre.FANTASY);
    book.setPublishingHouse('OZ');
    localStorage.clear()
    localStorage.setItem(STORAGE_NAME, JSON.stringify(testData));

    service.addBook(book).subscribe((result:Book) => {
      service.findBooks(searchCriteria).subscribe((response) => {
        expect(compareBooks(response.result[response.result.length - 1], book)).toBeTruthy()
      })
    });
  })
});


