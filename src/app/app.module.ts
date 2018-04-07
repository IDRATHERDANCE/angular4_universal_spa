import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';

import { RouteReuseStrategy } from "@angular/router";
import { CustomReuseStrategy } from "./shared/customReuseStrategy";

import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { DataActions } from '../actions/data-actions';

import { SubMenuComponent } from './submenu/subMenu.component';
import { MenuComponent } from './menu/menu.component';

import { HttpgetService } from './shared/httpget.service';
import { TopService } from './shared/top.service';
import { PlatformService } from './shared/platform.service';
import { CommonCalls } from './shared/commonCalls.service';
import { PrepareObj } from './shared/prepareObjects.service';
import { MetaService } from './shared/headMeta.service';
import { RemoveEmptyLines } from './shared/removeEmptyLines.service';
import { PrepareMeta } from './shared/prepare.meta.service';
import { MOCK_WINDOW, MockWindow } from './shared/mock.window';
import { ResizeWindow } from './shared/resize.service';
import { CssClassesHelper } from './shared/cssClassesHelper.service';
import { SubMenuPrettyPipe } from './shared/submenuPretty.pipe';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    NgReduxModule,
    RouterModule.forRoot([
      { path: '', loadChildren: './splash/splash.module#SplashModule'},
      { path: 'work', loadChildren: './work/work.module#WorkModule'},
      { path: 'news', loadChildren: './news/news.module#NewsModule'},
      { path: 'press', loadChildren: './press/press.module#PressModule'},
      { path: 'exhibitions', loadChildren: './exhibitions/exhibitions.module#ExhibitionsModule'},
      { path: 'about', loadChildren: './about/about.module#AboutModule'},
      { path: 'contact', loadChildren: './contact/contact.module#ContactModule'}
    ])
  ],
  declarations: [
    AppComponent,
    SubMenuComponent,
    MenuComponent,
    SubMenuPrettyPipe
  ],
  providers: [
    HttpgetService,
    TopService,
    DevToolsExtension,
    DataActions,
    PlatformService,
    CommonCalls,
    PrepareObj,
    MetaService,
    RemoveEmptyLines,
    PrepareMeta,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    },
    ResizeWindow,
    CssClassesHelper,
    { provide: MOCK_WINDOW, useValue: MockWindow }
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
