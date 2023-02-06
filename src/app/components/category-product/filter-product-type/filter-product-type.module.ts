import { TranslateModule } from '@ngx-translate/core';
import { FilterProductTypeComponent } from './filter-product-type.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FilterProductTypeComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [FilterProductTypeComponent],
})
export class FilterProductTypeModule { }
