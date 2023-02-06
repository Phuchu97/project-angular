import { Component, Injector, OnInit } from '@angular/core';
import { BannerSlideService } from 'src/app/services/banner-slide.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { PositionBannerSlide } from 'src/app/shared/common/app.constants';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-banner-center-home',
  templateUrl: './banner-center-home.component.html',
  styleUrls: ['./banner-center-home.component.css']
})
export class BannerCenterHomeComponent extends AppComponentBase implements OnInit {
  config: SwiperOptions = {
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: false
    },
    navigation: {
      // nextEl: '.swiper-button-next2',
      // prevEl: '.swiper-button-prev2'
    },
    spaceBetween: 30
  };
  config2: SwiperOptions = {
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: false
    },
    navigation: {
      // nextEl: '.swiper-button-next',
      // prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  config3: SwiperOptions = {
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: false
    },
    navigation: {
      // nextEl: '.swiper-button-next3',
      // prevEl: '.swiper-button-prev3',
    },
    spaceBetween: 30
  };
  url = '';
  bannerCenterHome: any;
  loading = true;
  positionBannerSlide: typeof PositionBannerSlide = PositionBannerSlide;
  constructor(private injector: Injector, private bannerService: BannerSlideService) { super(injector) }

  mobileStatus = false;
  override ngOnInit(): void {
    this.getBannerCenterHome();
    this.getBannerCenterHome2();
    this.getBannerCenterHome3();
    if (window.innerWidth < 500) {
      this.mobileStatus = true;
    }else{
      this.mobileStatus = false;
    }
  }

  getBannerCenterHome() {

    this.bannerService.getBannerSlideHome(this.positionBannerSlide.SlideTopRightDown).subscribe(rs => {
      this.bannerCenterHome = rs.data[0];
      this.url = rs.data[0].url
      this.loading = false;
    })
  }

  bannerCenterHome2: any;
  url2: any;
  getBannerCenterHome2() {

    this.bannerService.getBannerSlideHome(this.positionBannerSlide.BannerCenterHome).subscribe(rs => {
      this.bannerCenterHome2 = rs.data[0]?.files;
      this.url2 = rs.data[0].url
    })
  }

  bannerCenterHome3: any;
  url3: any;
  getBannerCenterHome3() {
    this.bannerService.getBannerSlideHome(this.positionBannerSlide.BannerCenterHomeX2).subscribe(rs => {
      this.bannerCenterHome3 = rs.data[0].files;
      this.url3 = rs.data[0].url
    })
  }
}

