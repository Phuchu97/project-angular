import { CategoryProductComponent } from './category-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailComponent} from "../product-detail/product-detail/product-detail.component";

const routes: Routes = [
  {
    path:':categoryId',
    component: CategoryProductComponent,
  },
  {
    path: ':categoryId/:productId',
    component: ProductDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryProductRoutingModule { }
