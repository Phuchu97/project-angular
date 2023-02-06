import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherShopRoutingModule } from './voucher-shop-routing.module';
import { VoucherShopComponent } from './voucher-shop.component';
import {ShareModule} from "../../shared/share.module";


@NgModule({
  declarations: [
    VoucherShopComponent
  ],
    imports: [
        CommonModule,
        VoucherShopRoutingModule,
        ShareModule
    ]
})
export class VoucherShopModule { }
