import { Directive, Input, Output, EventEmitter, ElementRef, OnChanges, OnDestroy, Inject } from '@angular/core';
import { ResizeWindow } from '../shared/resize.service';
import { MOCK_WINDOW } from '../shared/mock.window';
import { InterfaceMockWindow } from "../shared/mock.window.inteface";
import { PlatformService } from '../shared/platform.service';

@Directive ({
    selector: '[columns]'
   })

export class ColumnsDirective implements OnChanges, OnDestroy {

@Input() coulmnsData: any;
@Input() newsPopTextBox: any;
@Input() newsPopTextMain: any;

@Output() columsClasses = new EventEmitter<any>();
@Output() newsPopAspect = new EventEmitter<boolean>();
@Output() portWider = new EventEmitter<boolean>();
@Output() portraitNewsPhotos = new EventEmitter<boolean>();
@Output() tooTallBox = new EventEmitter<boolean>();

private _setTimeout1: any;
private _setTimeout2: any;
private _setTimeout3: any;
private _window = this.platform.isServer() ? this._w.window : window;

constructor (
    private element: ElementRef, 
    private _resizeWindow: ResizeWindow,
    @Inject(MOCK_WINDOW) private _w: InterfaceMockWindow, 
    public platform: PlatformService) {}

    ngOnDestroy() {
        Object.keys(this).map(item => {
            if (this[item].source && this[item].source === 'setTimeout') {
                clearTimeout(this[item]);
            }
        });
    }

    ngOnChanges() {

        if (this.coulmnsData.pop) {
            this.culumnsFn();
        } else {
            this.culumnsNonPopFn();
        }
    }

    culumnsNonPopFn() {

        const aspect = 1.67714884696017;

        const addColumnClassesNonPop = () => {

                this._setTimeout1 = setTimeout ( () => {

                    const windowWidth = this._window.innerWidth,
                        textHeight = this.platform.isServer() ? this._w.elClHeight : this.element.nativeElement.clientHeight,
                        imageHeight = ((windowWidth * 0.5805555555555556) / aspect) - 16;

                            if (imageHeight <= textHeight) {
                                    this.columsClasses.emit(true);

                                } else {
                                    this.columsClasses.emit(false);
                                }
                }, 100);
            };

        addColumnClassesNonPop();
        this._resizeWindow.winResize(addColumnClassesNonPop);
    }

    culumnsFn() {

        const addColumnClasses = (() => {

            
        if (!this._resizeWindow.isItPhone()) {

            const aspect = this.coulmnsData.width / this.coulmnsData.height;


        if (aspect < 1) { this.portraitNewsPhotos.emit(true); } else { this.portraitNewsPhotos.emit(false); }

      const windowWidth = this._window.innerWidth,
            windowHeight = this._window.innerHeight,
            windowAspect = windowWidth / windowHeight,
            narrowHeight = Math.round((windowHeight * windowAspect * 0.616) / aspect),
            wideHeight = Math.round((windowHeight * 0.8)),
            newAspect = ((windowHeight * 0.8 * aspect) + (windowWidth * 0.23) - 5) / (windowHeight * 0.8);
        let currentHeightMeassure: number;
            
                    if (newAspect <= windowAspect) { 
                        this.portWider.emit(false);
                        currentHeightMeassure = wideHeight;
                    } else { 
                        this.portWider.emit(true);
                        currentHeightMeassure = narrowHeight;
                    }
                    

            this._setTimeout2 = setTimeout ( () => { 

            const measureTextHeight = this.element.nativeElement.parentElement.clientHeight;
                            
                if (measureTextHeight >= currentHeightMeassure) { 
                        
                            this.columsClasses.emit({classes: true, boxH: measureTextHeight});
                            this.newsPopAspect.emit(false);

                            const imgWidth = windowWidth * 0.6001765225066196,
                                imgHeight = imgWidth / aspect;

                            this._setTimeout3 = setTimeout ( () => { 

                            const textHeight = this.newsPopTextBox.element.nativeElement.clientHeight;
                                    
                                        if (imgHeight + textHeight >= windowHeight * 0.9) {
                                                this.tooTallBox.emit(true);
                                            } else {
                                                this.tooTallBox.emit(false);
                                        }

                                }, 100);

                        } else { 
                            
                            this.columsClasses.emit({classes: false, boxH: measureTextHeight});
                            this.newsPopAspect.emit(true);
                            this.tooTallBox.emit(false);

                        }

                }, 200);


        } else {
            this.columsClasses.emit(false);
        }

        });
    
        addColumnClasses ();
        this._resizeWindow.winResize(addColumnClasses);

    }



}
