import {
    StateKey,
    Component,
    OnInit,
    ViewChild,
    Renderer2,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ElementRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    host: { '[@routeAnimation]': 'true', ngSkipHydration: 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectComponent implements OnInit, AfterViewInit {

    @ViewChild('mainImage') mainImage!: ElementRef;
    @ViewChild('textBox') textBox!: ElementRef;


    public headline = '';
    public sub = '';
    public content = '';
    public carousel: any = [];
    public firstPhoto = '';
    private wholeContent: any = {};
    public htmlObject: any = null;
    public isPortrait!: boolean;
    public isTextLong!: boolean;
    private _routeSegment = '';
    private _routeSegmentPop = '';
    public _url: StateKey<string> = 'work' as StateKey<string>;
    public alt = '';

    constructor(
        private route: ActivatedRoute,
        private _prepObj: PrepareObj,
        private _topService: TopService,
        private _renderer: Renderer2,
        private _common: CommonCalls,
        public platform: PlatformService,
        private _metaService: MetaService,
        private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.headline = this.sub = '';
        this.route.params.subscribe(params => {
            this._routeSegment = params['project'];
            this._routeSegmentPop = params['image'];
        });
        this._common.calls(this._url,
            (response: any) => this.populateResponse(response),
            (seoCallback: any) => this.createSeoHeader(seoCallback)
        );
    }

    populateResponse(response: any) {
        this._changeDetectorRef.markForCheck();

        const resObj = this.formatResponse(response);

        this.headline = resObj.headline;
        this.sub = resObj.sub;
        this.content = resObj.content;
        this.carousel = resObj.carousel;
        this.firstPhoto = resObj.firstPhoto;
        this.alt = resObj.alt
        this.wholeContent = resObj.wholeContent;

        if (this._routeSegmentPop) {
            this.htmlObject = this._prepObj.htmlObj(0, 'work', this.wholeContent, this._routeSegmentPop, this._routeSegment);
        }

    }

    formatResponse(res: any) {
        const resObj = this.prepObj(res, this._routeSegment);
        const carPrep = this.prepCar(resObj);
        const firstPhoto = carPrep.length ? carPrep[0].photo.url : '';
        const alt = carPrep.length ? carPrep[0].photo.alt : '';
        return {
            headline: resObj.title,
            sub: resObj.acf.work_short_description,
            content: resObj.content,
            carousel: this.prepCar(resObj).slice(1),
            firstPhoto,
            alt,
            wholeContent: carPrep,
            keywords: resObj.terms.post_tag
        }
    }

    createSeoHeader(seoResponse: any) {
        const resObj = this.formatResponse(seoResponse);
        const metaObj: HeadMetaInterface = {
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

    prepObj(res: any, route: any) {
        return res.filter((item: any) => this._prepObj.formateTitle(item) === route)[0];
    }

    prepCar(data: any) {
        const metaInside = data.acf;
        const meta = Object.keys(metaInside);
        const video = metaInside.work_video;

        const imagesArray = meta.reduce((all: any, item: any) => {
            if (item !== 'work_main_photo' && item !== 'work_short_description' && item !== 'work_video' && item !== 'position' && metaInside[item]
            ) {
                all.push({
                    photo: {
                        url: metaInside[item].url || metaInside[item].thumbnail_url_with_play_button,
                        aspect: metaInside[item].width / metaInside[item].height,
                        alt: metaInside[item].caption
                    },
                    title: metaInside[item].name.replaceAll(' ', '-')
                });
            }
            return all;
        }, []);

        if (video) {
            const firstVideo = {
                photo: {
                    url: video.thumbnail_url_with_play_button,
                    aspect: video.width / video.height
                },
                video: video.html
            };

            imagesArray.splice(1, 0, firstVideo as never);
        }

        return imagesArray;
    }

    popUpActivate(index: any) {
        this.htmlObject = this._prepObj.htmlObj(index, 'work', this.wholeContent, null, this._routeSegment);
    }

    onPopOff() {
        this.htmlObject = null;
    }

    isItPortrait(value: any) {
        this.isPortrait = value;
    }

    isTextTooLong(value: any) {
        this.isTextLong = value;
    }

}
