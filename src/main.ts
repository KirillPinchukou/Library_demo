import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';
import {LibraryModule} from "./library/library.module";

import {BOOK_STOARGE} from "./library/json";
import {STORAGE_NAME} from "./library/model/book";


if( localStorage.getItem(STORAGE_NAME) == null){
  localStorage.setItem(STORAGE_NAME,BOOK_STOARGE)
}


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(LibraryModule)
  .catch(err => console.error(err));

