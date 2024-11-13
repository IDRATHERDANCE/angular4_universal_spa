import { Component, OnInit, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

// import { select } from '@angular-redux/store';
// import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { TopService } from '../shared/top.service';
import { MetaService } from '../shared/headMeta.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';

import { injectSelector } from "@reduxjs/angular-redux";
import { AppState } from '../../store/state.interface';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [routerAnimation()],
    host: { '[@routeAnimation]': 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, AfterViewInit {

    // @select(['applicationData', 'routeData', 'about']) aboutData$: Observable<any>;
    private aboutData = injectSelector((state: AppState) => state.applicationData.routeData.about);
    public pageContent: any;
    public aboutPhoto: any;
    public columnRight: any;
    private _url: string = 'about'


    constructor(
        private _topService: TopService,
        private _renderer: Renderer2,
        private _common: CommonCalls,
        public platform: PlatformService,
        private _metaService: MetaService,
        private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this._common.calls(this._url, this.aboutData(),
            response => this.populateResponse(response),
            seoCallback => this.createSeoHeader(seoCallback)
        );
    }

    populateResponse(response) {

        this._changeDetectorRef.markForCheck();

        const resObj = this.formatResponse(response);

        this.pageContent = resObj.content;
        this.aboutPhoto = resObj.photo;
        this.columnRight = resObj.columnRight;
    }

    formatResponse(res) {
        return {
            content: res[0].content,
            photo: res[0].acf.about_photo,
            columnRight: res[0].acf.column_right
        }
    }

    createSeoHeader(seoResponse) {
        const resObj = this.formatResponse(seoResponse),
            metaObj: HeadMetaInterface = {
                title: 'Ana Rajecvic - About',
                description: resObj.content,
                image: resObj.photo,
                type: 'about page',
                keywords: [],
                url: this._url
            }

        this._metaService.createMeta(metaObj);
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }

}
