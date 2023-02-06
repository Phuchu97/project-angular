import { ProductStandardComponent } from './product-standard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductStandardRoutingModule } from './product-standard-routing.module';
import { ShareModule } from 'src/app/shared/share.module';
import { FilterRegionsModule } from '../category-product/filter-regions/filter-regions.module';
import { FilterProductTypeModule } from '../category-product/filter-product-type/filter-product-type.module';
import { FilterProvinceModule } from '../category-product/filter-province/filter-province.module';
import { FilterTranformModule } from '../category-product/filter-tranform/filter-tranform.module';
import { FilterEvaluateModule } from '../category-product/filter-evaluate/filter-evaluate.module';
import { FilterPriceModule } from '../category-product/filter-price/filter-price.module';
import { OrderByModule } from '../category-product/order-by/order-by.module';
import { CategorySlideModule } from '../category-product/category-slide/category-slide.module';
import { FilterCategoryModule } from '../category-product/filter-category/filter-category.module';

@NgModule({
  declarations: [ProductStandardComponent],
  imports: [
    CommonModule,
    ProductStandardRoutingModule,
    ShareModule,
    FilterRegionsModule,
    FilterProductTypeModule,
    FilterProvinceModule,
    FilterTranformModule,
    FilterEvaluateModule,
    FilterPriceModule,
    OrderByModule,
    CategorySlideModule,
    FilterCategoryModule,
  ]
})
export class ProductStandardModule { }
