import { Injector } from '@angular/core';
import { LinkCatalogsService } from './../../../services/link-catalogs.service';
import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { SeoUrlPipe } from 'src/app/shared/pipes/seo-url.pipe';
import { SwiperOptions} from 'swiper';

@Component({
  selector: 'app-link-catalogs',
  templateUrl: './link-catalogs.component.html',
  styleUrls: ['./link-catalogs.component.css']
})
export class LinkCatalogsComponent extends AppComponentBase implements OnInit {

  configSwiper: SwiperOptions = {
    slidesPerColumnFill: 'row',
    slidesPerColumn: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 8
      },
      500: {
        slidesPerView: 5.5
      },
      400: {
        slidesPerView: 4.5
      },
      300: {
        slidesPerView: 4.5
      },
      200: {
        slidesPerView: 3
      }

    },
    navigation: {
      nextEl: '.swiper-button-next-category-product',
      prevEl: '.swiper-button-prev-category-product'
    },

  };

  constructor(
    private injector:Injector,
    private linkCatalogsService:LinkCatalogsService,
    public seoUrlPipe: SeoUrlPipe,
  ) {
    super(injector)
  }
  linkCatalogs: any[] = [];


  override ngOnInit(): void {
    this.getLinkCatalogs();
  }

  getLinkCatalogs(){
    let lang=this.translate.currentLang;
    this.linkCatalogsService.getCategoryStandardListView(lang).subscribe(rs=>{
      this.linkCatalogs = rs.data

    })
  }

}
