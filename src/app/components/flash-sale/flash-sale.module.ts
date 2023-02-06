import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashSaleRoutingModule } from './flash-sale-routing.module';
import { ShareModule } from 'src/app/shared/share.module';
import { FlashSaleComponent } from './flash-sale.component';


@NgModule({
  declarations: [FlashSaleComponent],
  imports: [
    CommonModule,
    FlashSaleRoutingModule,
    ShareModule,
  ]
})
export class FlashSaleModule { }
