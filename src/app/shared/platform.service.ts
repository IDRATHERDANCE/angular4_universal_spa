import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class PlatformService {

    constructor(@Inject(PLATFORM_ID) private platformId: any) { }

    isServer() {
        return isPlatformServer(this.platformId);
    }
}
