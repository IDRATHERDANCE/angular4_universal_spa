import { Directive, AfterViewInit, EventEmitter, Output, Input, Inject } from '@angular/core';
import { ResizeWindow } from '../shared/resize.service';

import { MOCK_WINDOW } from '../shared/mock.window';
import { InterfaceMockWindow } from "../shared/mock.window.inteface";
import { PlatformService } from '../shared/platform.service';

@Directive ({
    selector: '[orientation]'
    })

export class OrientationDirective implements AfterViewInit {

@Output() isItPortrait = new EventEmitter<boolean>();
@Output() isTextTooLong = new EventEmitter<boolean>();

@Input() imageEl: any;   
@Input() textEl: any; 

private _window = this.platform.isServer() ? this._w.window : window;


constructor (
    private _resizeWindow: ResizeWindow, 
    @Inject(MOCK_WINDOW) private _w: InterfaceMockWindow, 
    public platform: PlatformService) {}


    ngAfterViewInit() { 

         
        if (this.platform.isServer()) {
            this.commonCode(this._w.image, this._w.textBox);  
        } else {

            const image = this.imageEl,
            textBox = this.textEl;

            image.addEventListener('load', () => {
                
               this.commonCode(image, textBox);      
            });
        }


    }

    commonCode(image, textBox) {
        const detectOrientation = ( () => {
            const width = image.naturalWidth,
                height = image.naturalHeight,
                textBoxHeight = textBox.clientHeight,
                windowWidth = this._window.innerWidth,
                imageBoxHeight = (windowWidth * 0.385 * height) / width;

                        const textTooHeigh = ( () => {
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
        detectOrientation();
        this._resizeWindow.winResize(detectOrientation);
    }

}
