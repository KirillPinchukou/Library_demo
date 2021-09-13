class Feedback{
  private _clientId :number;
  private _date:string;
  private _text:string;
  private _rate:number;
  constructor(clientId:number,date:string,text:string,rate:number) {
    this._clientId = clientId;
    this._date = date;
    this._text = text
    this._rate = rate;
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
