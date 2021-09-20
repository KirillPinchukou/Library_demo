import {Injectable} from '@angular/core';
import {Book, Genre} from "./model/Book";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  books: Array<Book> = [
    new Book(1, "Idiot", 344, "OZ", "Dostoevsky", Genre.Sadness, "./assets/idiot.jpg"),
    new Book(2, "Master and Margarita", 323, "OZ", "Bulgakov", Genre.Sadness, "./assets/master.jfif"),
    new Book(3, "Bayazet", 556, "OZ", "Pikul", Genre.History, "./assets/bayazet.jfif"),
  ];


  constructor() {
  }

  public getBooks(searchText: string): Array<Book> {
    if (searchText) {
      return this.books.filter(book => book.getTitle().includes(searchText));
    } else {
      return this.books;
    }

  }
}
