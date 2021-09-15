import { Injectable } from '@angular/core';
import {Book} from "./model/Book";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  books:Array<Book> = [
    new Book(1,'Harry Potter',234,'OZ',"Roling",0),
    new Book(2,'Idiot',455,'OZ',"Dostoevski",1),
  ];
  constructor() { }
  public getBooks(): Array<Book> {
    return this.books;
  }
}
