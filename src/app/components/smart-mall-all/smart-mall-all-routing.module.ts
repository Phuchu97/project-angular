import { SmartMallAllModule } from './smart-mall-all.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmartMallAllComponent } from './smart-mall-all.component';

const routes: Routes = [
  {
    path:'',
    component:SmartMallAllComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartMallAllRoutingModule { }
