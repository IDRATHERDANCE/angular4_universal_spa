import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

// import { Observable } from 'rxjs/Observable';

// import { NgRedux, select } from '@angular-redux/store';
// import reducer from '../reducers/index';
// import { DataActions } from '../actions/data-actions';
import { enhancers } from '../store';
import InitialState from '../store/initial.state';

// const logger = require('redux-logger');

import { fadeIn } from './shared/fadeIn.animation';
import { PlatformService } from './shared/platform.service';
import '../style/index.scss';

import { injectSelector } from "@reduxjs/angular-redux";
import { AppState } from '../store/state.interface';

@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  animations: [fadeIn()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

  // @select(['applicationData', 'subMenu']) menuData$: Observable<any>;
  // @select(['applicationData', 'menuPresent']) menuPresData$: Observable<any>;
  // @select(['applicationData', 'popUp']) popUp$: Observable<any>;


  private subMenu = injectSelector((state: AppState) => state.applicationData.subMenu);
  private menuPresent = injectSelector((state: AppState) => state.applicationData.menuPresent);
  private popUp = injectSelector((state: AppState) => state.applicationData.popUp);

  public isItWorkValue: Boolean;
  public isItSplashValue: Boolean;
  public haveSubmenuFlag: Boolean = false;
  public popIsUpFlag: Boolean = false;
  public subMenuArray: Array<string>;
  private _InitialState: any;

  constructor(
    // private ngRedux: NgRedux<AppState>,
    private _router: Router,
    // public actions: DataActions,
    private _changeDetectorRef: ChangeDetectorRef,
    public platform: PlatformService
  ) {

    // const middleware = [   /* logger.createLogger() */];

    // let checkEnh = this.platform.isServer() ? [] : enhancers;
    // this._InitialState = InitialState;
    // if (!this.platform.isServer()) {
    //   const currentStorage = window.sessionStorage.getItem('__anarajcevic.com__');
    //   if (currentStorage) this._InitialState = JSON.parse(currentStorage);
    // }

    // this.ngRedux.configureStore(reducer, this._InitialState, middleware, checkEnh);

  }

  ngOnInit() {

    // this._router.events.subscribe(() => {
    //   this.isItWorkValue = (this._router.url.indexOf('/work') > - 1) ? true : false;
    //   this.isItSplashValue = (this._router.url === '/') ? false : true;
    //   this._changeDetectorRef.detectChanges();
    // });


    // this.haveSubmenuFlag = this.menuPresent();
    // this.popIsUpFlag = this.popUp();
    // this.subMenuArray = this.subMenu();

    // this._changeDetectorRef.detectChanges();

  }

}
