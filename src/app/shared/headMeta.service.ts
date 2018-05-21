import { Injectable, Inject, NgZone } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/platform-browser';
import { MOCK_WINDOW } from './mock.window';
import { InterfaceMockWindow } from "./mock.window.inteface";
import { PrepareMeta } from './prepare.meta.service';


@Injectable()

export class MetaService {

constructor(
    private _meta: Meta, 
    @Inject(DOCUMENT) private _document, 
    @Inject(MOCK_WINDOW) private _static: InterfaceMockWindow,
    private _format: PrepareMeta) {}

    createMeta(metaObj) {

        const image = metaObj.image || this._static.defaultUrl,
            keywords =  metaObj.keywords && metaObj.keywords.lengt === 0 ? this._format.formatKeywords(metaObj.keywords) : this._static.defaultKeywords,
            description = this._format.removeCharacters(metaObj.description); 

        this._meta.updateTag({ name: 'title', content: metaObj.title });
        this._meta.updateTag({ name: 'description', content: description });
        this._meta.updateTag({ name: 'keywords', content: keywords });

        this._meta.updateTag({ name: 'twitter:card', content: description });
        this._meta.updateTag({ name: 'twitter:title', content: metaObj.title });
        this._meta.updateTag({ name: 'twitter:description', content: description });
        this._meta.updateTag({ name: 'twitter:image', content: image });

        this._meta.updateTag({ name: 'og:title', content: metaObj.title });
        this._meta.updateTag({ name: 'og:type', content: metaObj.type });
        this._meta.updateTag({ name: 'og:url', content: `http://anarajcevic.com/${metaObj.url}` });
        this._meta.updateTag({ name: 'og:image', content: image });
        this._meta.updateTag({ name: 'og:description', content: description });
    }

}

