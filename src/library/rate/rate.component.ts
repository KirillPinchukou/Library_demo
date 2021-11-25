import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rate',
  templateUrl: 'rate.component.html',
  styleUrls: ['rate.component.less']
})
export class RateComponent  {
  rates: Array<number> = [1, 2, 3, 4, 5];
  @Output() rateSet = new EventEmitter<number>();
  @Input() bookRate?: number;

  setRate(rate: number) {
    this.rateSet.emit(rate);
  }

  setClass(index: number): string {
    return index <= this.bookRate ? 'active' : 'non-active';
  }
}
