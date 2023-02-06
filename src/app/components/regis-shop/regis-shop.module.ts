import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisShopRoutingModule } from './regis-shop-routing.module';
import {ShareModule} from "../../shared/share.module";
import {RegisShopComponent} from "./regis-shop.component";


@NgModule({
  declarations: [
    RegisShopComponent
  ],
  imports: [
    CommonModule,
    RegisShopRoutingModule,
    ShareModule
  ]
})
export class RegisShopModule { }
