import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryStandardService } from 'src/app/services/category-standard.service';
import { ProductsService } from 'src/app/services/products.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { SeoUrlPipe } from 'src/app/shared/pipes/seo-url.pipe';
import { FlashSaleHome } from 'src/app/viewModels/customers/flashsale-home';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale.component.html',
  styleUrls: ['./flash-sale.component.css']
})
export class FlashSaleComponent extends AppComponentBase implements OnInit, OnDestroy {
  configProductSale: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 6
      },
      500: {
        slidesPerView: 4
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
  currentDate: any;
  targetDate: any;
  cDateMillisecs: any;
  tDateMillisecs: any;
  difference: any;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  year: number = 2023;
  month: number = 6;
  months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  day: number = 31;
  productFlashSale: any;
  flashsaleHome: FlashSaleHome = new FlashSaleHome();
  end_dateYear: number=0;
  end_dateMonth: number=0;
  end_dateDay: number=0;
  end_dateHour: number=0;
  end_dateMinute: number=0;
  flashSaleFinish:boolean=true;

  constructor(
    private injector: Injector, private productService: ProductsService,
    private categoryStandardService: CategoryStandardService,
    public seoUrlPipe: SeoUrlPipe,
  ) {
    super(injector);

  }
  override async ngOnInit(): Promise<void> {
    this.getFlashSale();
  }

  override ngOnDestroy(): void {
    clearInterval()
  }

  flashSaleTimeDown() {
    this.productService.FlashSaleHappenning(this.flashsaleHome).subscribe(rs => {
      if (rs.data.lists.length > 0) {
        let end_date = new Date(rs.data.lists[0].timeslots[0].end_date.toString());
        this.end_dateYear = end_date.getFullYear();
        this.end_dateMonth = end_date.getMonth();
        this.end_dateDay = end_date.getDate();
        this.end_dateHour = end_date.getHours();
        this.end_dateMinute = end_date.getMinutes();
        this.myTimer(this.end_dateYear, this.end_dateMonth, this.end_dateDay, this.end_dateHour, this.end_dateMinute);
      }
      else {
        this.targetDate = new Date();
      }

    })
  }
  myTimer(year: number, month: number, date: number, hour: number, minute: number) {
    this.targetDate = new Date(year,month, date, hour, minute);
    this.currentDate = new Date();
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    if(this.difference>0&&this.flashSaleFinish==true)
    {
      this.flashSaleFinish=true;
      this.seconds = Math.floor(this.difference / 1000);
      this.minutes = Math.floor(this.seconds / 60);
      this.hours = Math.floor(this.minutes / 60);
      this.days = Math.floor(this.hours / 24);

      this.hours %= 24;
      this.minutes %= 60;
      this.seconds %= 60;
      this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
      this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
      this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
      (<HTMLInputElement>document.getElementById("days")).innerText = this.days;
      (<HTMLInputElement>document.getElementById("hours")).innerText = this.hours;
      (<HTMLInputElement>document.getElementById("mins")).innerText = this.minutes;
      (<HTMLInputElement>document.getElementById("seconds")).innerText = this.seconds;
      setTimeout(() => {
        this.myTimer(year, month, date, hour, minute);
      }, 1000);
    }
    else
    {
      this.flashSaleFinish=false;
      // (<HTMLInputElement>document.getElementById("days")).innerText = "0";
      // (<HTMLInputElement>document.getElementById("hours")).innerText = "00";
      // (<HTMLInputElement>document.getElementById("mins")).innerText = "00";
      // (<HTMLInputElement>document.getElementById("seconds")).innerText = "00";
    }
  }
  async getFlashSale(): Promise<void> {
   await this.productService.productFlashSale().subscribe(rs => {
      this.productFlashSale = rs.data;
      if(rs.data.length==0)
      {
        this.flashSaleFinish=false;
      }
    })
    this.flashSaleTimeDown();
  }
  progessSold(sale_quantity: number, sold_quantity: number) {
    return (sold_quantity * 100) / sale_quantity + '%';
  }
  // @ts-ignore
  public navigateItem(item): string {
    //category_product_id
    const productUrl = this.seoUrlPipe.transform(item.product_name, item.product_id);
    window.location.href = `/${productUrl}`
    //this.router.navigate([`${url}/${item.product_id}`]);
  }
  PriceAffterDiscount(price: number, discount: number) {
    return (price * (100 - discount) / 100);
  }
}
