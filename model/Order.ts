class Order{
  private _clientId :number;
  private _date:string;
  private _books:[];
  private _price:number;
  constructor(clientId:number,books:[],price:number,date:string) {
    this._clientId = clientId;
    this._date = date;
    this._books = books;
    this._price = price;
  }

  get clientId(): number {
    return this._clientId;
  }

  set clientId(value: number) {
    this._clientId = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get books(): [] {
    return this._books;
  }

  set books(value: []) {
    this._books = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}
