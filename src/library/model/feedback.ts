export class Feedback {
  public id: number;
  public readerId: number;
  public bookId: number;
  public date: Date;
  public text: string;
  public rate: number;

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getClientId(): number {
    return this.readerId;
  }

  setClientId(value: number) {
    this.readerId = value;
  }

  getBookId(): number {
    return this.bookId;
  }

  setBookId(value: number) {
    this.bookId = value;
  }

  getDate(): Date {
    return this.date;
  }

  setDate(value: Date) {
    this.date = value;
  }

  getText(): string {
    return this.text;
  }

  setText(value: string) {
    this.text = value;
  }

  getRate(): number {
    return this.rate;
  }

  setRate(value: number) {
    this.rate = value;
  }
}
