import {Component, OnInit} from '@angular/core';
import {DataProvider} from '../services/data-provider.service';
import {Reader} from '../model/reader';
import {Order} from '../model/order';
import {ReaderProvider} from '../services/client.service';
import {Book} from '../model/book';
import {ActivatedRoute} from '@angular/router';
import {Feedback} from '../model/feedback';
import {compareBooks} from '../services/compare-books';


@Component({
  selector: 'reader-feedbacks',
  templateUrl: 'reader-feedbacks.component.html',
  styleUrls: ['reader-feedbacks.component.less']
})
export class ReaderFeedbacksComponent implements OnInit {
  feedbacks: Array<FeedbackCard> = [];
  currentReader: Reader;

  constructor(private dataProvider: DataProvider, private readerProvider: ReaderProvider, private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.readerProvider.getLoggedUser().subscribe((reader)=> {
      this.currentReader = reader;
      this.dataProvider.getReaderFeedbacks(reader.id).subscribe((result) => {
        for (let i = 0; i < result.length; i++) {
          this.dataProvider.getBooksById(result[i].bookId).subscribe((book) => {
            this.feedbacks.push(new FeedbackCard(result[i], book));
          })
        }
      });

    })
  }
}
class FeedbackCard extends Feedback {
  public book: Book;

  constructor(feedback: Feedback, book: Book) {
    super();
    this.id = feedback.id;
    this.book = book;
    this.readerId = feedback.readerId
    this.date = feedback.date;
    this.text = feedback.text;
    this.rate = feedback.rate;
  }
}
