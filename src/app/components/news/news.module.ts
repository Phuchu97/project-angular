import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { ShareModule } from 'src/app/shared/share.module';
import { CategoryProductRoutingModule } from '../category-product/category-product-routing.module';
import { FilterRegionsModule } from '../category-product/filter-regions/filter-regions.module';
import { FilterProductTypeModule } from '../category-product/filter-product-type/filter-product-type.module';
import { FilterProvinceModule } from '../category-product/filter-province/filter-province.module';
import { FilterTranformModule } from '../category-product/filter-tranform/filter-tranform.module';
import { FilterEvaluateModule } from '../category-product/filter-evaluate/filter-evaluate.module';
import { FilterPriceModule } from '../category-product/filter-price/filter-price.module';
import { OrderByModule } from '../category-product/order-by/order-by.module';
import { CategorySlideModule } from '../category-product/category-slide/category-slide.module';
import { NewsDetailComponent } from './news-detail/news-detail.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsDetailComponent
  ],
  imports: [
    ShareModule,
    CommonModule,
    NewsRoutingModule,
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
export class NewsModule { }