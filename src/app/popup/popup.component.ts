import { Component, Input, EventEmitter, Output, OnChanges,
        HostListener, ChangeDetectionStrategy, 
        ChangeDetectorRef, ViewContainerRef, 
        ViewChild, Renderer2, OnInit, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer, Meta } from '@angular/platform-browser';

import { RemoveEmptyLines } from '../shared/removeEmptyLines.service';
import { ResizeWindow } from '../shared/resize.service';
import { CssClassesHelper } from '../shared/cssClassesHelper.service';
import { DataActions } from '../../actions/data-actions';
import { MetaService } from '../shared/headMeta.service';

import { MOCK_WINDOW } from '../shared/mock.window';
import { InterfaceMockWindow } from "../shared/mock.window.inteface";
import { PlatformService } from '../shared/platform.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';
import { PrepareMeta } from '../shared/prepare.meta.service';


@Component ({
    selector: 'pop-up-init',
    templateUrl: './popup.template.html',
    styleUrls: ['./popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
    })

export class PopUpInitComponent implements OnChanges, OnInit, OnDestroy {

@Input() contentObject: any;
@Output() onPopOff = new EventEmitter<boolean>();

@ViewChild('newsPopText', { read: ViewContainerRef })
private _newsB: any;
@ViewChild('popUpCont', { read: ViewContainerRef })
private _popUpCont: any;


private counter: number = 0;
private isItTooTall: Boolean;
private port: Boolean;
private isPortWider: Boolean;
private widerNews: Boolean;
private down: Boolean;
private hasPosition: Boolean = false;
private wider: Boolean;
public currentIfame: any;
private coulmnsData: Object;
public currentPhoto: any;
private isItNews: Boolean;
public newsText: string;
public text: string;
public arrowHover: boolean;
private _page: string;
private _imgLoad: boolean = false;
private _tooTallFlag: boolean = false;
public wrapPos: boolean = false;
private _iframeAndDown: boolean = false;
private _window = this.platform.isServer() ? this._w.window : window;
public alt: string;

// host listeners have to go before constructor    
@HostListener('window:keydown', ['$event']) onKeyDown(event: any) {

    const keyCodeNumber = event.keyCode;

        // esc key kills the pop-up
    if ((keyCodeNumber) === 27) {
        this.onPopOff.emit(false);
        this.location.go(this.contentObject.page);
    }
    // space bar and right arrow move to the next pop-up right
    if ((keyCodeNumber === 32) || (keyCodeNumber === 39) || (keyCodeNumber === 38)) {
        event.preventDefault();
            this.nextItem();
    }
    // back space and left arrow move to the next pop-up right
    if ((keyCodeNumber === 37) || (keyCodeNumber === 8) || (keyCodeNumber === 40)) {
        event.preventDefault();
            this.previousItem();
    }
  }

constructor (
            private location: Location,
            private sanitationService: DomSanitizer,
            private _changeDetectorRef: ChangeDetectorRef,
            private _removeEmptyLines: RemoveEmptyLines,
            private _resizeWindow: ResizeWindow,
            private _renderer: Renderer2,
            public actions: DataActions,
            public cssCH: CssClassesHelper,
            @Inject(MOCK_WINDOW) private _w: InterfaceMockWindow,
            public platform: PlatformService,
            private _meta: Meta,
            private _format: PrepareMeta,
            private _metaService: MetaService) {}

    ngOnChanges() {
        this.counter = this.contentObject.itemClicked;
        this.checkWhichPage(0); 
    }

    ngOnInit() {
        this.actions.popUp(true);
    }

    ngOnDestroy() {
        this.actions.popUp(false)
    }

    checkWhichPage(dir) { 

        this.isItNews = false;

        this._page = this.contentObject.page;
        const index = this.counter; 

        const  title = this.contentObject.content[index].title;    
        this.location.go(`${this._page}/${title}`);

        if ((this._page === 'exhibitions') || (this._page === 'press') || (this._page === 'work')) {
            this.hasItVideo(dir);
        }

        if (this._page === 'news') {
            this.hasItVideo(dir);
            this.isItNews = true;
        }
    }

    getText() { 
        
        const index = this.counter;

        if ((this._page === 'exhibitions') || (this._page === 'press')) {
            const text = this.contentObject.content[index].text
            this.text = this._removeEmptyLines.removeLines(text);
        }

        if (this._page === 'news') {
            this.newsText = this.contentObject.content[index].text.replace(/style=.*"/g, '').replace(/<em>/g, '').replace(/<\/em>/g, '');
        }

        this.alt = this.contentObject.content[index].photo.alt


        return this.text || this.newsText;
    }

    basicPhotos(dir) { 

        const index = this.counter;

        if (this.platform.isServer()) {
            this.comonImgLoad(this.contentObject.content[index].photo.url); 
        } else {
            const newImg = new Image();
            newImg.src = this.contentObject.content[index].photo.url;

            newImg.onload =  () => {  
                this.comonImgLoad(newImg.src); 
                this._changeDetectorRef.markForCheck();
                if (this._page === 'work') return;
                this.lazyLoadImg(dir);
            }; 
        }

            if (this._page === 'news') {
                this.coulmnsData = {
                    width: this.contentObject.content[index].photo.width,
                    height: this.contentObject.content[index].photo.height,
                    pop: true
                }; 

            } else { 
                this.checkAspect(this.contentObject.content[index].photo.aspect);
            }   
    }

    comonImgLoad(imgSrc) {
        this.currentPhoto = imgSrc;
        this.getText();
        this._imgLoad = true;
    }

    lazyLoadImg(dir) { 
        
        const howMany = this.contentObject.content.length;
        let  index = this.counter; 

        if (dir === 0 || dir === 2) {
            index = index === 0 ? howMany - 1 : index; 
            
            if (this.contentObject.content[index - 1].newPop) return; 
            
            const newImg0 = new Image();
                newImg0.src = this.contentObject.content[index - 1].photo.url;

                if (dir === 2) return;
                    newImg0.onload =  () => {  
                        this.lazyLoadImg(1);
                    }; 
        } else {
            index = index === howMany - 1 ? 0: index; 
            
            if (this.contentObject.content[index + 1].newPop) return; 
            
            const newImg1 = new Image();
                newImg1.src = this.contentObject.content[index + 1].photo.url;
        }

    }

    basicVideo() {

        this.currentPhoto = '';
        const index = this.counter,
        iframe = this.contentObject.content[index].video;

        this.currentIfame = this.sanitationService.bypassSecurityTrustResourceUrl(iframe.substring(iframe.lastIndexOf('https:'),
        iframe.lastIndexOf('width') - 2) +
        '?autoplay=0&amp;title=0&amp;byline=0&amp;portrait=0&amp;loop=0&amp;api=0&amp;player_id=&amp;start=0');
        this.getText();
        this._imgLoad = true;
        if (this._page === 'news') {
            this.coulmnsData = {
                width: 16,
                height: 8.67,
                pop: true
            };     
        }

    }

    hasItVideo(dir) {
        const index = this.counter,
            checkVideo = this.contentObject.content[index].video;

        if ((checkVideo === undefined) || (!checkVideo)) {
                this.currentIfame = false;
                this.basicPhotos(dir);
            } else {
                this.basicVideo();
            }
    }

    nextItem() {

        const numberOfItems = this.contentObject.content.length;
        this.counter ++;

            if (numberOfItems === this.counter) {
                this.counter = 0;
            }
    
            this.nextPrevCommon(1);
        }

    previousItem() { 

        const numberOfItems = this.contentObject.content.length;
        this.counter --;

            if (this.counter === - 1) {
                this.counter = numberOfItems - 1;
            } 
            
            this.nextPrevCommon(2);       
    }

    nextPrevCommon(dir) {
        this._imgLoad = false;
        this._tooTallFlag = false;
        this.currentPhoto = '';
        this.hasPosition = false;  
        this.checkWhichPage(dir);
    }


    clickBox(event) {
        if (
            (event.target.nodeName !== 'A') &&
            (event.target.className !== 'popUpWrap') &&
            ((event.target.className.indexOf('popUpContainer') > -1) && (event.target.children[1].className.indexOf('widerBox') === -1)) ||
            (event.target.nodeName === 'IMG') ||
            (event.target.nodeName === 'P') ||
            (event.target.className.indexOf('newsPopup') > -1)
            ) {
                this.nextItem();
            } else {
                this.onPopOff.emit(false);
                this.location.go(this.contentObject.page);
            }
    }

    clickArrow(event) { 
        if (event.target.classList.value.indexOf('Right') > - 1) {
            this.nextItem();
        } else {
            this.previousItem();
        }
    }

    checkAspect(aspect) { 

        const detectAspect = ( () => {

            const windowAspect = this._window.innerWidth / this._window.innerHeight;

                if (windowAspect >= aspect) {
                    this.wider = true;
                } else {
                    this.wider = false;
                }

                this._changeDetectorRef.markForCheck();

        });
        detectAspect();
        this._resizeWindow.winResize(detectAspect);

    }

    columsClasses(value) { 
        this.down = value.classes;
        this.hasPosition = true;

            const contEl = this._popUpCont.element.nativeElement,
                    topCalc = (this._window.innerHeight - value.boxH) / 2 >= 0 ? (this._window.innerHeight - value.boxH) / 2 : 0,
                    topCorr = this.isPortWider ? '' : '';


        if (value.classes && (!this.down || this.port) && !this.isPortWider && this.port) { 
            this._renderer.setStyle(contEl, 'minHeight', `${value.boxH / 10}rem`) 
            this._renderer.setStyle(contEl, 'top', `${topCalc / 10}rem`) 
        } else {
            this._renderer.setStyle(contEl, 'minHeight', '');
            this._renderer.setStyle(contEl, 'top', topCorr) 
        }
    }

    newsPopAspect(value) {
        this.widerNews = value;
    }

    portWider(value) { 
        this.isPortWider = value;
        this._iframeAndDown = !value && !!this.currentIfame;
    }

    portraitNewsPhotos(value) { 
        this.port = value;
    }

    tooTallBox(value) {
        this.isItTooTall = value;
        this._tooTallFlag = true;            
    }

    onMouseEnter() {
        this.arrowHover = true;
    }

    onMouseLeave() {
        this.arrowHover = false;
    }

}
