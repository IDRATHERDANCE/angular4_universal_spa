import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { DataActions } from '../../actions/data-actions';
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
        host: {'[@routeAnimation]': 'true'},
        changeDetection: ChangeDetectionStrategy.OnPush
        })

export class SplashComponent implements OnInit {
  
  @select(['applicationData', 'routeData', 'splash']) splashData$: Observable<any>;

public splashlogo: String;
public splashText: String;
public splash: Object;
private _url: string = 'splash';

constructor (
    private _common: CommonCalls,
    public platform: PlatformService,
    private _metaService: MetaService,
    private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        this._common.calls(this._url, this.splashData$, 
            response => this.populateResponse(response),
            seoCallback => this.createSeoHeader(seoCallback)
        );
    }

    populateResponse(response) {
        this._changeDetectorRef.markForCheck();

        const resObj = this.formatResponse(response);

        this.splashlogo = resObj.splashlogo;
        this.splashText = resObj.splashText;
        this.splash = { backgroundImage: `url("${resObj.splashPhoto}")` };
    }

    
    formatResponse(res) {
        return {
            splashlogo: res[0].acf.splash_logo,
            splashText: res[0].content,
            splashPhoto: res[0].acf.splash_photo
        }
    }

    createSeoHeader(seoResponse) {
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
