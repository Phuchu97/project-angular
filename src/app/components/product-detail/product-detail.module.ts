import { NgModule } from '@angular/core';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import {ShareModule} from "../../shared/share.module";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {CountdownModule} from "ngx-countdown";
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    ShareModule,
    CountdownModule,
    ProductDetailRoutingModule,
    NgxImageZoomModule,
    SlickCarouselModule
  ]
})
export class ProductDetailModule { }
