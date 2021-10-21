import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {GenrePipe, PageNumPipe} from '../../book/pipes/book.pipe'
import {LibraryModule} from '../../library.module';
import {Book, Genre} from '../../model/book';
import {compareBooks} from '../compare-books';
import {SearchCriteria, SearchCriteriaBuilder} from '../data-provider.service';
import {HttpDataProvider} from './http-data-provider-service';

describe('DataProviderService', () => {
  let service: HttpDataProvider;
  let book: Book;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[PageNumPipe,GenrePipe],
      imports: [HttpClientTestingModule,LibraryModule],
      providers: [HttpDataProvider]
    });
    service = TestBed.inject(HttpDataProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return books', () => {
    let searchCriteria = new SearchCriteriaBuilder()
      .withGenre(Genre.HISTORY)
      .withYearFrom(1)
      .withYearTill(20000)
      .build();

    service.findBooks(searchCriteria).subscribe((result: Array<Book>) => {
      for (let i = 0; i < result.length; i++) {
        let actual = result[i].getGenre();
        let expected = searchCriteria.genre;
        expect(actual).toEqual(expected)
      }
    })

    searchCriteria = new SearchCriteriaBuilder()
      .withYearFrom(2000)
      .withYearTill(1955)
      .build();

    service.findBooks(searchCriteria).subscribe((result: Array<Book>) => {
      for (let i = 0; i < result.length; i++) {
        let actual = result[i].getPublicationDate().getFullYear();
        let expected = searchCriteria.publishYearTill
      }})

  });
  it(`"should add book`, () => {
    book = new Book();
    book.setId(12);
    book.setGenre(Genre.FANTASY);
    book.setPublicationDate(new Date());
    book.setPublishingHouse('OZ');
    book.setTitle('ABBA');
    book.setAuthor('Rara');
    let searchCriteria = new SearchCriteria();

    service.findBooks(searchCriteria);
    service.addBook(book);
    service.findBooks(searchCriteria).subscribe((result:Array<Book>) => {
      expect(compareBooks(result[result.length - 1], book)).toBeTruthy()
    })
  })
});


