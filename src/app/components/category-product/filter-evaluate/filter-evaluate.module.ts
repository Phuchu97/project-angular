import { TranslateModule } from '@ngx-translate/core';
import { FilterEvaluateComponent } from './filter-evaluate.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FilterEvaluateComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [FilterEvaluateComponent],
})
export class FilterEvaluateModule { }
