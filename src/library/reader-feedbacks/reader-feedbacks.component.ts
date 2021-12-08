import {Component, Input, OnInit} from '@angular/core';
import {DataProvider} from '../services/data-provider.service';

import {ReaderProvider} from '../services/client.service';
import {Book} from '../model/book';
import {ActivatedRoute} from '@angular/router';
import {Feedback} from '../model/feedback';

@Component({
  selector: 'reader-feedbacks',
  templateUrl: 'reader-feedbacks.component.html',
  styleUrls: ['reader-feedbacks.component.less']
})
export class ReaderFeedbacksComponent implements OnInit {
  feedbacks: Array<FeedbackCard> = [];
  @Input() readerId: number;

  constructor(private dataProvider: DataProvider, private readerProvider: ReaderProvider, private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbacks = [];
    let readerId: number;
    this.readerId ? readerId = this.readerId : readerId = this.readerProvider.getCurrentUser().id;
    this.dataProvider.getReaderFeedbacks(readerId).subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        this.dataProvider.getBooksById(result[i].bookId).subscribe((book) => {
          this.feedbacks.push(new FeedbackCard(result[i], book));
        })
      }
    });
  }

  deleteFeedback(feedbackId: number) {
    this.dataProvider.deleteFeedback(feedbackId).subscribe(() => {
      this.loadFeedbacks();
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
