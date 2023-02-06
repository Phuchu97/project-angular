import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopSearchProductComponent } from './top-search-product.component';

const routes: Routes = [
  {
    path:'',
    component:TopSearchProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductTopSeachRoutingModule { }
