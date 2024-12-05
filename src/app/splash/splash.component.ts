import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, StateKey } from '@angular/core';

import { routerAnimation } from '../shared/router.animations';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { MetaService } from '../shared/headMeta.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';

@Component({
    selector: 'splash-component',
    templateUrl: './splash.template.html',
    styleUrls: ['./splash.component.scss'],
    animations: [routerAnimation()],
    host: { '[@routeAnimation]': 'true', ngSkipHydration: 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SplashComponent implements OnInit {

    public splashLogo = '';
    public splashText = '';
    public splash = { backgroundImage: '' };
    public _url: StateKey<string> = 'splash' as StateKey<string>;

    constructor(
        @Inject(CommonCalls) private _common: CommonCalls,
        @Inject(MetaService) private _metaService: MetaService,
        public platform: PlatformService,
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
        this.splashLogo = resObj.splashLogo;
        this.splashText = resObj.splashText;
        this.splash = { backgroundImage: `url("${resObj.splashPhoto}")` };
    }


    formatResponse(res: any) {
        return {
            splashLogo: res[0].acf.splash_logo,
            splashText: res[0].content,
            splashPhoto: res[0].acf.splash_photo
        }
    }

    createSeoHeader(seoResponse: any) {
        const resObj = this.formatResponse(seoResponse),
            metaObj: HeadMetaInterface = {
                title: 'Ana Rajecvic',
                description: 'Home page of the Portfolio website of the artist Ana Rajcevic',
                image: resObj.splashPhoto,
                type: 'home page',
                keywords: [],
                url: ''
            }

        this._metaService.createMeta(metaObj);
    }
}
