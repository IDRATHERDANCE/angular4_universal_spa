import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { NgRedux, select  } from '@angular-redux/store';
import reducer from '../reducers/index';
import { DataActions } from '../actions/data-actions';
import { enhancers } from '../store';
import  InitialState  from '../store/initial.state';
import { AppState } from '../store/state.interface';
// const createLogger = require('redux-logger');

import { fadeIn } from './shared/fadeIn.animation';
import { PlatformService } from './shared/platform.service';
import '../style/index.scss';

@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  animations: [fadeIn()]
})

export class AppComponent implements OnInit {
    
  @select(['applicationData', 'subMenu']) menuData$: Observable<any>;
  @select(['applicationData', 'menuPresent']) menuPresData$: Observable<any>;
  @select(['applicationData', 'popUp']) popUp$: Observable<any>; 

private isItWorkValue: Boolean;
public isItSplashValue: Boolean;
private _haveSubmenuFlag: Boolean = false;
private _popIsUpFlag: Boolean = false;
private _subMenuArray: Array<string>;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private _router: Router, 
    public actions: DataActions,
    private _changeDetectorRef: ChangeDetectorRef,
    public platform: PlatformService
  ) { 

    const middleware = [  /* createLogger() */ ];

   let checkEnh = this.platform.isServer() ? [] : enhancers;

    this.ngRedux.configureStore(reducer, InitialState, middleware, checkEnh); 
  
  }

  ngOnInit() {  
    
      this._router.events.subscribe( () => { 
          this.isItWorkValue = (this._router.url.indexOf('/work') > - 1) ? true : false;
          this.isItSplashValue = (this._router.url === '/' ) ? false : true;
          this._changeDetectorRef.detectChanges();
      });

      this.menuPresData$.subscribe( response => this._haveSubmenuFlag = !!response); 
      
      this.popUp$.subscribe(response => {
        this._popIsUpFlag = response
        this._changeDetectorRef.detectChanges();
      }); 

      this.menuData$.subscribe(response => {     
        this._subMenuArray = response
        this._changeDetectorRef.detectChanges();
      }); 

  }

}
