import { TranslateModule } from '@ngx-translate/core';
import { FilterRegionsComponent } from './filter-regions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FilterRegionsComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
 exports: [FilterRegionsComponent],
})
export class FilterRegionsModule { }
