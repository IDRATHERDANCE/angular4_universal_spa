import 'zone.js';
import 'reflect-metadata';

// import 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAppModule } from './app/browser-app.module';
import { enableProdMode } from '@angular/core';
import { provideRedux } from "@reduxjs/angular-redux";
import store from "./store";
// import "@angular/compiler"


enableProdMode();

export function main() {
  return platformBrowserDynamic().bootstrapModule(BrowserAppModule, {
    providers: [provideRedux({ store })],
  });
}

document.addEventListener('DOMContentLoaded', main, false);
