
import { Component, OnInit, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';
import { ResizeWindow } from '../shared/resize.service';
import { PrepareObj } from '../shared/prepareObjects.service';
import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { MetaService } from '../shared/headMeta.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';


    @Component({
        selector: 'news-component',
        templateUrl: './news.template.html',
        styleUrls: ['./news.component.scss'],
        animations: [routerAnimation()],
        host: {'[@routeAnimation]': 'true'},
        changeDetection: ChangeDetectionStrategy.OnPush
        })


export class NewsComponent implements OnInit, AfterViewInit {

  @select(['applicationData', 'routeData', 'news']) newsData$: Observable<any>;

public data: Object;
private wholeContent: Object;
private coulmnsData: Object;
public htmlObject: Object;
private down: Boolean;
private _routeSegment: string;
private _url: string = 'news';

constructor ( 
    private route: ActivatedRoute, 
    private _resizeWindow: ResizeWindow,
    private _prepObj: PrepareObj,
    private _topService: TopService,
    private _renderer: Renderer2,
    private _common: CommonCalls,
    public platform: PlatformService,
    private _metaService: MetaService,
    private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.route.params.subscribe(params => this._routeSegment = params['single']);
        
        this._common.calls(this._url, this.newsData$, 
            response => this.populateResponse(response),
            seoCallback => this.createSeoHeader(seoCallback)
        );
    }

    populateResponse(response) {
        this._changeDetectorRef.markForCheck();
        
        const lookForResize = (() => {
            this.data = this._resizeWindow.dataTrimmed(response)
        });
        lookForResize();
        this._resizeWindow.winResize(lookForResize);
        this.wholeContent = this._prepObj.prepObj(response, 'news');
        this.coulmnsData = this.prepPhotoDimensions(response);
            if (this._routeSegment !== undefined) {
                this.popUpActivateByRoute(response, this._routeSegment);
            }
    }
    
    createSeoHeader(seoResponse) {
        const metaObj: HeadMetaInterface = this._prepObj.prepareSeoObj(seoResponse, this._routeSegment, this._url);
                this._metaService.createMeta(metaObj);
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }    

    popUpActivate(index: number) {
        this.htmlObjMethod(index);
    }

    popUpActivateByRoute(res, routeSegment) {
        const current =  this._prepObj.getClicked(res, routeSegment);
            this.htmlObjMethod(current); 
    }

    htmlObjMethod(clickedCurrent) {
       this.htmlObject = this._prepObj.htmlObj(clickedCurrent, 'news', this.wholeContent);
    }

    onPopOff(off: boolean) {
        this.htmlObject = off;
    }

    prepPhotoDimensions(res) {
        return {
                width: res[0].acf.news_photo.width,
                height: res[0].acf.news_photo.height,
                pop: false
            };
    }

    columsClasses(value) {
        this.down = value;
    }

}
