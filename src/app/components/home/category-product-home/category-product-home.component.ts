import { Component, Injector, OnInit } from '@angular/core';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { SwiperOptions } from 'swiper';
import {Route, Router} from "@angular/router";
import {RouterConstants} from "../../../shared/common/router.constants";
import {SeoUrlPipe} from "../../../shared/pipes/seo-url.pipe";

@Component({
  selector: 'app-category-product-home',
  templateUrl: './category-product-home.component.html',
  styleUrls: ['./category-product-home.component.css']
})
export class CategoryProductHomeComponent extends AppComponentBase implements OnInit {
  configCategoryProduct:SwiperOptions = {
    slidesPerColumnFill: 'row',
    slidesPerColumn: 2,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 9
      },
      820: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 4
      },
      540: {
        slidesPerView: 3.5
      },
      500: {
        slidesPerView: 4
      },
      400: {
        slidesPerView: 2.25
      },
      370: {
        slidesPerView: 2
      },
      360: {
        slidesPerView: 1.8
      },
      350: {
        slidesPerView: 2
      },
      300: {
        slidesPerView: 2
      },
      200: {
        slidesPerView: 1.5
      }
    },
    navigation: {
      nextEl: '.swiper-button-next-category-product',
      prevEl: '.swiper-button-prev-category-product'
    },

  };
  categoryProduct:any;
  constructor(
    private injector:Injector,
    private categoryService:CategoryProductService,
    private router: Router,
    public seoUrlPipe: SeoUrlPipe,
  ) {  super(injector)}

  override ngOnInit(): void {
    this.showCategoryProduct();
  }
  showCategoryProduct(){
    let lang =this.translate.currentLang;
    this.categoryService.getCategoryProductShowHome(lang).subscribe(rs=>{
      this.categoryProduct=rs.data;
    })
  }

  // @ts-ignore
  // public navigate(item) {
  //   this.router.navigate([`${RouterConstants.chuyen_muc}/${item.id}`]);
  // }
  public navigateItem(item):string {
    const categorytUrl = this.seoUrlPipe.transform(item.name, item.id);
    window.location.href = `${RouterConstants.chuyen_muc}/${categorytUrl}`;
    // return `${RouterConstants.chuyen_muc}/${categorytUrl}`;
  }
}
