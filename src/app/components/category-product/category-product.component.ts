import { SmartMall } from './../../shared/common/app.constants';
import { async } from '@angular/core/testing';
import { CategoryService } from './../../services/category.service';
import {Component, Injector, OnInit} from '@angular/core';
import {PriceModel} from "./model/price.model";
import {CategoryProductFacadeService} from "./service/category-product-facade.service";
import {TranslateService} from "@ngx-translate/core";
import {ProductModel} from "../shared/model/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderConstans} from "../../shared/common/category.constans";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {defaultPaging, PaginationConstants} from "../../shared/common/pagination.constants";
import {AppComponentBase} from 'src/app/shared/common/app-base-component';
import {PagingConstant} from 'src/app/shared/common/app.constants';
import {RouterConstants} from 'src/app/shared/common/router.constants';
import {SeoUrlPipe} from "../../shared/pipes/seo-url.pipe";
import {UtilsService} from "../../shared/services/utils.service";
import { CategoryProductService } from 'src/app/services/category-product.service';
import { LinkCatalogsService } from 'src/app/services/link-catalogs.service';
declare const toggleLeftCategory: any;
declare const toggleRemoveLeftCategory: any;
@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent extends AppComponentBase implements OnInit {
  public listSelectedRegion: number[] = [];
  public listSelectedProductType: number[] = [];
  public listSelectedProvince: number[] = [];
  public listSelectedTranform: number[] = [];
  public listSelectedEvaluate: number | null;
  public priceFrom: number;
  public priceTo: number;
  public orderBy: number = OrderConstans.New;
  temp: [] = [];
  public listProduct: ProductModel[] = [];
  public categoryId: number;
  public totalItems: number;
  private paging: PageChangedEvent = defaultPaging;
  pagingConstant: typeof PagingConstant = PagingConstant;
  categoryProductName: string;
  routerConstant: typeof RouterConstants = RouterConstants;
  public listCategoryId:number[]=[];
  linkCatalogs: any;
  constructor(
    private injector: Injector,
    private categoryProductFacadeService: CategoryProductFacadeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public seoUrlPipe: SeoUrlPipe,
    public utilsService: UtilsService,
    private categoryService:CategoryProductService,
    private linkCatalogsService: LinkCatalogsService,
  ) {
    super(injector)
  }

  override ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.categoryId = this.utilsService.getIdBySeoUrl(param['categoryId']);
      let lang = this.translate.currentLang;
      this.linkCatalogsService.getCategoryStandardListView(lang).subscribe(rs => {
        this.linkCatalogs = rs.data;
        this.getCategoryProductByID(this.categoryId);
        this.getListCategoryId(this.categoryId);
      })
      //this.getListProduct();
    })
  }
 async getListCategoryId(parent_id:number)
  {
   await this.categoryService.getCategoryChildByParentID(parent_id,this.translate.currentLang).subscribe(rs=>{
      this.listCategoryId=[];
      this.listCategoryId.push(parent_id);
      if(rs.data.length>0)
      {
          for(var i=0;i<rs.data.length;i++)
          {
            this.listCategoryId.push(rs.data[i].id);
          }
      }
      this.getListProduct();
    })
  }
  getCategoryProductByID(id: number) {
    const param = {id};
    this.categoryProductFacadeService.getCategoryProductService().getCategoryByID(param).subscribe((rs: any) => {
      this.categoryProductName = rs.data.name;
    })
  }

  public selectedRegion($event: any) {
    this.listSelectedRegion = $event;
    this.pagingConstant.page_number = 1;

    this.getListProduct();
  }

  public selectedProductType($event: any) {
    this.listSelectedProductType = $event;
    this.pagingConstant.page_number = 1;
    this.getListProduct();
  }

  public selectedProvince($event: any) {
    this.listSelectedProvince = $event;
    this.pagingConstant.page_number = 1;
    this.getListProduct();
  }

  public selectedTranform($event: any) {
    this.listSelectedTranform = $event;
    this.pagingConstant.page_number = 1;
    this.getListProduct();
  }

  public selectedEvaluate($event: any) {
    this.pagingConstant.page_number = 1;
    if ($event === this.listSelectedEvaluate) {
      this.listSelectedEvaluate = null
    } else {
      this.listSelectedEvaluate = $event;
    }
    this.getListProduct();
  }

  public selectedPrice($event: PriceModel) {
    this.pagingConstant.page_number = 1;
    this.priceFrom = $event.priceFrom ? $event.priceFrom : 0;
    this.priceTo = $event.priceTo ? $event.priceTo : 0;
    this.getListProduct();
  }

  public selectedOrderBy(orderBy: number) {
    this.pagingConstant.page_number = 1;
    this.orderBy = orderBy;
    this.getListProduct();
  }

  public getListProduct() {
    const param = {
      list_category_product_id: this.listCategoryId,
      category_standard_id: this.listSelectedProductType,
      category_province_id: this.listSelectedProvince,
      category_area_id: this.listSelectedRegion,
      is_smart_mall: SmartMall.isNotSmartMall,
      language_code: this.translate.currentLang,
      page_number: this.pagingConstant.page_number,// this.paging.page,
      page_size: this.pagingConstant.page_size,// this.paging.itemsPerPage,
      order: this.orderBy,
      from_price: this.priceFrom,
      to_price: this.priceTo,
      shipping_type: this.listSelectedTranform,
      ratio: this.listSelectedEvaluate,
      keyword: ""
    }
    this.categoryProductFacadeService.getCategoryProductService().getCategoryProduct(param).subscribe((res: any) => {
      this.totalItems = res.data.totalcount;
      let listProduct = this.listProduct;
      this.temp = [];
      this.temp = res.data.lists;
      this.temp.forEach(item => {
        listProduct.push(item);
      })
      let category_standard_code_smartmall: string = 'SMARTMALL';
      let category_standard_code_truyxuat: string = 'TRUYXUAT';

      listProduct && listProduct.map((obj: any) => {
        if( obj.listCategoryStandard && obj.listCategoryStandard[0])
        {
          obj.listCategoryStandard.map((ele: any) => {
          ele.category_standard_code = this.linkCatalogs.find((eleLink: any) => eleLink.id == ele.category_standard_id).code; })
          let
          toIndex: number = 0,
          indexStandard: number,
          element: any,
          findSmartmall = obj.listCategoryStandard.some((obj: any) => obj.category_standard_code == category_standard_code_smartmall),
          findTruyXuat = obj.listCategoryStandard.some((obj: any) => obj.category_standard_code == category_standard_code_truyxuat);

        if (findSmartmall && findTruyXuat) {
          indexStandard = obj.listCategoryStandard.findIndex((obj: any) => obj.category_standard_code == category_standard_code_smartmall);
        }
        else {
          indexStandard = obj.listCategoryStandard.findIndex((obj: any) => obj.category_standard_code == category_standard_code_smartmall || obj.category_standard_code == category_standard_code_truyxuat);
        }
        element = obj.listCategoryStandard.splice(indexStandard, 1)[0];
        obj.listCategoryStandard.splice(toIndex, 0, element)
       }
        
      });
                                                                                                          
      this.listProduct = listProduct;
    })
  }

  // @ts-ignore
  public navigateItem(item): string {
    //const url = this.router.url;
    const productUrl = this.seoUrlPipe.transform(item.name, item.product_id);
    window.location.href = `/${productUrl}`
  }

  public pageChanged(event: PageChangedEvent) {
    this.paging = event;
    this.getListProduct();
  }

  onScroll() {
    if (this.totalItems > this.pagingConstant.page_number * this.pagingConstant.page_size) {
      this.spinnerLoader.show();
      this.pagingConstant.page_number = this.pagingConstant.page_number + 1;
      this.getListProduct();
      this.spinnerLoader.hide();
    }

  }

  toggleLeftCategoryClick() {
    toggleLeftCategory();
  }
  toggleRemoveLeftCategoryClick(){
    toggleRemoveLeftCategory();
  }
}
