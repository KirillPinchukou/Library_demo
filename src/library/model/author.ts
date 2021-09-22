export class Author {
  private id: number;
  private name: string;
  private birthDay: string;
  private nationality: string;
  private biography: string;

  constructor(authorId: number, name: string, bDay: string, nationality: string, biography: string) {
    this.id = authorId;
    this.name = name;
    this.birthDay = bDay;
    this.nationality = nationality;
    this.biography = biography;
  }

  getAuthorId(): number {
    return this.id;
  }

  setAuthorId(value: number) {
    this.id = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getBirthDay(): string {
    return this.birthDay;
  }

  setBirthDay(value: string) {
    this.birthDay = value;
  }

  getNationality(): string {
    return this.nationality;
  }

  setNationality(value: string) {
    this.nationality = value;
  }

  getBiography(): string {
    return this.biography;
  }

  setBiography(value: string) {
    this.biography = value;
  }
}
