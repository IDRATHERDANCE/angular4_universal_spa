import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopUpInitComponent } from './popup/popup.component';
import { ColumnsDirective } from './column.directive/columns.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PopUpInitComponent,
    ColumnsDirective
  ],
  exports: [PopUpInitComponent, ColumnsDirective]
})

export class SharedModule {}