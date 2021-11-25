import {Book} from "./book";

export class Order {
  public id: number;
  public readerId: number;
  public ordered: Date;
  public returned: Date;
  public bookId: number;




  getOrderId(): number {
    return this.id;
  }

  setOrderId(value: number) {
    this.id = value;
  }

  getReaderId(): number {
    return this.readerId;
  }

  setReaderId(value: number) {
    this.readerId = value;
  }

  getOrderDate(): Date {
    return this.ordered;
  }

  setReturnDate(value: Date) {
    this.returned = value;
  }

  getReturnDate():Date {
    return this.returned
  }

  setOrderDate(value: Date) {
    this.ordered = value;
  }

  getBookId(): number {
    return this.bookId;
  }

  setBooks(value: number) {
    this.bookId = value;
  }


}
