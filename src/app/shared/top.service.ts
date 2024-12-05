import { Injectable, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { PlatformService } from './platform.service';

@Injectable({
    providedIn: 'root',
})

export class TopService {

    constructor(@Inject(DOCUMENT) private _document: Document, public platform: PlatformService) { }

    setTop(renderer: Renderer2) {

        if (this.platform.isServer()) return;

        const body = this._document.body,
            html = this._document.documentElement;

        if (body.scrollTop === 0) return;
        [body, html].map(item => renderer.setProperty(item, 'scrollTop', 0));

    }

    isFirefox() {
        if (this.platform.isServer()) return false;
        const ua = window.navigator.userAgent.toLowerCase();
        return /firefox/i.test(ua);
    }

}
