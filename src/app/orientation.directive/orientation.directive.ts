import { Directive, AfterViewInit, EventEmitter, Output, Input, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MOCK_WINDOW } from '../shared/mock.window';
import { InterfaceMockWindow } from "../shared/mock.window.inteface";
import { PlatformService } from '../shared/platform.service';

@Directive({
    selector: '[orientation]',
})

export class OrientationDirective implements AfterViewInit {

    @Output() isItPortrait = new EventEmitter<boolean>();
    @Output() isTextTooLong = new EventEmitter<boolean>();

    @Input() imageEl: any;
    @Input() textEl: any;


    private _window: Window;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(MOCK_WINDOW) private _w: InterfaceMockWindow,
        public platform: PlatformService,
    ) {
        this._window = this.platform.isServer() ? this._w.window : <any>this.document.defaultView;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.detectOrientation(this.imageEl, this.textEl)
    }



    ngAfterViewInit() {

        if (this.platform.isServer()) {
            this.detectOrientation(this._w.image, this._w.textBox);
        } else {
            this.imageEl.addEventListener('load', () => {
                this.detectOrientation(this._w.image, this._w.textBox);
            });
        }


    }

    detectOrientation = ((image: any, textBox: any) => {
        if (this.platform.isServer()) return;
        const width = image.naturalWidth;
        const height = image.naturalHeight;
        const textBoxHeight = textBox.clientHeight;
        const windowWidth = this._window.window.innerWidth;
        const imageBoxHeight = (windowWidth * 0.385 * height) / width;

        const textTooHeigh = (() => {
            if (imageBoxHeight <= textBoxHeight) {
                this.isTextTooLong.emit(false);
            } else {
                this.isTextTooLong.emit(true);
            }
        });

        if (windowWidth > 767) {
            if (height >= width) {
                this.isItPortrait.emit(true);
                textTooHeigh();
            } else {
                this.isItPortrait.emit(false);
                this.isTextTooLong.emit(false);
            }
        }
    });
}
