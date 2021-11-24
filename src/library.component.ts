import {Component, OnInit} from '@angular/core';
import {DataProvider} from './library/services/data-provider.service';
import {ActivatedRoute} from '@angular/router';
import {ReaderService} from './library/services/reader-service/reader-service';
import {Genre} from './library/model/book';


@Component({
  selector: 'app-root',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less']
})
export class LibraryComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private readerService: ReaderService) {

  }

  ngOnInit() {
    this.readerService.getLoggedUser().subscribe((reader) => {
      this.isLogged = true
    })
  }
}
