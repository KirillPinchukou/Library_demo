import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataProvider} from '../services/data-provider.service';
import {ReaderProvider} from '../services/client.service';
import {Order} from '../model/order';
import {Reader} from '../model/reader';
import {Observable, zip} from 'rxjs';
import * as Pipe from 'ramda';

@Component({
  selector: 'admin-cabinet',
  templateUrl: 'admin-cabinet.component.html',
  styleUrls: ['admin-cabinet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminCabinetComponent implements OnInit {
  readers: Array<Reader>;
  orders: Array<Order> = [];
  searchText: string;

  constructor(private dataProvider: DataProvider, private readerProvider: ReaderProvider, private changeDetector: ChangeDetectorRef,) {
  }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(returned?: boolean): void {
    this.orders = [];
    this.readerProvider.getReaders().subscribe((readers) => {
      this.readers = readers;
      let observers: Array<Observable<Array<Order>>> = readers.map((reader) => this.dataProvider.getReaderOrders(reader.id, returned));

      zip(...observers).subscribe(orders => {
        this.orders = Pipe.flatten(orders)
        this.changeDetector.detectChanges();
      })
    });
  }

  changeOrderList(returned: boolean): void {
    returned ? this.loadOrders() : this.loadOrders(returned)
  }

  searchBook(text: string) {
    text ? this.orders = this.orders.filter(order => order.book.title.includes(text)) : this.orders
  }
}
