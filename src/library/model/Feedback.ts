export class Feedback {
  private _feedbackId: number;
  private _clientId: number;
  private _bookId: number;
  private _date: string;
  private _text: string;
  private _rate: number;

  constructor(feedbackId: number, clientId: number, bookId: number, date: string, text: string, rate: number) {
    this._feedbackId = feedbackId;
    this._clientId = clientId;
    this._bookId = bookId;
    this._date = date;
    this._text = text
    this._rate = rate;
  }

  getFeedbackid(): number {
    return this._feedbackId;
  }

  setFeedbackId(value: number) {
    this._feedbackId = value;
  }

  getClientId(): number {
    return this._clientId;
  }

  setClientId(value: number) {
    this._clientId = value;
  }

  getBookId(): number {
    return this._bookId;
  }

  setBookId(value: number) {
    this._bookId = value;
  }

  getDate(): string {
    return this._date;
  }

  setDate(value: string) {
    this._date = value;
  }

  getText(): string {
    return this._text;
  }

  setText(value: string) {
    this._text = value;
  }

  getRate(): number {
    return this._rate;
  }

  setRate(value: number) {
    this._rate = value;
  }
}
