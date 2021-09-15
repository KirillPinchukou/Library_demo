export class Order {
  private _orderId: number;
  private _clientId: number;
  private _date: Date;
  private _books: [];
  private _price: number;

  constructor(orderId: number, clientId: number, books: [], price: number, date: Date) {
    this._orderId = orderId;
    this._clientId = clientId;
    this._date = date;
    this._books = books;
    this._price = price;
  }

  getOrderId(): number {
    return this._orderId;
  }

  setOdredId(value: number) {
    this._orderId = value;
  }

  getClientId(): number {
    return this._clientId;
  }

  setClientId(value: number) {
    this._clientId = value;
  }

  getDate(): Date {
    return this._date;
  }

  setDate(value: Date) {
    this._date = value;
  }

  getBooks(): [] {
    return this._books;
  }

  setBooks(value: []) {
    this._books = value;
  }

  getPrice(): number {
    return this._price;
  }

  setPrice(value: number) {
    this._price = value;
  }
}
