import { FilterCategoryComponent } from './filter-category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FilterCategoryComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [FilterCategoryComponent],
})
export class FilterCategoryModule { }
