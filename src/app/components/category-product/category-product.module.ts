import { CategorySlideModule } from './category-slide/category-slide.module';
import { OrderByModule } from './order-by/order-by.module';
import { FilterPriceModule } from './filter-price/filter-price.module';
import { FilterEvaluateModule } from './filter-evaluate/filter-evaluate.module';
import { FilterTranformModule } from './filter-tranform/filter-tranform.module';
import { FilterProvinceModule } from './filter-province/filter-province.module';
import { FilterProductTypeModule } from './filter-product-type/filter-product-type.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryProductRoutingModule } from './category-product-routing.module';
import { CategoryProductComponent } from './category-product.component';

import {ShareModule} from "../../shared/share.module";
import { FilterRegionsModule } from './filter-regions/filter-regions.module';

@NgModule({
  declarations: [
    CategoryProductComponent,
    //FilterCategoryComponent,
    // FilterRegionsComponent,
    // FilterProductTypeComponent,
    // FilterProvinceComponent,
    // FilterTranformComponent,
    // FilterEvaluateComponent,
    // FilterPriceComponent,
    // OrderByComponent,
    // CategorySlideComponent
  ],
  imports: [
    ShareModule,
    CommonModule,
    CategoryProductRoutingModule,
    FilterRegionsModule,
    FilterProductTypeModule,
    FilterProvinceModule,
    FilterTranformModule,
    FilterEvaluateModule,
    FilterPriceModule,
    OrderByModule,
    CategorySlideModule,
  ]
})
export class CategoryProductModule { }
