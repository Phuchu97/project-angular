import { TranslateModule } from '@ngx-translate/core';
import { OrderByComponent } from './order-by.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [OrderByComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [OrderByComponent],
})
export class OrderByModule { }
