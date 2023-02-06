import { SmartMallComponent } from './smart-mall/smart-mall.component';
import { CategoryProductHomeComponent } from './category-product-home/category-product-home.component';
import { LinkCatalogsComponent } from './link-catalogs/link-catalogs.component';
import { SlideTopComponent } from './slide-top/slide-top.component';
import { HomeComponent } from './home.component';
import { ShareModule } from './../../shared/share.module';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { ProductAreaComponent } from './product-area/product-area.component';
import { ProductAreaListComponent } from './product-area/product-area-list/product-area-list.component';
import { ProductTopSearchComponent } from './product-top-search/product-top-search.component';
import {CommonModule} from "@angular/common";
import { SuggetTodayComponent } from './sugget-today/sugget-today.component';
import { BannerCenterHomeComponent } from './banner-center-home/banner-center-home.component';
import { BannerCenterX2Component } from './banner-center-x2/banner-center-x2.component';
import { FlashSaleComponent } from './flash-sale/flash-sale.component';

@NgModule({
  declarations: [HomeComponent,SlideTopComponent,LinkCatalogsComponent,CategoryProductHomeComponent,
    SmartMallComponent,ProductAreaComponent, ProductAreaListComponent, ProductTopSearchComponent, SuggetTodayComponent, BannerCenterHomeComponent, BannerCenterX2Component, FlashSaleComponent
  ],
    imports: [
      CommonModule,
        HomeRoutingModule,
        ShareModule
    ]
})
export class HomeModule { }
