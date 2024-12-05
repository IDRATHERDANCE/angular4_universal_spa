import {
    Component, OnInit, Renderer2, AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    StateKey
} from '@angular/core';

import { TopService } from '../shared/top.service';

// import { select } from '@angular-redux/store';
// import { Observable } from 'rxjs/Observable';

import { routerAnimation } from '../shared/router.animations';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { MetaService } from '../shared/headMeta.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';
import { PrepareMeta } from '../shared/prepare.meta.service';

@Component({
    selector: 'contact-component',
    templateUrl: './contact.template.html',
    styleUrls: ['./contact.component.scss'],
    animations: [routerAnimation()],
    host: { '[@routeAnimation]': 'true', ngSkipHydration: 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactComponent implements OnInit, AfterViewInit {

    // @select(['applicationData', 'routeData', 'contact']) contactData$: Observable<any>;

    public data: any[] = [];
    private _url: StateKey<string> = 'contact' as StateKey<string>;


    constructor(
        private _topService: TopService,
        private _renderer: Renderer2,
        private _common: CommonCalls,
        public platform: PlatformService,
        private _metaService: MetaService,
        private _format: PrepareMeta,
        private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this._common.calls(this._url,
            (response: any) => this.populateResponse(response),
            (seoCallback: any) => this.createSeoHeader(seoCallback)
        );
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }

    populateResponse(response: any) {
        this._changeDetectorRef.markForCheck();
        const resObj = this.formatResponse(response);
        this.data = response[0].content;
    }

    formatResponse(res: any) {
        return { content: res[0].content }
    }

    createSeoHeader(seoResponse: any) {
        const resObj = this.formatResponse(seoResponse),
            metaObj: HeadMetaInterface = {
                title: 'Ana Rajecvic - Contact',
                description: resObj.content,
                image: '',
                type: 'contact page',
                keywords: [],
                url: this._url
            }

        this._metaService.createMeta(metaObj);
    }


}




