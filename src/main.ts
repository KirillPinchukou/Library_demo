import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import {LibraryModule} from "./library/library.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(LibraryModule)
  .catch(err => console.error(err));
