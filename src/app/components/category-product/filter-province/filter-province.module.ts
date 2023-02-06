import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterProvinceComponent } from './filter-province.component';



@NgModule({
  declarations: [FilterProvinceComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [FilterProvinceComponent],
})
export class FilterProvinceModule { }
