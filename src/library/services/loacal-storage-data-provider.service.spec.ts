import {TestBed} from '@angular/core/testing';
import {data, TEST_STOARGE, testData} from "../json";
import {Book, Genre, STORAGE_NAME, TEST_STORAGE_NAME} from "../model/book";
import {LocalStorageDataProvider} from './local-storage-data-provider.service';
import {compareBooks} from "./compare-books";


describe('DataProviderService', () => {
  let service: LocalStorageDataProvider;
  let addedbook: Book;
  let expectedBooks:Array<Book>;
  let searchText:string;

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

    let books = JSON.parse(localStorage.getItem(STORAGE_NAME)).map((obj: any) => service.mapBook(obj));
    searchText = '';
    expectedBooks = service.getBooks(searchText);
    for(let i = 0;i < expectedBooks.length;i++){
      expect(compareBooks(expectedBooks[i],books[i])).toBeTruthy()
    }
    searchText = 'Idiot';
    for(let i = 0;i < expectedBooks.length;i++){
      if(expectedBooks[i].title === searchText || expectedBooks[i].author === searchText){
        expect(compareBooks(books[i],expectedBooks[i])).toBeTruthy()
      }
    }
  });
  it(`"should add book`, () => {
    localStorage.clear()
    localStorage.setItem(STORAGE_NAME, JSON.stringify(data));

    addedbook = new Book();
    addedbook.setId(12);
    addedbook.setGenre(Genre.Fantasy);
    addedbook.setPublicationDate(new Date());
    addedbook.setPublishingHouse('OZ');
    addedbook.setTitle('ABBA');
    addedbook.setAuthor('Rara');
    let books = service.getBooks('');
    service.addBook(addedbook);
    expect(compareBooks(books[books.length -1],addedbook)).toBeTruthy()
  })
});


