import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'submenu',
    styleUrls: ['./submenu.component.scss'],
    templateUrl: './submenu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SubMenuComponent {

    @Input() menuData: Array<string> = [];

    constructor(private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    }
}
