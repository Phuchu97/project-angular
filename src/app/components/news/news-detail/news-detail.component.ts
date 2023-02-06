import { async } from '@angular/core/testing';
import { CategoryService } from './../../../services/category.service';
import { Component, Injector, OnInit } from '@angular/core';
// import {PriceModel} from "./model/price.model";
// import {CategoryProductFacadeService} from "./service/category-product-facade.service";
import { TranslateService } from "@ngx-translate/core";
import { ProductModel } from "../../shared/model/product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderConstans } from "../../../shared/common/category.constans";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { defaultPaging, PaginationConstants } from "../../../shared/common/pagination.constants";
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { PagingConstant } from 'src/app/shared/common/app.constants';
import { RouterConstants } from 'src/app/shared/common/router.constants';
import { SeoUrlPipe } from "../../../shared/pipes/seo-url.pipe";
import { UtilsService } from "../../../shared/services/utils.service";
import { CategoryProductService } from 'src/app/services/category-product.service';
import { CategoryProductFacadeService } from '../../category-product/service/category-product-facade.service';
import { PriceModel } from '../../category-product/model/price.model';
import { NewsService } from 'src/app/services/news.service';
import { ApiStorageConstant } from 'src/app/shared/common/api-storage';
declare const toggleLeftCategory: any;
declare const toggleRemoveLeftCategory: any;

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent extends AppComponentBase implements OnInit {

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
  public id: number = 0;
  item: any = {};
  fileImageUrl: typeof ApiStorageConstant = ApiStorageConstant;
  constructor(
    private injector: Injector,
    private newservice: NewsService,
    private categoryProductFacadeService: CategoryProductFacadeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public seoUrlPipe: SeoUrlPipe,
    public utilsService: UtilsService,
    private categoryService: CategoryProductService,
  ) {
    super(injector)
  }

  override ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.id = parseInt(param['id']);
      this.getItem(this.id);
    })
  }

  getItem(id: number) {
    this.newservice.getNewsDetail(id).subscribe(rs => {
      this.item = rs.data;
    })
  }

  public selectedRegion($event: any) {
    this.listSelectedRegion = $event;
    this.listProduct = [];
    this.pagingConstant.page_number = 1;

    this.getItem(this.id);
  }

}
