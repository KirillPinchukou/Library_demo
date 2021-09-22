import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';
import {LibraryModule} from "./library/library.module";

import {jsonData} from "./library/json";
import {STORAGE_NAME} from "./library/model/book";

localStorage.setItem(STORAGE_NAME, jsonData)

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(LibraryModule)
  .catch(err => console.error(err));

