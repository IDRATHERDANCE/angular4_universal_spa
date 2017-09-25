import { Component, OnInit, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { TopService } from '../shared/top.service';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

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
        host: {'[@routeAnimation]': 'true'},
        changeDetection: ChangeDetectionStrategy.OnPush
        })

export class ContactComponent implements OnInit, AfterViewInit {

    @select(['applicationData', 'routeData', 'contact']) contactData$: Observable<any>;

public data: Object;
private _url: string = 'contact';

constructor ( 
    private _topService: TopService,
    private _renderer: Renderer2,
    private _common: CommonCalls,
    public platform: PlatformService,
    private _metaService: MetaService,
    private _format: PrepareMeta,
    private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() { 
        this._common.calls(this._url, this.contactData$, 
            response => this.populateResponse(response),
            seoCallback => this.createSeoHeader(seoCallback)
        );
    }

    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }

    populateResponse(response) {
        this._changeDetectorRef.markForCheck();
        const resObj = this.formatResponse(response);
        this.data = response[0].content;
    }

    formatResponse(res) {
        return { content: res[0].content }
    }

    createSeoHeader(seoResponse) {
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




