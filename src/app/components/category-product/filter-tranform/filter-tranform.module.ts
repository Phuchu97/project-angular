import { TranslateModule } from '@ngx-translate/core';
import { FilterTranformComponent } from './filter-tranform.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FilterTranformComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [FilterTranformComponent],
})
export class FilterTranformModule { }
