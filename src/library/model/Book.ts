export enum Genre {
  Fantasy ='fantasy',
  Sadness = 'sadness',
  History = 'history'
}

export class Book {
  private bookId: number;
  private _title: string;
  private _pageNum: number;
  private _publshingHouse: string;
  private _author: string;
  private _genre: Genre;
  private _bookcover:string;

  constructor(bookId: number, title: string, pageNum: number, publshingHouse: string, author: string, genre: Genre,bookCover:string) {
    this.bookId = bookId;
    this._title = title;
    this._pageNum = pageNum;
    this._bookcover = bookCover;
    this._publshingHouse = publshingHouse;
    this._author = author;
    this._genre = genre;
  }

  getBookId(): number {
    return this.bookId;
  }

  setBookId(value: number) {
    this.bookId = value;
  }

  getTitle(): string {
    return this._title;
  }

  setTitle(value: string) {
    this._title = value;
  }

  getPageNum(): number {
    return this._pageNum;
  }
  getBookCover():string {
    return this._bookcover;
  }
  setBookCover(value:string){
    this._bookcover = value;
  }

  setPageNum(value: number) {
    this._pageNum = value;
  }

  getPublshingHouse(): string {
    return this._publshingHouse;
  }

  setPublshingHouse(value: string) {
    this._publshingHouse = value;
  }

  getAuthor(): string {
    return this._author;
  }

  setAuthor(value: string) {
    this._author = value;
  }

  getGenre(): Genre {
    return this._genre;
  }

  setGenre(value: Genre) {
    this._genre = value;
  }
}
