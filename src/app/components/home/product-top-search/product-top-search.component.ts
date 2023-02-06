import { Component, Injector, OnInit } from '@angular/core';
import { CategoryStandardService } from 'src/app/services/category-standard.service';
import { ProductsService } from 'src/app/services/products.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { RouterConstants } from 'src/app/shared/common/router.constants';
import { CategoryProductFacadeService } from '../../category-product/service/category-product-facade.service';
import {SeoUrlPipe} from "../../../shared/pipes/seo-url.pipe";
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product-top-search',
  templateUrl: './product-top-search.component.html',
  styleUrls: ['./product-top-search.component.css']
})
export class ProductTopSearchComponent extends AppComponentBase  implements OnInit {
  page_number:number=1;
  page_size:number=30;
  productSearchHome:any;
  starRating = 0;
  routerConstant:typeof RouterConstants=RouterConstants;
  configSlideTopSearchProduct: SwiperOptions = {
    // slidesPerColumnFill: 'row',
    // slidesPerColumn: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 6
      },
      500: {
        slidesPerView: 2
      },
      400: {
        slidesPerView: 2
      },
      300: {
        slidesPerView: 2
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 20
  };
  constructor(
    private injector:Injector,private productService:ProductsService,
    private categoryStandardService:CategoryStandardService,
    private categoryProductFacadeService: CategoryProductFacadeService,
    public seoUrlPipe: SeoUrlPipe,
    ) {super(injector) }

  override ngOnInit(): void {
    this.loadProductAreaHome();
  }

  loadProductAreaHome()
  {
    this.productService.productSearchHome(this.lang,this.page_number,this.page_size).subscribe(rs=>{
      this.productSearchHome=rs.data.lists;
    })
  }
  public navigateItem(item:any) {
    const productUrl = this.seoUrlPipe.transform(item.name, item.product_id);
    window.location.href = `/${productUrl}`;
    //this.router.navigate([`${url}/${item.product_id}`]);
  }

}
