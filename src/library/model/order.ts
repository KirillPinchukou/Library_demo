import {Book} from "./book";

export class Order {
  private _orderId: number;
  private _clientId: number;
  private _date: Date;
  private _books: Array<Book>;
  private _price: number;

  constructor(orderId: number, clientId: number, books:Array<Book>, price: number, date: Date) {
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

  getBooks(): Array<Book> {
    return this._books;
  }

  setBooks(value: Array<Book>) {
    this._books = value;
  }

  getPrice(): number {
    return this._price;
  }

  setPrice(value: number) {
    this._price = value;
  }
}
