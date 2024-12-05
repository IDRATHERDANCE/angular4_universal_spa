import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopUpInitComponent } from '../popup/popup.component';
import { ColumnsDirective } from '../column.directive/columns.directive';
import { MOCK_WINDOW, MockWindow } from '../shared/mock.window';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PopUpInitComponent,
    ColumnsDirective
  ],
  exports: [PopUpInitComponent, ColumnsDirective],
  providers: [{ provide: MOCK_WINDOW, useValue: MockWindow }]
})

export class SharedModule { }
