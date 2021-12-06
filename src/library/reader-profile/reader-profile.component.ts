import {Component, OnInit} from '@angular/core';
import {DataProvider} from '../services/data-provider.service';
import {Reader} from '../model/reader';
import {Order} from '../model/order';
import {ReaderProvider} from '../services/client.service';
import {Book} from '../model/book';


@Component({
  selector: 'library-root',
  templateUrl: 'reader-profile.component.html',
  styleUrls: ['reader-profile.compomemt.less']
})
export class ReaderProfileComponent implements OnInit {
  currentReader: Reader;
  orderCards: Array<OrderCard> = [];
  noReturned: Array<OrderCard> = [];
  returnedOrders: Array<OrderCard> = [];
  openReaderInfo: boolean = false;
  currentOrdertype: string = 'All orders';
  isSupervisor: boolean;

  constructor(private dataProvider: DataProvider, private readerProvider: ReaderProvider) {
  }

  ngOnInit() {
    if ((this.readerProvider.getCurrentUser().roles.filter(role => role.name === 'supervisor').length > 0)) {
      this.isSupervisor = true;
    }
    this.readerProvider.getLoggedUser().subscribe((reader) => {
      this.currentReader = reader;
      this.dataProvider.getReaderOrders(reader.id).subscribe((result) => {
        for (let i = 0; i < result.length; i++) {
          this.dataProvider.getBooksById(result[i].bookId).subscribe((book) => {
            if (result[i].returned) {
              this.returnedOrders.push(new OrderCard(book, result[i]));
            } else {
              this.noReturned.push(new OrderCard(book, result[i]));
            }
            this.orderCards = [...this.returnedOrders, ...this.noReturned]
          })
        }
      })
    })
  }

  public returnBook(orderCard: OrderCard): void {
    orderCard.book = null;
    this.dataProvider.returnBook(orderCard).subscribe(() => {
      this.readerProvider.getLoggedUser().subscribe((reader) => {
        this.currentReader = reader;
      })
    })
  }

  public showReaderInfo() {
    this.openReaderInfo = !this.openReaderInfo
  }

  public changeOrderList() {
    if (this.currentOrdertype === 'All orders') {
      this.currentOrdertype = 'No returned';
      this.orderCards = this.noReturned
    } else {
      this.currentOrdertype = 'All orders';
      this.orderCards = [...this.returnedOrders,...this.noReturned];
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

