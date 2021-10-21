import {TestBed} from '@angular/core/testing';
import {Book, Genre} from "../../model/book";
import {compareBooks} from "../compare-books";
import {SearchCriteria} from "../data-provider.service";
import {HttpDataProvider} from "./http-data-provider-service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {GenrePipe, PageNumPipe} from "../../book/pipes/book.pipe"
import {LibraryModule} from "../../library.module";
import {environment} from "../../../environments/environment";

describe('DataProviderService', () => {
  let service: HttpDataProvider;
  let book: Book;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNumPipe, GenrePipe],
      imports: [HttpClientTestingModule, LibraryModule],
      providers: [HttpDataProvider]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.inject(HttpDataProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return books', () => {
    let searchCriteria = new SearchCriteria('Idiot', ['HISTORY'], 1000, 2000);

    searchCriteria = new SearchCriteria('', ['HISTORY'], 1, 20000);
    service.findBooks(searchCriteria).subscribe((result: Array<Book>) => {
      for (let i = 0; i < result.length; i++) {
        let actual = result[i].getGenre();
        let expected = searchCriteria.genre;
        expect(actual).toEqual(expected)
      }
    })

    searchCriteria = new SearchCriteria('', undefined, 2000, 1955);
    service.findBooks(searchCriteria).subscribe((result: Array<Book>) => {
      for (let i = 0; i < result.length; i++) {
        let actual = result[i].getPublicationDate().getFullYear();
        let expected = searchCriteria.publishYearTill
        expect(actual >= expected).toBeTruthy()
      }
    })

  });
  it(`"should add book`, () => {
    let books = [];
    book = new Book();
    book.setGenre(Genre.FANTASY);
    book.setPublicationDate(new Date());
    book.setPublishingHouse('OZ');
    book.setTitle('ABBA');
    book.setAuthor('Rara');
    books[0] = book;

    service.addBook(book);

    let searchCriteria = new SearchCriteria('', undefined, undefined, undefined);
    service.findBooks(searchCriteria).subscribe((result: Array<Book>) => {
      expect(compareBooks(result[result.length - 1], book)).toBeTruthy()
    })
  });

  it('should remove book', async () => {
    const res = await service.getBooks().subscribe((result: Array<Book>) => {
      let removedBook = result[2];
      service.removeBook(removedBook).subscribe(() => {
        service.getBooksById(removedBook.id).subscribe(() => {
        }, error => expect(error.statusCode === 4045).toBeTruthy())
      })
    })
  });
  it('should return book by id ', () => {
    book = new Book();
    book.setId(32);
    book.setGenre(Genre.FANTASY);
    book.setPublicationDate(new Date());
    book.setPublishingHouse('OZ');
    book.setTitle('ABBA');
    book.setAuthor('Rara');

    service.getBooksById(book.id).subscribe((response) => {
      expect(response.id).toEqual(book.id);
    })

    httpMock.expectOne({
      method: 'GET',
      url: `${environment.URL}/books/${book.id}`
    }).flush(book);
    httpMock.verify();
  });
});


