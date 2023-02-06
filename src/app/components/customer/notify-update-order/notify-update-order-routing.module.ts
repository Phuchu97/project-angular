import { NotifyUpdateOrderComponent } from './notify-update-order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:NotifyUpdateOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotifyUpdateOrderRoutingModule { }
