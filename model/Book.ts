class Book{
  private _title :string;
  private _pageNum:number;
  private _publshingHouse:string;
  private _author:string;
  constructor(title:string,pageNum:number,publshingHouse:string,author:string) {
    this._title = title;
    this._pageNum = pageNum;
    this._publshingHouse = publshingHouse;
    this._author = author;
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
}
