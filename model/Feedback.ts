export class Feedback{
  private _feedbackId:number;
  private _clientId :number;
  private _bookId:number;
  private _date:string;
  private _text:string;
  private _rate:number;
  constructor(feedbackId:number,clientId:number,bookId:number, date:string,text:string,rate:number) {
    this._feedbackId = feedbackId;
    this._clientId = clientId;
    this._bookId = bookId;
    this._date = date;
    this._text = text
    this._rate = rate;
  }

  get feedbackid():number {
    return this._feedbackId;
  }

  set feedbackId(value:number) {
    this._feedbackId = value;
  }

  get clientId(): number {
    return this._clientId;
  }

  set clientId(value: number) {
    this._clientId = value;
  }

  get bookId():number {
    return this._bookId;
  }

  set bookId(value:number){
    this._bookId = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get rate(): number {
    return this._rate;
  }

  set rate(value: number) {
    this._rate = value;
  }
}
