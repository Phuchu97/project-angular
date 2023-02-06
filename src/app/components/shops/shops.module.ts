import { ShopsComponent } from './shops.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopBannerComponent } from './shop-banner/shop-banner.component';
import { ShopInfoComponent } from './shop-info/shop-info.component';
import { ShopProductComponent } from './shop-product/shop-product.component';

import { ShopDiscountComponent } from './shop-discount/shop-discount.component';
import { ShopIntroductComponent } from './shop-introduct/shop-introduct.component';
import {ShareModule} from "../../shared/share.module";
import { FilterRegionsModule } from '../category-product/filter-regions/filter-regions.module';
import { FilterProductTypeModule } from '../category-product/filter-product-type/filter-product-type.module';
import { FilterProvinceModule } from '../category-product/filter-province/filter-province.module';
import { FilterPriceModule } from '../category-product/filter-price/filter-price.module';
import { OrderByModule } from '../category-product/order-by/order-by.module';
import { FilterEvaluateModule } from '../category-product/filter-evaluate/filter-evaluate.module';
import { FilterTranformModule } from '../category-product/filter-tranform/filter-tranform.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterCategoryModule } from '../category-product/filter-category/filter-category.module';
import { ProductionDiagramComponent } from './production-diagram/production-diagram.component';
import { ShopPartnerComponent } from './shop-partner/shop-partner.component';
import { ShopMaterialComponent } from './shop-material/shop-material.component';
import { ShopAreaSalesComponent } from './shop-area-sales/shop-area-sales.component';
import { ShopMapComponent } from './shop-map/shop-map.component';


@NgModule({
  declarations: [
    ShopBannerComponent,
    ShopsComponent,
    ShopInfoComponent,
    ShopProductComponent,
    ShopDiscountComponent,
    ShopIntroductComponent,
    ProductionDiagramComponent,
    ShopPartnerComponent,
    ShopMaterialComponent,
    ShopAreaSalesComponent,
    ShopMapComponent,
  ],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    ShareModule,
    FilterRegionsModule,
    FilterProductTypeModule,
    FilterProvinceModule,
    FilterTranformModule,
    FilterEvaluateModule,
    FilterPriceModule,
    FilterCategoryModule,
    OrderByModule,
    InfiniteScrollModule
  ]
})
export class ShopsModule { }
