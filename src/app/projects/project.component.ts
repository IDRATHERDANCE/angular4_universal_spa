import { Component, OnDestroy, OnInit, ViewContainerRef, ViewChild, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { DataActions } from '../../actions/data-actions';

import { routerAnimation } from '../shared/router.animations';
import { PrepareObj } from '../shared/prepareObjects.service';
import { TopService } from '../shared/top.service';
import { MetaService } from '../shared/headMeta.service';
import { CommonCalls } from '../shared/commonCalls.service';
import { PlatformService } from '../shared/platform.service';
import { HeadMetaInterface } from '../shared/headMeta.interface';

    @Component({
        selector: 'project-component',
        templateUrl: './project.template.html',
        styleUrls: ['./project.component.scss'],
        animations: [routerAnimation()],
        host: {'[@routeAnimation]': 'true'},
        changeDetection: ChangeDetectionStrategy.OnPush
        })

export class ProjectComponent implements OnInit, AfterViewInit {

    @select(['applicationData', 'routeData', 'work']) workData$: Observable<any>;
    @ViewChild('mainImage', { read: ViewContainerRef })
    @ViewChild('textBox', { read: ViewContainerRef })

public headline: string;
public sub: string;
public content: string;
public carousel: Object;
public firstPhoto: string;
private wholeContent: Object;
public htmlObject: any;
public isPortrait: boolean;
public isTextLong: boolean;
private _routeSegment: string;
private _url: string = 'work';

    constructor (
        public actions: DataActions,
        private route: ActivatedRoute, 
        public viewContainerRef: ViewContainerRef,
        private _prepObj: PrepareObj,
        private _topService: TopService,
        private _renderer: Renderer2,
        private _meta: Meta,
        private _common: CommonCalls,
        public platform: PlatformService,
        private _metaService: MetaService,
        private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.headline = this.sub = '';
        this.route.params.subscribe(params => this._routeSegment = params['project']);
        this._common.calls(this._url, this.workData$, 
            response => this.populateResponse(response),
            seoCallback => this.createSeoHeader(seoCallback)
        );
    }

    populateResponse(response) {
        this._changeDetectorRef.markForCheck();

        const resObj = this.formatResponse(response);
            this.headline = resObj.headline;
            this.sub = resObj.sub;
            this.content = resObj.content;
            this.carousel = resObj.carousel;
            this.firstPhoto = resObj.firstPhoto;
            this.wholeContent = resObj.wholeContent;
            this._common.setMenu(response);
    }   

    formatResponse(res) {
        const resObj = this.prepObj(res, this._routeSegment);
        return {
            headline: resObj.title,
            sub: resObj.acf.work_short_description,
            content: resObj.content,
            carousel: this.prepCar(resObj).slice(1),
            firstPhoto: this.prepCar(resObj)[0].photo.url,
            wholeContent: this.prepCar(resObj),
            keywords: resObj.terms.post_tag
        }
    }
    
    createSeoHeader(seoResponse) { 
        const resObj = this.formatResponse(seoResponse),
              metaObj: HeadMetaInterface = {
              title: `Ana Rajecvic - ${resObj.headline}`,
              description: resObj.content,
              image: resObj.firstPhoto,
              type: 'Project page',
              keywords: resObj.keywords,
              url: `work/${resObj.headline.toLowerCase()}`
          }

          this._metaService.createMeta(metaObj);
    }
    
    ngAfterViewInit() {
        this._topService.setTop(this._renderer);
    }

    prepObj(res, route) {
        return res.filter(item => this._prepObj.formateTitle(item) === route)[0];
    }

    prepCar(data) { 
        const metaInside = data.acf,
            meta = Object.keys(metaInside);

            return meta.reduce( (all, item) => {  
                
                if ((item.indexOf('work_main_photo') === - 1) && (item.indexOf('work_short_description') === - 1) 
                    && (metaInside[item])) {
                      all.push({
                            photo: {
                                url: metaInside[item].url || metaInside[item].thumbnail_url_with_play_button,
                                aspect: metaInside[item].width / metaInside[item].height
                            }
                        });
                    }
                    return all;
                 }, []);
    }

    popUpActivate(index: number) {
        this.htmlObject = this._prepObj.htmlObj(index, 'work', this.wholeContent);
    }

    onPopOff() {
        this.htmlObject = false;
    }

    isItPortrait(value) {
        this.isPortrait = value;
    }

    isTextTooLong(value) {
        this.isTextLong = value;
    }

}
