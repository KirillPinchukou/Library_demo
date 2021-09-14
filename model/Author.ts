export class Author{
  private  _authorId:number;
  private _name:string;
  private _bDay:string;
  private _nationality:string;
  private _biography:string;

  constructor(authorId:number, name:string,bDay:string,nationality:string,biography:string) {
    this._authorId = authorId;
    this._name = name;
    this._bDay = bDay;
    this._nationality = nationality;
    this._biography = biography;
  }
  get authorId(): number{
    return this._authorId;
  }
  set authorId(value: number){
    this._authorId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get bDay(): string {
    return this._bDay;
  }

  set bDay(value: string) {
    this._bDay = value;
  }

  get nationality(): string {
    return this._nationality;
  }

  set nationality(value: string) {
    this._nationality = value;
  }

  get biography(): string {
    return this._biography;
  }

  set biography(value: string) {
    this._biography = value;
  }
}
