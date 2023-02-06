import { AreaAllComponent } from './area-all.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaAllRoutingModule } from './area-all-routing.module';
import { SmartMallAllRoutingModule } from '../smart-mall-all/smart-mall-all-routing.module';
import { FilterRegionsModule } from '../category-product/filter-regions/filter-regions.module';
import { FilterProductTypeModule } from '../category-product/filter-product-type/filter-product-type.module';
import { FilterProvinceModule } from '../category-product/filter-province/filter-province.module';
import { FilterTranformModule } from '../category-product/filter-tranform/filter-tranform.module';
import { FilterEvaluateModule } from '../category-product/filter-evaluate/filter-evaluate.module';
import { FilterPriceModule } from '../category-product/filter-price/filter-price.module';
import { OrderByModule } from '../category-product/order-by/order-by.module';
import { CategorySlideModule } from '../category-product/category-slide/category-slide.module';
import { ShareModule } from 'src/app/shared/share.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [AreaAllComponent],
  imports: [
    CommonModule,
    AreaAllRoutingModule,
    ShareModule,
    SmartMallAllRoutingModule,
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
export class AreaAllModule { }
