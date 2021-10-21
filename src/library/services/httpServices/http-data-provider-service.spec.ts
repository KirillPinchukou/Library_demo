import {TestBed} from '@angular/core/testing';
import {Book, Genre} from "../../model/book";
import {compareBooks} from "../compare-books";
import {SearchCriteria} from "../data-provider.service";
import {HttpDataProvider} from "./http-data-provider-service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GenrePipe, PageNumPipe} from "../../book/pipes/book.pipe"
import {LibraryModule} from "../../library.module";

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
    let searchCriteria = new SearchCriteria('Idiot', Genre.HISTORY, 1000, 2000);

    searchCriteria = new SearchCriteria('', Genre.HISTORY, 1, 20000);
    service.findBooks(searchCriteria).subscribe((result:Array<Book>) => {
      for (let i = 0; i < result.length; i++) {
        let actual = result[i].getGenre();
        let expected = searchCriteria.genre;
        expect(actual).toEqual(expected)
      }
    })

    searchCriteria = new SearchCriteria('', undefined, 2000, 1955);
    service.findBooks(searchCriteria).subscribe((result:Array<Book>) => {
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
    book.setTitle('ABBA');
    book.setAuthor('Rara');
    let searchCriteria = new SearchCriteria('', undefined, undefined, undefined);

    service.findBooks(searchCriteria);
    service.addBook(book);
    service.findBooks(searchCriteria).subscribe((result:Array<Book>) => {
      expect(compareBooks(result[result.length - 1], book)).toBeTruthy()
    })
  })
});


