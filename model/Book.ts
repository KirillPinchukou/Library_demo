export class Book{
  private _bookId:number;
  private _title :string;
  private _pageNum:number;
  private _publshingHouse:string;
  private _author:string;
  private _genre:string;
  constructor(bookId:number,title:string,pageNum:number,publshingHouse:string,author:string,genre:string) {
    this._bookId = bookId;
    this._title = title;
    this._pageNum = pageNum;
    this._publshingHouse = publshingHouse;
    this._author = author;
    this._genre = genre;
  }

  get bookId():number {
    return this._bookId;
  }

  set bookId(value:number) {
    this._bookId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get pageNum(): number {
    return this._pageNum;
  }

  set pageNum(value: number) {
    this._pageNum = value;
  }

  get publshingHouse():string {
    return this._publshingHouse;
  }

  set publshingHouse(value: string) {
    this._publshingHouse = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get genre(): string{
    return this._genre;
  }

  set genre(value:string){
    this._genre = value;
  }
}
