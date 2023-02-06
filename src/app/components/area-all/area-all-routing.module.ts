import { AreaAllComponent } from './area-all.component';
import { SmartMallComponent } from './../home/smart-mall/smart-mall.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:AreaAllComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaAllRoutingModule { }
