import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Order} from '../model/order';
import {DataProvider} from '../services/data-provider.service';
import {ReaderProvider} from '../services/client.service';
import {Feedback} from '../model/feedback';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'user-statistic',
  templateUrl: 'user-statistic.component.html',
  styleUrls: ['user-statistic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserStatisticComponent implements OnInit {
  readerId: number;
  readerOrders: Array<Order>;
  readerFeedbacks: Array<Feedback>;

  constructor(private dataProvider: DataProvider, private readerProvider: ReaderProvider, private activateRoute: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.readerId = Number(this.activateRoute.snapshot.params.readerId);
    this.dataProvider.getReaderFeedbacks(this.readerId).subscribe((feedbacks) => {
      this.readerFeedbacks = feedbacks;
      this.dataProvider.getReaderOrders(this.readerId).subscribe((orders) => {
        this.readerOrders = orders;
        this.changeDetector.detectChanges();
      })
    })
  }
}
