export class Author {
  private _authorId: number;
  private _name: string;
  private _bDay: string;
  private _nationality: string;
  private _biography: string;

  constructor(authorId: number, name: string, bDay: string, nationality: string, biography: string) {
    this._authorId = authorId;
    this._name = name;
    this._bDay = bDay;
    this._nationality = nationality;
    this._biography = biography;
  }

  getAuthorId(): number {
    return this._authorId;
  }

  setAuthorId(value: number) {
    this._authorId = value;
  }

  getName(): string {
    return this._name;
  }

  setName(value: string) {
    this._name = value;
  }

  getBDay(): string {
    return this._bDay;
  }

  setBDay(value: string) {
    this._bDay = value;
  }

  getNationality(): string {
    return this._nationality;
  }

  setNationality(value: string) {
    this._nationality = value;
  }

  getBiography(): string {
    return this._biography;
  }

  setBiography(value: string) {
    this._biography = value;
  }
}
