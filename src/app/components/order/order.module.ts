import { ShareModule } from '../../shared/share.module';
import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import {OrderComponent} from "./order.component";
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import {PaymentDialogComponent} from "./payment-dialog/payment-dialog.component";
import {VoucherDialogComponent} from "./voucher-dialog/voucher-dialog.component";
import {ShippingDialogComponent} from "./shipping-dialog/shipping-dialog.component";
import { VoucherDetailComponent } from './voucher-dialog/voucher-detail/voucher-detail.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';


@NgModule({
  declarations: [
    OrderComponent,
    AddressDialogComponent,
    VoucherDialogComponent,
    ShippingDialogComponent,
    PaymentDialogComponent,
    VoucherDetailComponent,
    PaymentInfoComponent
  ],
  imports: [
    OrderRoutingModule,
    ShareModule,
  ]
})
export class OrderModule { }
