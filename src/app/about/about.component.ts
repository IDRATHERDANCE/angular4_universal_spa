import {
    Component, OnInit, Renderer2,
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef, StateKey
} from '@angular/core';

import { routerAnimation } from '../shared/router.animations';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { TopService } from '../shared/top.service';
import { MetaService } from '../shared/headMeta.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [routerAnimation()],
    host: { '[@routeAnimation]': 'true', ngSkipHydration: 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, AfterViewInit {
    public pageContent: any;
    public aboutPhoto: any;
    public columnRight: any;
    private _url: StateKey<string> = 'about' as StateKey<string>;


    constructor(
        private _topService: TopService,
        private _renderer: Renderer2,
        private _common: CommonCalls,
        public platform: PlatformService,
        private _metaService: MetaService,
        private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this._common.calls(this._url,
            (response: any) => this.populateResponse(response),
            (seoCallback: any) => this.createSeoHeader(seoCallback)
        );
    }

    populateResponse(response: any) {

        this._changeDetectorRef.markForCheck();

        const resObj = this.formatResponse(response);

        this.pageContent = resObj.content;
        this.aboutPhoto = resObj.photo;
        this.columnRight = resObj.columnRight;
    }

    formatResponse(res: any) {
        return {
            content: res[0].content,
            photo: res[0].acf.about_photo,
            columnRight: res[0].acf.column_right
        }
    }

    createSeoHeader(seoResponse: any) {
        const resObj = this.formatResponse(seoResponse);
        const metaObj: HeadMetaInterface = {
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
