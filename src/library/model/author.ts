export class Author {
  public id: number;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public books: Array<number>;

  getAuthorId(): number {
    return this.id;
  }

  setAuthorId(value: number) {
    this.id = value;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(value: string) {
    this.firstName = value;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(value: string) {
    this.lastName = value;
  }

  getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  setDateOfBirth(value: Date) {
    this.dateOfBirth = value;
  }
  getBooks(): Array<number> {
    return this.books;
  }

  setBooks(value: Array<number>) {
    this.books = value;
  }
}
