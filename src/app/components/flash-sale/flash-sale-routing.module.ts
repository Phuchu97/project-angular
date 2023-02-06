
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashSaleComponent } from './flash-sale.component';

const routes: Routes = [
  {
    path:'',
    component:FlashSaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashSaleRoutingModule { }
