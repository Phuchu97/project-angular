import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchProductRoutingModule } from './search-product-routing.module';
import { SearchProductComponent } from './search-product.component';
import { ShareModule } from 'src/app/shared/share.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CategorySlideModule } from '../category-product/category-slide/category-slide.module';
import { OrderByModule } from '../category-product/order-by/order-by.module';
import { FilterPriceModule } from '../category-product/filter-price/filter-price.module';
import { FilterEvaluateModule } from '../category-product/filter-evaluate/filter-evaluate.module';
import { FilterTranformModule } from '../category-product/filter-tranform/filter-tranform.module';
import { FilterProvinceModule } from '../category-product/filter-province/filter-province.module';
import { FilterProductTypeModule } from '../category-product/filter-product-type/filter-product-type.module';
import { FilterRegionsModule } from '../category-product/filter-regions/filter-regions.module';


@NgModule({
  declarations: [SearchProductComponent
  ],
  imports: [
    CommonModule,
    SearchProductRoutingModule,
    ShareModule,
    FilterRegionsModule,
    FilterProductTypeModule,
    FilterProvinceModule,
    FilterTranformModule,
    FilterEvaluateModule,
    FilterPriceModule,
    OrderByModule,
    CategorySlideModule,
    InfiniteScrollModule

  ]
})
export class SearchProductModule { }
