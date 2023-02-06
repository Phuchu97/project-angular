import { TranslateModule } from '@ngx-translate/core';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import { CategorySlideComponent } from './category-slide.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [CategorySlideComponent],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule,
    TranslateModule

  ],
  exports:[CategorySlideComponent]
})
export class CategorySlideModule { }
