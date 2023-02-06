import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news.component';

const routes: Routes = [
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'newsdetail/:id',
    component: NewsDetailComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
