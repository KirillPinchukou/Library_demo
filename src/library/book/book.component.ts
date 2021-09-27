import {Component, Input} from "@angular/core";
import {Book} from "../model/book";

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less']
})

export class BookComponent {
  title = '';
  @Input() book?: Book
}
