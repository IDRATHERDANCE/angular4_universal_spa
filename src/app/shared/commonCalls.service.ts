import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

// import { select } from '@angular-redux/store';
// import { Observable } from 'rxjs/Observable';

import { injectDispatch } from "@reduxjs/angular-redux";
import { dataChange, menuChange, menuPresent } from "../../reducers";



// import { DataActions } from '../../actions/data-actions.ts.bak';
import { HttpgetService } from '../shared/httpget.service';
import { PlatformService } from '../shared/platform.service';
import { PrepareObj } from '../shared/prepareObjects.service';

import { TransferState } from '../../modules/transfer-state/transfer-state';


@Injectable()

export class CommonCalls {

    private subscriptionXHR: any;
    private dispatch = injectDispatch();

    constructor(
        private _httpgetService: HttpgetService,
        // public actions: DataActions,
        private _prepObj: PrepareObj,
        public platform: PlatformService,
        private _cache: TransferState,
        private _meta: Meta
    ) { }

    calls(url, reduxData, callback, seoCallback?) {

        if (this.platform.isServer()) {
            this.getDataFromService(url, true, undefined, seoCallback);
        } else {
            let resData = this._cache.get(url);
            if (resData) {
                callback(resData);
                this.dispatch(dataChange({ data: resData, position: url }));
            } else {
                reduxData.subscribe(
                    response => {
                        if (response.length > 0) {
                            callback(response);
                        } else {
                            this.getDataFromService(url, false, callback);
                        }
                    });
            }
        }
    }

    setMenu(resData) {
        const menuArray = resData.map(item => this._prepObj.formateTitle(item));
        this.dispatch(menuChange({ data: menuArray }));
        this.dispatch(menuPresent({ data: true }));
    }

    getDataFromService(url, server, callback?, seoCallback?) {
        this.subscriptionXHR = this._httpgetService.getApiData(url)
            .subscribe(response => {
                if (server) {
                    this._cache.set(url, response);
                    seoCallback(response);
                } else {
                    callback(response);
                    this.dispatch(dataChange({ data: response, position: url }));
                }
                if (this.subscriptionXHR) this.subscriptionXHR.unsubscribe();
            });
    }


}
