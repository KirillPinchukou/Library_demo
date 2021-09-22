import {Component, Input} from "@angular/core";
import {Book} from "../model/Book";

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  title = '';
  @Input() book?: Book

}
