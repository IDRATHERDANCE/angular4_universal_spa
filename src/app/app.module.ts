import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';

import { RouteReuseStrategy } from "@angular/router";
import { CustomReuseStrategy } from "./shared/customReuseStrategy";

// import { NgReduxModule, DevToolsExtension } from '@angular-redux/store';
// import { DataActions } from '../actions/data-actions.ts.bak';

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
import { SplashModule } from './splash/splash.module';
import { WorkModule } from './work/work.module';
import { NewsModule } from './news/news.module';
import { PressModule } from './press/press.module';
import { ExhibitionsModule } from './exhibitions/exhibitions.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';

@NgModule({
  imports: [
    BrowserModule,

    // NgReduxModule,
    RouterModule.forRoot([
      { path: '', component: SplashModule },
      { path: 'work', component: WorkModule },
      { path: 'news', component: NewsModule },
      { path: 'press', component: PressModule },
      { path: 'exhibitions', component: ExhibitionsModule },
      { path: 'about', component: AboutModule },
      { path: 'contact', component: ContactModule }
    ])
  ],
  declarations: [
    AppComponent,
    SubMenuComponent,
    MenuComponent,
    SubMenuPrettyPipe
  ],
  providers: [
    provideHttpClient(),
    HttpgetService,
    TopService,
    // DevToolsExtension,
    // DataActions,
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
  exports: [AppComponent]
})
export class AppModule { }
