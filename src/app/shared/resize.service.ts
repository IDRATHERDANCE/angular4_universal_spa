import { Injectable } from '@angular/core';
import { PlatformService } from './platform.service';


@Injectable({
  providedIn: 'root'
})

export class ResizeWindow {

  constructor(public platform: PlatformService) { }

  isItPhone() {
    if (this.platform.isServer()) { return false; };
    return window.innerWidth >= 736 ? false : true;
  }

  dataTrimmed(response: any) {
    return this.isItPhone() ? Array.of(response[0]) : response;
  }

}
