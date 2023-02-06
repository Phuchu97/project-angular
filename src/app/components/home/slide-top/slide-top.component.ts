import { BannerSlideService } from './../../../services/banner-slide.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PositionBannerSlide } from 'src/app/shared/common/app.constants';
import { SwiperOptions } from 'swiper';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { auto } from '@popperjs/core';
import { SwiperComponent } from 'ngx-useful-swiper';

@Component({
  selector: 'slide-top',
  templateUrl: './slide-top.component.html',
  styleUrls: ['./slide-top.component.scss']
})
export class SlideTopComponent extends AppComponentBase implements OnInit {
  @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
  config1: SwiperOptions = {
    autoplay: true,
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true
    // },
    //navigation: true,
    slidesPerView: auto,
    breakpoints: {
      1024: {
        slidesPerView: 1
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      //disabledClass:'.swiper-button-disabled'
    },

    direction: 'horizontal',
    preventClicks: true,
    spaceBetween: 30,
    loopedSlides: 2,
    speed: 900,
    watchOverflow: true,
    scrollbar: { draggable: true },
    slideToClickedSlide: false,
    touchRatio: 0.2,
    centeredSlides: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  config2: SwiperOptions = {
    autoplay: true,
    // navigation: {
    //   nextEl: '.swiper-button-next2',
    //   prevEl: '.swiper-button-prev2',      
    // },
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    scrollbar: true
  };

  mobileStatus = false;
  url = '';

  listBannerSlide: any;
  positionBannerSlide: typeof PositionBannerSlide = PositionBannerSlide;
  constructor(private injector: Injector, private bannerService: BannerSlideService) {
    super(injector)
  }
  override ngOnInit(): void {
    this.getSlideTop();
    this.getSlideTop2();
    if (window.innerWidth < 500) {
      this.mobileStatus = true;
    }else{
      this.mobileStatus = false;
    }
  }

  getSlideTop() {
    this.bannerService.getBannerSlideHome(this.positionBannerSlide.SlideTop).subscribe(rs => {
      this.listBannerSlide = rs.data[0].files;
      this.url = rs.data[0].url
    })
  }
  listSlideTop2: any;
  url2: any;
  getSlideTop2() {

    this.bannerService.getBannerSlideHome(this.positionBannerSlide.SlideTopRightUp).subscribe(rs => {
      this.listSlideTop2 = rs.data[0].files;
      this.url2 = rs.data[0].url
    })
  }

  returnFirstImage(event: any) {
    if (this.listBannerSlide.length - (this.usefulSwiper.swiper.activeIndex + 1) == 1) {      
      setTimeout(() => this.usefulSwiper.swiper.slideTo(0))
    }
  }

}
