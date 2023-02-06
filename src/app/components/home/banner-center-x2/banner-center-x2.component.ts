import { Component, Injector, OnInit } from '@angular/core';
import { BannerSlideService } from 'src/app/services/banner-slide.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { PositionBannerSlide } from 'src/app/shared/common/app.constants';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-banner-center-x2',
  templateUrl: './banner-center-x2.component.html',
  styleUrls: ['./banner-center-x2.component.css']
})
export class BannerCenterX2Component extends AppComponentBase implements OnInit {
  config: SwiperOptions = {
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      // nextEl: '.swiper-button-next',
      // prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  config2: SwiperOptions = {
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      // nextEl: '.swiper-button-next2',
      // prevEl: '.swiper-button-prev2'
    },
    spaceBetween: 30
  };

  url = '';
  bannerCenterHome: any;
  loading = true;
  positionBannerSlide: typeof PositionBannerSlide = PositionBannerSlide;

  constructor(private injector: Injector, private bannerService: BannerSlideService) { super(injector) }

  override ngOnInit(): void {
    this.getBannerCenterHome();
    this.getBannerCenterHome2();
  }

  getBannerCenterHome() {
    this.bannerService.getBannerSlideHome(this.positionBannerSlide.BannerHome2Left).subscribe(rs => {
      this.bannerCenterHome = rs.data[0];
      this.url = rs.data[0].url
      this.loading = false;
    })
  }

  bannerCenterHome2: any;
  url2: any;
  getBannerCenterHome2() {
    this.bannerService.getBannerSlideHome(this.positionBannerSlide.BannerHome2Right).subscribe(rs => {
      this.bannerCenterHome2 = rs.data[0]?.files;
      this.url2 = rs.data[0].url
    })
  }

}

