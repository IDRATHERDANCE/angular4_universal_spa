import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

import { PlatformService } from './platform.service';


@Injectable()

export class ResizeWindow {

  constructor(private _eventManager: EventManager, public platform: PlatformService) {}

  winResize(callback) {
    if (this.platform.isServer()) return;
    this._eventManager.addGlobalEventListener('window', 'resize', callback);
  }

  isItPhone() {
    if (this.platform.isServer()) { return false; };
    return window.innerWidth >= 736 ? false : true;
  }

  dataTrimmed(response) {
    return this.isItPhone() ? Array.of(response[0]) : response;
  }

}