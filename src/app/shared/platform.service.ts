import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable()

export class PlatformService {

constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    isServer() {
        return isPlatformServer(this.platformId);
    }
}
