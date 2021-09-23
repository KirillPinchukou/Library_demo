import {Book} from "./book";

export class Order {
  private id: number;
  private clientId: number;
  private date: Date;
  private books: Array<Book>;
  private price: number;

  constructor(orderId: number, clientId: number, books:Array<Book>, price: number, date: Date) {
    this.id = orderId;
    this.clientId = clientId;
    this.date = date;
    this.books = books;
    this.price = price;
  }

  getOrderId(): number {
    return this.id;
  }

  setOrderId(value: number) {
    this.id = value;
  }

  getClientId(): number {
    return this.clientId;
  }

  setClientId(value: number) {
    this.clientId = value;
  }

  getDate(): Date {
    return this.date;
  }

  setDate(value: Date) {
    this.date = value;
  }

  getBooks(): Array<Book> {
    return this.books;
  }

  setBooks(value: Array<Book>) {
    this.books = value;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(value: number) {
    this.price = value;
  }
}
