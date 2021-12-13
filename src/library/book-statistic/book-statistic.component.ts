import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Order} from '../model/order';
import {DataProvider} from '../services/data-provider.service';
import {ReaderProvider} from '../services/client.service';
import {Feedback} from '../model/feedback';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../model/book';


@Component({
  selector: 'book-statistic',
  templateUrl: 'book-statistic.component.html',
  styleUrls: ['book-statistic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookStatisticComponent implements OnInit {
  bookOrders: Array<Order>;
  bookFeedbacks: Array<Feedback>;
  bookId: number;
  book: Book;
  booksInRent: Array<Order> = [];

  constructor(private dataProvider: DataProvider, private readerProvider: ReaderProvider, private activateRoute: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.bookId = Number(this.activateRoute.snapshot.params.bookId);
    this.dataProvider.getBooksById(this.bookId).subscribe((book) => {
      this.book = book;
      this.changeDetector.detectChanges();
    });
    this.dataProvider.getBookFeedbacks(this.bookId).subscribe((feedbacks) => {
      this.bookFeedbacks = feedbacks;
      this.dataProvider.getBookOrders(this.bookId).subscribe((orders) => {
        this.bookOrders = orders;
        for (let order of orders) {
          if (!order.returned) {
            this.booksInRent.push(order);
          }
        }
        this.changeDetector.detectChanges();
      })
    })
  }
}
