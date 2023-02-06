import { ShareModule } from './../../../shared/share.module';
import { TranslateModule } from '@ngx-translate/core';
import { FilterPriceComponent } from './filter-price.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FilterPriceComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ShareModule
  ],
  exports: [FilterPriceComponent],
})
export class FilterPriceModule { }
