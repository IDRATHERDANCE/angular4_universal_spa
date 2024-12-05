import { Component, Input, ChangeDetectionStrategy, OnChanges, Inject } from '@angular/core';
import { TopService } from '../shared/top.service';


import { fadeIn } from '../shared/fadeIn.animation';


@Component({
  selector: 'menu',// tslint:disable-line
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
  animations: [fadeIn()],
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class MenuComponent implements OnChanges {

  @Input() subMenuArray: Array<string> = [];
  @Input() popIsUpFlag = false;
  @Input() isItSplashValue = true;
  @Input() haveSubmenuFlag = false;

  public maxHeight = '0';
  public top = '0';

  constructor(@Inject(TopService) public topService: TopService) {

  }

  ngOnChanges() {
    const fire = this.topService.isFirefox();
    const subs = this.subMenuArray ? this.subMenuArray.length : 5;
    const calcHeight = fire ? (subs * 1.77) + 1 : subs * 1.77;
    const upOrDown = this.haveSubmenuFlag;

    this.maxHeight = upOrDown ? calcHeight + 'rem' : '0rem';
    const calcTop = fire ? (subs * 1.77) + 2.5 : (subs * 1.77) + 1.5;
    this.top = upOrDown ? calcTop + 'rem' : '1.3rem';
  }

}
