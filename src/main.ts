import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import {LibraryModule} from "./library/library.module";

import {jsonData} from "./library/json";

localStorage.setItem('jsonData', jsonData)

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(LibraryModule)
  .catch(err => console.error(err));

