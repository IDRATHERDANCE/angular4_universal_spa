import {
    Component, OnInit, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
    StateKey
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { routerAnimation } from '../shared/router.animations';
import { ResizeWindow } from '../shared/resize.service';
import { PrepareObj } from '../shared/prepareObjects.service';
import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { MetaService } from '../shared/headMeta.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';

@Component({
    selector: 'press-component',
    templateUrl: './press.template.html',
    styleUrls: ['../exhibitions/exhi-press.component.scss'],
    animations: [routerAnimation()],
    host: { '[@routeAnimation]': 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PressComponent implements OnInit, AfterViewInit {
    public data: any[] = [];
    private wholeContent: any = {};
    public htmlObject: any = null;
    private subscriptionRoute: any;
    private _routeSegment = '';
    private _url: StateKey<string> = 'press' as StateKey<string>;

    constructor(
        private route: ActivatedRoute,
        private _resizeWindow: ResizeWindow,
        private _prepObj: PrepareObj,
        private _topService: TopService,
        private _renderer: Renderer2,
        private _common: CommonCalls,
        public platform: PlatformService,
        private _metaService: MetaService,
        private _changeDetectorRef: ChangeDetectorRef) { }


    ngOnInit() {

        this.subscriptionRoute = this.route.params.subscribe(params => {
            this._routeSegment = params['article'];
        });

        this._common.calls(this._url, (response: any) => this.populateResponse(response),
            (seoCallback: any) => this.createSeoHeader(seoCallback)
        );
    }

    populateResponse(response: any) {
        this._changeDetectorRef.markForCheck();

        const lookForResize = (() => {
            this.data = this._resizeWindow.dataTrimmed(response)
        });
        lookForResize();
        this.wholeContent = this._prepObj.prepObj(response, 'press');
        if (this._routeSegment !== undefined) {
            this.popUpActivateByRoute(response, this._routeSegment);
        }
    }

    createSeoHeader(seoResponse: any) {
        const metaObj: HeadMetaInterface = this._prepObj.prepareSeoObj(seoResponse, this._routeSegment, this._url);
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
        this.htmlObject = this._prepObj.htmlObj(clickedCurrent, 'press', this.wholeContent, this._routeSegment);
    }

    onPopOff() {
        this.htmlObject = null;
    }
}
