import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataProvider} from '../services/data-provider.service';
import {Reader} from '../model/reader';
import {Order} from '../model/order';
import {ReaderProvider} from '../services/client.service';
import {Book} from '../model/book';

@Component({
  selector: 'library-root',
  templateUrl: 'reader-profile.component.html',
  styleUrls: ['reader-profile.compomemt.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReaderProfileComponent implements OnInit {
  currentReader: Reader;
  orderCards: Array<Order> = [];
  noReturned: Array<Order> = [];
  returnedOrders: Array<OrderCard> = [];
  openReaderInfo: boolean = false;
  currentOrdertype: string = 'All orders';
  isSupervisor: boolean;

  constructor(private dataProvider: DataProvider, private changeDetector: ChangeDetectorRef, private readerProvider: ReaderProvider) {
  }

  ngOnInit() {
    this.currentReader = this.readerProvider.getCurrentUser();
    if ((this.currentReader.roles.filter(role => role.name === 'supervisor').length > 0)) {
      this.isSupervisor = true;
    }
    this.changeDetector.detectChanges();
    this.dataProvider.getReaderOrders(this.currentReader.id).subscribe((orders) => {
      for (let order of orders) {
        if (order.returned) {
          this.returnedOrders.push(order)
        } else {
          this.noReturned.push(order)
        }
      }
      this.orderCards = [...this.returnedOrders, ...this.noReturned]
      this.changeDetector.detectChanges();
    })
  }

  public returnBook(orderCard: OrderCard): void {
    orderCard.book = null;
    this.dataProvider.returnBook(orderCard).subscribe(() => {
      this.readerProvider.getLoggedUser().subscribe((reader) => {
        this.currentReader = reader;
        this.changeDetector.detectChanges();
      })
    })
  }

  public showReaderInfo() {
    this.openReaderInfo = !this.openReaderInfo
    this.changeDetector.detectChanges();
  }

  public changeOrderList() {
    if (this.currentOrdertype === 'All orders') {
      this.currentOrdertype = 'No returned';
      this.orderCards = this.noReturned
      this.changeDetector.detectChanges();
    } else {
      this.currentOrdertype = 'All orders';
      this.orderCards = [...this.returnedOrders, ...this.noReturned];
      this.changeDetector.detectChanges();
    }
  }
}

class OrderCard extends Order {
  public book: Book;

  constructor(book: Book, order: Order) {
    super();
    this.id = order.id;
    this.book = book;
    this.returned = order.returned
    this.bookId = order.bookId;
    this.ordered = order.ordered;
  }
}

