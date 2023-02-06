import { async } from '@angular/core/testing';
import { CategoryService } from './../../services/category.service';
import { Component, Injector, OnInit } from '@angular/core';
// import {PriceModel} from "./model/price.model";
// import {CategoryProductFacadeService} from "./service/category-product-facade.service";
import { TranslateService } from "@ngx-translate/core";
import { ProductModel } from "../shared/model/product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderConstans } from "../../shared/common/category.constans";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { defaultPaging, PaginationConstants } from "../../shared/common/pagination.constants";
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { PagingConstant } from 'src/app/shared/common/app.constants';
import { RouterConstants } from 'src/app/shared/common/router.constants';
import { SeoUrlPipe } from "../../shared/pipes/seo-url.pipe";
import { UtilsService } from "../../shared/services/utils.service";
import { CategoryProductService } from 'src/app/services/category-product.service';
import { CategoryProductFacadeService } from '../category-product/service/category-product-facade.service';
import { PriceModel } from '../category-product/model/price.model';
import { NewsService } from 'src/app/services/news.service';
import { ApiStorageConstant } from 'src/app/shared/common/api-storage';
declare const toggleLeftCategory: any;
declare const toggleRemoveLeftCategory: any;

declare const toggleMenu: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends AppComponentBase implements OnInit {

  public listSelectedRegion: number[] = [];
  public listSelectedProductType: number[] = [];
  public listSelectedProvince: number[] = [];
  public listSelectedTranform: number[] = [];
  public listSelectedEvaluate: number | null;
  public priceFrom: string;
  public priceTo: string;
  public orderBy: number = OrderConstans.New;
  temp: [] = [];
  public listProduct: ProductModel[] = [];
  public categoryId: number;
  public totalItems: number;
  private paging: PageChangedEvent = defaultPaging;
  pagingConstant: typeof PagingConstant = PagingConstant;
  categoryProductName: string;
  routerConstant: typeof RouterConstants = RouterConstants;
  public listCategoryId: number[] = [];
  news: any[] = [];
  fileImageUrl: typeof ApiStorageConstant = ApiStorageConstant;
  categoryProduct: any = [];
  constructor(
    private injector: Injector,
    private newservice: NewsService,
    private categoryProductFacadeService: CategoryProductFacadeService,
    private CategoryService: CategoryService,

    private activatedRoute: ActivatedRoute,
    private router: Router,
    public seoUrlPipe: SeoUrlPipe,
    public utilsService: UtilsService,
    private categoryService: CategoryProductService,
  ) {
    super(injector)
  }

  override ngOnInit(): void {
    this.getListCategoryNews();
    this.getNewsList();
    this.activatedRoute.params.subscribe((param) => {
      //this.getListProduct();
    })
  }

  toggleMenuClick() {
    toggleMenu();
  }

  getNewsList(item:any={}) {
    let data: any = {
      category_id:item.id||0
    };
    this.newservice.getListNews(data).subscribe(rs => {
      this.news = rs.data.lists;
    })
  }

  getListCategoryNews() {
    let data: any = {
      language_code: "vi"
    };
    this.CategoryService.getListCategoryNews(data).subscribe((rs: any) => {
      this.categoryProduct = rs.data;
    })
  }

  public selectedRegion($event: any) {
    this.listSelectedRegion = $event;
    this.listProduct = [];
    this.pagingConstant.page_number = 1;

    this.getNewsList();
  }

  newsDetail(id: number) {
    window.location.href = `${RouterConstants.news}/newsdetail/${id}`;
  }

  // public selectedProductType($event: any) {
  //   this.listSelectedProductType = $event;
  //   this.listProduct = [];
  //   this.pagingConstant.page_number = 1;
  //   this.getListProduct();
  // }

  // public selectedProvince($event: any) {
  //   this.listSelectedProvince = $event;
  //   this.listProduct = [];
  //   this.pagingConstant.page_number = 1;
  //   this.getListProduct();
  // }

  // public selectedTranform($event: any) {
  //   this.listSelectedTranform = $event;
  //   this.listProduct = [];
  //   this.pagingConstant.page_number = 1;
  //   this.getListProduct();
  // }

  // public selectedEvaluate($event: any) {
  //   this.listProduct = [];
  //   this.pagingConstant.page_number = 1;
  //   if ($event === this.listSelectedEvaluate) {
  //     this.listSelectedEvaluate = null
  //   } else {
  //     this.listSelectedEvaluate = $event;
  //   }
  //   this.getListProduct();
  // }

  // public selectedPrice($event: PriceModel) {
  //   this.listProduct = [];
  //   this.pagingConstant.page_number = 1;
  //   this.priceFrom = $event.priceFrom ? $event.priceFrom : "";
  //   this.priceTo = $event.priceTo ? $event.priceTo : "";
  //   this.getListProduct();
  // }

  // public selectedOrderBy(orderBy: number) {
  //   this.listProduct = [];
  //   this.pagingConstant.page_number = 1;
  //   this.orderBy = orderBy;
  //   this.getListProduct();
  // }

  // public getListProduct() {
  //   const param = {
  //     list_category_product_id: this.listCategoryId,
  //     category_standard_id: this.listSelectedProductType,
  //     category_province_id: this.listSelectedProvince,
  //     category_area_id: this.listSelectedRegion,
  //     is_smart_mall: null,
  //     language_code: this.translate.currentLang,
  //     page_number: this.pagingConstant.page_number,// this.paging.page,
  //     page_size: this.pagingConstant.page_size,// this.paging.itemsPerPage,
  //     order: this.orderBy,
  //     from_price: this.priceFrom,
  //     to_price: this.priceTo,
  //     shipping_type: this.listSelectedTranform,
  //     ratio: this.listSelectedEvaluate,
  //     keyword: ""
  //   }
  //   this.categoryProductFacadeService.getCategoryProductService().getCategoryProduct(param).subscribe((res: any) => {
  //     this.totalItems = res.data.totalcount;
  //     this.temp = [];
  //     this.temp = res.data.lists;
  //     this.temp.forEach(item => {
  //       this.listProduct.push(item);
  //     })
  //   })
  // }

  // // @ts-ignore
  // public navigateItem(item): string {
  //   //const url = this.router.url;
  //   const productUrl = this.seoUrlPipe.transform(item.name, item.product_id);
  //   window.location.href = `/${productUrl}`
  // }

  // public pageChanged(event: PageChangedEvent) {
  //   this.paging = event;
  //   this.getListProduct();
  // }

  onScroll() {
    if (this.totalItems > this.pagingConstant.page_number * this.pagingConstant.page_size) {
      this.spinnerLoader.show();
      this.pagingConstant.page_number = this.pagingConstant.page_number + 1;
      // this.getListProduct();
      this.spinnerLoader.hide();
    }

  }

  navigateItem(item: any) {
    this.getNewsList(item)
  }

  toggleLeftCategoryClick() {
    toggleLeftCategory();
  }
  toggleRemoveLeftCategoryClick() {
    toggleRemoveLeftCategory();
  }

}
