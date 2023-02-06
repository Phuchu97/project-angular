import { Router } from '@angular/router';
import { BannerSlideService } from './../../../services/banner-slide.service';
import { async } from '@angular/core/testing';
import { CategoryStandardService } from './../../../services/category-standard.service';
import { CartService } from './../../../services/cart.service';
import { MessengerService } from './../../../services/messenger.service';
import { ProductsService } from './../../../services/products.service';
import { Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { SwiperOptions } from 'swiper';
import { ProductItemCart } from 'src/app/viewModels/products/product-cart';
import { PositionBannerSlide } from 'src/app/shared/common/app.constants';
import { RouterConstants } from 'src/app/shared/common/router.constants';
import { SeoUrlPipe } from "../../../shared/pipes/seo-url.pipe";
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-smart-mall',
  templateUrl: './smart-mall.component.html',
  styleUrls: ['./smart-mall.component.css']
})
export class SmartMallComponent extends AppComponentBase implements OnInit {
  configSlideSmartMall: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    slidesPerView: 1
    ,
    spaceBetween: 20
  };

  config1: SwiperOptions = {
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    slidesPerView: auto,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    direction: 'horizontal',
    preventClicks: true,
    spaceBetween: 30,
    loop:true,
    loopedSlides: 2,
    speed: 900,
    watchOverflow: true,
    scrollbar: { draggable: true },
    slideToClickedSlide: false,
    touchRatio: 0.2,
    centeredSlides: true,
    allowSlidePrev: false,
    allowSlideNext: true,
    allowTouchMove: true
  };

  configProductSmartMall: SwiperOptions = {
    slidesPerColumnFill: 'row',
    slidesPerColumn: 2,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 4
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
      nextEl: '.swiper-button-next-smart-mall',
      prevEl: '.swiper-button-prev-smart-mall'
    },
    spaceBetween: 20
  };


  routerConstant: typeof RouterConstants = RouterConstants;
  page_number: number = 1;
  page_size: number = 30;
  productSmartMallHome: any[] = [];
  starRating = 0;
  standarName: string;
  productItemCart: ProductItemCart = new ProductItemCart();
  positionBannerSlide: typeof PositionBannerSlide = PositionBannerSlide;
  arrStandard: [] = [];
  listBannerSlide: any;
  url = '';
  listMapfix: any[] = [
    { name: 'buoi-da-xanh-dong-cao', product_id: 1 },
    { name: 'vai-thieu-bac-giang', product_id: 2 },
    { name: 'vai-thieu-bac-giangvai-ngot', product_id: 5 },
  ]

  constructor(
    private injector: Injector, private productService: ProductsService,
    private categoryStandardService: CategoryStandardService,
    private cartService: CartService,
    private bannerService: BannerSlideService,
    private router: Router,
    public seoUrlPipe: SeoUrlPipe,
  ) {
    super(injector)
  }

  override ngOnInit(): void {
    this.loadProductSmartMallHome();
    this.getSlideSmartMall();
    // this.loadProductSmartMallHomeReal();
  }

  loadProductSmartMallHome() {
    this.productService.productSmartMallHome(this.lang, "", this.page_number, this.page_size).subscribe(rs => {
      this.productSmartMallHome = rs.data.lists;
      
    })
  }

  loadProductSmartMallHomeReal() {
    this.productService.productSmartMallHomeReal("", this.page_number, this.page_size).subscribe(rs => {
      this.productSmartMallHome = rs.data.lists.filter(obj => obj.url_file !== null || obj.url_avatar !== null);
    })
  }

  getCategoryStandard(id: number): string {
    this.categoryStandardService.categoryStandardByID(id).subscribe(rs => {
      this.standarName = rs.data.name;
    })
    return this.standarName;
  }

  getSlideSmartMall() {
    this.bannerService.getBannerSlideHome(this.positionBannerSlide.SlideSmartMall).subscribe(rs => {
      this.listBannerSlide = rs.data[0].files[0];
      this.url = rs.data[0].url
    })
  }

  // @ts-ignore
  public navigateItem(item): string {
    //category_product_id
    let productUrl: any
    if ((item?.name_copy)) {
      productUrl = this.seoUrlPipe.transform(item.name_copy, item.product_id_copy);
    }
    else {
      productUrl = this.seoUrlPipe.transform(item.name, item.product_id);
    }

    window.location.href = `/${productUrl}`
    //this.router.navigate([`${url}/${item.product_id}`]);
  }

  public listStandard(item: any) {
    return item.splice(0, 1);
  }

}
