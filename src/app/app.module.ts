import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { TransferState } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubMenuComponent } from './submenu/subMenu.component';
import { MenuComponent } from './menu/menu.component';
import { SubMenuPrettyPipe } from './shared/submenuPretty.pipe';
import { HttpgetService } from './shared/httpget.service';
import { TopService } from './shared/top.service';
import { PlatformService } from './shared/platform.service';
import { CommonCalls } from './shared/commonCalls.service';
import { PrepareObj } from './shared/prepareObjects.service';
import { MetaService } from './shared/headMeta.service';
import { RemoveEmptyLines } from './shared/removeEmptyLines.service';
import { PrepareMeta } from './shared/prepare.meta.service';
import { ResizeWindow } from './shared/resize.service';
import { CssClassesHelper } from './shared/cssClassesHelper.service';
import { MOCK_WINDOW, MockWindow } from './shared/mock.window';

@NgModule({
  declarations: [
    AppComponent,
    SubMenuComponent,
    MenuComponent,
    SubMenuPrettyPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    TransferState,
    provideHttpClient(),
    provideAnimations(),
    provideClientHydration(),
    HttpgetService,
    TopService,
    PlatformService,
    CommonCalls,
    PrepareObj,
    MetaService,
    RemoveEmptyLines,
    PrepareMeta,
    ResizeWindow,
    CssClassesHelper,
    { provide: MOCK_WINDOW, useValue: MockWindow }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
