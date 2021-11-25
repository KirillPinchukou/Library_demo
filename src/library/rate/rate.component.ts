import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataProvider} from '../services/data-provider.service';

@Component({
  selector: 'rate',
  templateUrl: 'rate.component.html',
  styleUrls: ['rate.component.less']
})
export class RateComponent implements OnInit {
  rates: Array<number> = [1, 2, 3, 4, 5];
  activeRate: Array<number>;
  @Output() rateSet = new EventEmitter<number>();
  @Input() bookRate?: number;

  constructor(private dataProvider: DataProvider) {
  }

  ngOnInit() {
    for (let i = 1; i < this.bookRate; i++) {
      this.activeRate.push(i);
    }
  }

  setRate(rate: number) {
    this.rateSet.emit(rate);
  }

  setClass(index: number): string {
    if (index <= this.bookRate) {
      return 'rating-area'
    } else {
      return 'rating'
    }
  }
}
