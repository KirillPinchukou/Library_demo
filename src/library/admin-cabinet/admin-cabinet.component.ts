import {Component, OnInit} from '@angular/core';
import {DataProvider} from '../services/data-provider.service';
import {ReaderProvider} from '../services/client.service';
import {Order} from '../model/order';
import {Reader} from '../model/reader';

@Component({
  selector: 'admin-cabinet',
  templateUrl: 'admin-cabinet.component.html',
  styleUrls: ['admin-cabinet.component.less']
})
export class AdminCabinetComponent implements OnInit {
  readers: Array<Reader>;
  orders: Array<Order> = [];
  searchText: string;

  constructor(private dataProvider: DataProvider, private readerProvider: ReaderProvider) {
  }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(returned?: boolean): void {
    this.orders = [];
    this.readerProvider.getReaders().subscribe((result) => {
      this.readers = result;
      for (let reader of result) {
        this.dataProvider.getReaderOrders(reader.id, returned).subscribe((orders) => {
          this.orders.push(...orders);
        })
      }
    });
  }

  changeOrderList(returned: boolean): void {
    returned ? this.loadOrders() : this.loadOrders(returned)
  }

  searchBook(text: string) {
    text ? this.orders = this.orders.filter(order => order.book.title.includes(text)) : this.orders
  }
}
