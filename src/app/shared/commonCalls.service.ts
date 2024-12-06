import { Injectable, Inject, TransferState, StateKey } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { HttpgetService } from '../shared/httpget.service';
import { PlatformService } from '../shared/platform.service';
import { PrepareObj } from '../shared/prepareObjects.service';


@Injectable({
    providedIn: 'root'
})

export class CommonCalls {

    private subscriptionXHR: any;

    constructor(
        @Inject(HttpgetService) private _httpgetService: HttpgetService,
        private _prepObj: PrepareObj,
        public platform: PlatformService,
        private _cache: TransferState
    ) { }

    calls(url: StateKey<string>, callback?: any, seoCallback?: any) {
        if (!this._cache.hasKey(url)) {
            this.getDataFromService(url, this.platform.isServer(), callback, seoCallback);
        } else {
           const resData = this._cache.get(url, '' as StateKey<string>);
            if (callback) callback(resData || {});
        }
    }

    getMenu(resData: any) {
        const menuArray = resData.map((item: any) => this._prepObj.formateTitle(item));
        return menuArray;
    }

    sortResponse(url: StateKey<string>, response: any) {
        return url === 'work' ? response.sort((a: any, b: any) => a.acf.position - b.acf.position) : response;
    }

    getDataFromService(url: StateKey<string>, server: boolean, callback?: any, seoCallback?: any) {
        this.subscriptionXHR = this._httpgetService.getApiData(url)
            .subscribe((response: any) => {
                if (server) {
                    const sortedResponse = this.sortResponse(url, response);
                    try {
                        const uselessKey = Object.keys(JSON.parse(this._cache.toJson()))[0];
                        this._cache.remove(uselessKey as StateKey<string>)
                    } catch(e) {
                        console.log(e);
                    }
                    if (!this._cache.hasKey(url)) this._cache.set(url, sortedResponse);
                    if (seoCallback) seoCallback(sortedResponse);
                    if (callback) callback(sortedResponse);
                } else {
                    if (callback) callback(response);
                }
                if (this.subscriptionXHR) this.subscriptionXHR.unsubscribe();
            });
    }


}
