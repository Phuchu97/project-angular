import { NotifyPromotionComponent } from './notify-promotion/notify-promotion.component';
import { NotifyUpdateSmartgapComponent } from './notify-update-smartgap/notify-update-smartgap.component';
import { NotifyUpdateOrderComponent } from './notify-update-order/notify-update-order.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { CustomerVoucherComponent } from './customer-voucher/customer-voucher.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddressComponent} from "./address/address.component";
import {BankComponent} from "./bank/bank.component";
import {InfoComponent} from "./info/info.component";
import {RouterConstants} from "../../shared/common/router.constants";
import {CustomerLayoutComponent} from "./customer-layout/customer-layout.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {FavouriesProductComponent} from "./favouries-product/favouries-product.component";
import {FavouriesShopComponent} from "./favouries-shop/favouries-shop.component";

const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      {
        path: RouterConstants.address,
        component: AddressComponent
      },
      {
        path: RouterConstants.bank,
        component: BankComponent
      },
      {
        path: RouterConstants.info,
        component: InfoComponent
      },
      {
        path: RouterConstants.change_password,
        component: ChangePasswordComponent
      },
      {
        path: RouterConstants.voucher,
        component: CustomerVoucherComponent
      },
      {
        path: RouterConstants.customer_order,
        component: CustomerOrderComponent
      },
      {
        path: RouterConstants.notify_update_order,
        component: NotifyUpdateOrderComponent
      },
      {
        path: RouterConstants.notify_update_smartgap,
        component: NotifyUpdateSmartgapComponent
      },
      {
        path: RouterConstants.notify_promotion,
        component: NotifyPromotionComponent
      },
      {
        path: RouterConstants.favouries_product,
        component: FavouriesProductComponent
      },
      {
        path: RouterConstants.favouries_shop,
        component: FavouriesShopComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
