import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { RouterConstants } from 'src/app/shared/common/router.constants';
import {SeoUrlPipe} from "../../../pipes/seo-url.pipe";

@Component({
  selector: 'site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent  extends AppComponentBase implements  OnInit {
  categoryProduct:any;
  constructor(
    private injector:Injector,
    private categoryService:CategoryProductService,
    private router: Router,
    public seoUrlPipe: SeoUrlPipe,
  ) {  super(injector)}


  override ngOnInit() {
    this.showCategoryProduct();
  }
  showCategoryProduct() {
    let lang = this.translate.currentLang;
    this.categoryService.getListCategoryProductMenu(lang).subscribe(rs => {
      this.categoryProduct = rs.data;
    })
  }

  // @ts-ignore
  public navigateItem(item) {
    const categoryUrl = this.seoUrlPipe.transform(item.name, item.id);
    window.location.href = `${RouterConstants.chuyen_muc}/${categoryUrl}`;
  }

}
