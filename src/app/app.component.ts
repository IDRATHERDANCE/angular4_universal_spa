import { Component, OnInit, ChangeDetectionStrategy,
  ChangeDetectorRef,
  StateKey
 } from '@angular/core';
import { Router } from '@angular/router';

import { fadeIn } from './shared/fadeIn.animation';
import { PlatformService } from './shared/platform.service';
import { CommonCalls } from './shared/commonCalls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeIn()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public isItSplashValue = true;
  public haveSubmenuFlag = false;
  public popIsUpFlag = false;
  public subMenuArray: Array<string> = [];
  public _workUrl: StateKey<string> = 'work' as StateKey<string>;

  constructor(
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    public platform: PlatformService,
    private _common: CommonCalls
  ) {

  }

  ngOnInit() {

    this._router.events.subscribe((event: any) => {
      if(event.type === 1) {
        this.isItSplashValue = event.url !== '/';
        this.haveSubmenuFlag = event.url.startsWith('/work');
        if (this.haveSubmenuFlag) {
          this._common.calls(this._workUrl, (response: any) => {
            this.subMenuArray = this._common.getMenu(response);
            this._changeDetectorRef.markForCheck();
          });
        }
      }
    });

    const routes: string[] = ['work', 'about', 'contact', 'splash'];
    routes.forEach((route: string) => {
      this._common.calls(route as StateKey<string>)
    });

    this.popIsUpFlag = false;

  }
}
