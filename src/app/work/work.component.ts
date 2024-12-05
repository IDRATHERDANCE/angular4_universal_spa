import {
    Component,
    OnInit,
    Renderer2,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    StateKey
} from '@angular/core';

import { routerAnimation } from '../shared/router.animations';
import { TopService } from '../shared/top.service';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { MetaService } from '../shared/headMeta.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';

@Component({
    selector: 'work-component',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.scss'],
    animations: [routerAnimation()],
    host: { '[@routeAnimation]': 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush
})



export class WorkComponent implements OnInit, AfterViewInit {
    public data: any[] = [];
    public _url: StateKey<string> = 'work' as StateKey<string>;

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
            (response: any) => this.createSeoHeader(response));
    }

    createSeoHeader(seoResponse: any) {
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

    populateResponse(response: any[]) {
        this.data = response;
        this._common.getMenu(response);
        this._changeDetectorRef.markForCheck();
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }

}


