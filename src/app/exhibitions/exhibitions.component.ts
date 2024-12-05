import {
    Component, OnInit, OnDestroy, Renderer2, AfterViewInit,
    ViewChild, ViewContainerRef,
    ChangeDetectionStrategy, ChangeDetectorRef,
    StateKey, HostListener
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { select } from '@angular-redux/store';
// import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';
import { ResizeWindow } from '../shared/resize.service';
import { PrepareObj } from '../shared/prepareObjects.service';
import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { MetaService } from '../shared/headMeta.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';

@Component({
    selector: 'exhibitions-component',
    templateUrl: './exhibitions.template.html',
    styleUrls: ['./exhi-press.component.scss'],
    animations: [routerAnimation()],
    host: { '[@routeAnimation]': 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class ExhibitionsComponent implements OnInit, AfterViewInit {
    public data: any[] = [];
    private wholeContent: any = {};
    public htmlObject: any = null;
    private _routeSegment = '';
    private _url: StateKey<string> = 'exhibitions' as StateKey<string>;
    public response: any = {};

    constructor(
        public route: ActivatedRoute,
        private _resizeWindow: ResizeWindow,
        private _prepObj: PrepareObj,
        private _topService: TopService,
        private _renderer: Renderer2,
        private _common: CommonCalls,
        public platform: PlatformService,
        private _metaService: MetaService,
        private _changeDetectorRef: ChangeDetectorRef) { }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.lookForResize(this.response);
    }


    ngOnInit() {

        this.route.params.subscribe(params => {
            this._routeSegment = params['exhibition'];
        });

        this._common.calls(this._url,
            (response: any) => this.populateResponse(response),
            (seoCallback: any) => this.createSeoHeader(seoCallback)
        );
    }
    lookForResize = ((response: any) => {
        this.data = this._resizeWindow.dataTrimmed(response)
    });

    populateResponse(response: any) {
        this._changeDetectorRef.markForCheck();
        this.response = response;
        this.lookForResize(response);
        // this._resizeWindow.winResize(lookForResize);
        this.wholeContent = this._prepObj.prepObj(response, 'exhibition');
        if (this._routeSegment !== undefined) {
            this.popUpActivateByRoute(response, this._routeSegment);
        }
    }

    createSeoHeader(seoResponse: any) {
        const metaObj: HeadMetaInterface = this._prepObj.prepareSeoObj(seoResponse, this._routeSegment, this._url, 'exhibition');
        this._metaService.createMeta(metaObj);
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }

    popUpActivate(index: number) {
        this.htmlObjMethod(index);
    }

    popUpActivateByRoute(res: any, routeSegment: any) {
        const current = this._prepObj.getClicked(res, routeSegment);
        this.htmlObjMethod(current);
    }

    htmlObjMethod(clickedCurrent: any) {
        this.htmlObject = this._prepObj.htmlObj(clickedCurrent, 'exhibitions', this.wholeContent, this._routeSegment);
    }

    onPopOff() {
        this.htmlObject = null;
    }

}
