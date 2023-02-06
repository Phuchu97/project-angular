import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifyUpdateOrderRoutingModule } from './notify-update-order-routing.module';
import { NotifyUpdateOrderComponent } from './notify-update-order.component';


@NgModule({
  declarations: [
    NotifyUpdateOrderComponent
  ],
  imports: [
    CommonModule,
    NotifyUpdateOrderRoutingModule
  ]
})
export class NotifyUpdateOrderModule { }
