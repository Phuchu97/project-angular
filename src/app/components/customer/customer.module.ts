import { NotifyUpdateOrderComponent } from './notify-update-order/notify-update-order.component';
import { CustomerComponent } from './customer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import {BankComponent} from "./bank/bank.component";
import {InfoComponent} from "./info/info.component";
import {AddressComponent} from "./address/address.component";
import {ShareModule} from "../../shared/share.module";
import {CustomerLayoutComponent} from "./customer-layout/customer-layout.component";
import {CustomerMenuLeftComponent} from "./customer-menu-left/customer-menu-left.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import { AddressIoComponent } from './address/address-io/address-io.component';
import { CustomerVoucherComponent } from './customer-voucher/customer-voucher.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { NotifyUpdateSmartgapComponent } from './notify-update-smartgap/notify-update-smartgap.component';
import { NotifyPromotionComponent } from './notify-promotion/notify-promotion.component';
import { FavouriesShopComponent } from './favouries-shop/favouries-shop.component';
import { FavouriesProductComponent } from './favouries-product/favouries-product.component';

@NgModule({
  declarations: [
    CustomerLayoutComponent,
    CustomerMenuLeftComponent,
    CustomerComponent,
    BankComponent,
    InfoComponent,
    AddressComponent,
    ChangePasswordComponent,
    AddressIoComponent,
    CustomerVoucherComponent,
    CustomerOrderComponent,
    NotifyUpdateOrderComponent,
    NotifyUpdateSmartgapComponent,
    NotifyPromotionComponent,
    FavouriesShopComponent,
    FavouriesProductComponent
  ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ShareModule,
    ]
})
export class CustomerModule { }
