export const STORAGE_NAME = 'library';
export const TEST_STORAGE_NAME ='test';
export enum Genre {
  Fantasy = 'fantasy',
  Sadness = 'sadness',
  History = 'history'
}

export class Book {
  public id: number;
  public title: string;
  public pageNum: number;
  public publishingHouse: string;
  public author: string;
  public publicationDate: Date;
  public genre: Genre;
  public bookCover: string;

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(value: string) {
    this.title = value;
  }

  getPageNum(): number {
    return this.pageNum;
  }

  getBookCover(): string {
    return this.bookCover;
  }

  setBookCover(value: string) {
    this.bookCover = value;
  }

  setPageNum(value: number) {
    this.pageNum = value;
  }

  getPublishingHouse(): string {
    return this.publishingHouse;
  }

  setPublishingHouse(value: string) {
    this.publishingHouse = value;

  }

  getAuthor(): string {
    return this.author;
  }

  setAuthor(value: string) {
    this.author = value;
  }

  getGenre(): Genre {
    return this.genre;
  }

  setGenre(value: Genre) {
    this.genre = value;
  }
  getPublicationDate(): Date{
    return this.publicationDate;
  }
  setPublicationDate(value: Date) {
    this.publicationDate = value;
  }
}

