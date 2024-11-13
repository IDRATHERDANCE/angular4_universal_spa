import { Component, OnInit, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

// import { select } from '@angular-redux/store';
// import { Observable } from 'rxjs/Observable';
// import { DataActions } from '../../actions/data-actions';

import { routerAnimation } from '../shared/router.animations';
import { PrepareObj } from '../shared/prepareObjects.service';
import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { MetaService } from '../shared/headMeta.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';

import { injectSelector } from "@reduxjs/angular-redux";
import { AppState } from '../../store/state.interface';

@Component({
    selector: 'work-component',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.scss'],
    animations: [routerAnimation()],
    host: { '[@routeAnimation]': 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkComponent implements OnInit, AfterViewInit {

    // @select(['applicationData', 'routeData', 'work']) workData$: Observable<any>;
    private workData = injectSelector((state: AppState) => state.applicationData.routeData.work);
    public data: Object;
    private _url: string = 'work';

    constructor(
        // public actions: DataActions,
        private _prepObj: PrepareObj,
        private _topService: TopService,
        private _renderer: Renderer2,
        private _common: CommonCalls,
        public platform: PlatformService,
        private _metaService: MetaService,
        private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this._common.calls(this._url, this.workData(),
            response => this.populateResponse(response),
            seoCallback => this.createSeoHeader(seoCallback)
        );
    }

    createSeoHeader(seoResponse) {
        const metaObj: HeadMetaInterface = {
            title: 'Ana Rajecvic - Work',
            description: 'Body of work by the artist Ana Rajecvic',
            image: seoResponse[0].acf.work_main_photo.url,
            type: 'Work page',
            keywords: [],
            url: this._url
        }

        this._metaService.createMeta(metaObj);
    }

    populateResponse(response) {
        this._changeDetectorRef.markForCheck();

        this.data = response;
        this._common.setMenu(response);
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }

}


