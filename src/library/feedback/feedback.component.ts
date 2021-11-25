import {Component, OnInit} from '@angular/core';
import {DataProvider} from '../services/data-provider.service';
import {ReaderProvider} from '../services/client.service';
import {Book} from '../model/book';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Feedback} from '../model/feedback';
import {RateComponent} from '../rate/rate.component';

@Component({
  selector: 'feedback',
  templateUrl: 'feedback.component.html',
  styleUrls: ['feedback.component.less']
})
export class FeedbackComponent implements OnInit {
  currentBook: Book;
  feedbackText: string;
  rate: number;

  constructor(private dataProvider: DataProvider, private readerProvider: ReaderProvider, private activateRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    let bookId = Number(this.activateRoute.snapshot.params.id);
    this.dataProvider.getBooksById(bookId).subscribe((book) => {
      this.currentBook = book;
    });
  }

  public addFeedBack() {
    let feedback = new Feedback();
    feedback.setClientId(this.readerProvider.getCurrentUser().id);
    feedback.setBookId(this.currentBook.id);
    feedback.setDate(new Date());
    feedback.setText(this.feedbackText);
    feedback.setRate(this.rate);
    this.dataProvider.createFeedback(feedback).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  public setRate(rate: number) {
    this.rate = rate;
  }
}
