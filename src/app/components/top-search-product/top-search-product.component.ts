import { SmartMall } from './../../shared/common/app.constants';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ProductsService } from 'src/app/services/products.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { PagingConstant } from 'src/app/shared/common/app.constants';
import { OrderConstans } from 'src/app/shared/common/category.constans';
import { defaultPaging } from 'src/app/shared/common/pagination.constants';
import { RouterConstants } from 'src/app/shared/common/router.constants';
import { PriceModel } from '../category-product/model/price.model';
import { CategoryProductFacadeService } from '../category-product/service/category-product-facade.service';
import { ProductModel } from '../shared/model/product.model';
import { SeoUrlPipe } from "../../shared/pipes/seo-url.pipe";
import { LinkCatalogsService } from 'src/app/services/link-catalogs.service';

@Component({
  selector: 'app-top-search-product',
  templateUrl: './top-search-product.component.html',
  styleUrls: ['./top-search-product.component.css']
})
export class TopSearchProductComponent extends AppComponentBase implements OnInit {

  public listSelectedCategory: number[] = [];
  public listSelectedRegion: number[] = [];
  public listSelectedProductType: number[] = [];
  public listSelectedProvince: number[] = [];
  public listSelectedTranform: number[] = [];
  public listSelectedEvaluate: number | null;
  public priceFrom: number;
  public priceTo: number;
  public orderBy: number = 2;
  temp: [] = [];
  public listProduct: ProductModel[] = [];
  public categoryId: string;
  public totalItems: number;
  private paging: PageChangedEvent = defaultPaging;
  routerConstant: typeof RouterConstants = RouterConstants;
  pagingConstant: typeof PagingConstant = PagingConstant;
  linkCatalogs: any;
  constructor(private injector: Injector, private categoryProductFacadeService: CategoryProductFacadeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    public seoUrlPipe: SeoUrlPipe,
    private linkCatalogsService: LinkCatalogsService,
  ) { super(injector) }

  override ngOnInit(): void {
    let lang = this.translate.currentLang;
    this.linkCatalogsService.getCategoryStandardListView(lang).subscribe(rs => {
      this.linkCatalogs = rs.data;
      this.getListProduct();
    })
  }

  public selectedCategory($event: any) {
    this.listSelectedCategory = $event;
    this.listProduct = [];
    this.pagingConstant.page_number = 1;
    this.getListProduct();
  }

  public selectedRegion($event: any) {
    this.listSelectedRegion = $event;
    this.listProduct = [];
    this.pagingConstant.page_number = 1;
    this.getListProduct();
  }

  public selectedProductType($event: any) {
    this.listSelectedProductType = $event;
    this.listProduct = [];
    this.pagingConstant.page_number = 1;
    this.getListProduct();
  }

  public selectedProvince($event: any) {
    this.listSelectedProvince = $event;
    this.listProduct = [];
    this.pagingConstant.page_number = 1;
    this.getListProduct();
  }

  public selectedTranform($event: any) {
    this.listSelectedTranform = $event;
    this.listProduct = [];
    this.pagingConstant.page_number = 1;
    this.getListProduct();
  }

  public selectedEvaluate($event: any) {
    this.listProduct = [];
    this.pagingConstant.page_number = 1;
    if ($event === this.listSelectedEvaluate) {
      this.listSelectedEvaluate = null
    } else {
      this.listSelectedEvaluate = $event;
    }
    this.getListProduct();
  }

  public selectedPrice($event: PriceModel) {
    this.listProduct = [];
    this.pagingConstant.page_number = 1;
    this.priceFrom = $event.priceFrom ? $event.priceFrom : 0;
    this.priceTo = $event.priceTo ? $event.priceTo : 0;
    this.getListProduct();
  }

  public selectedOrderBy(orderBy: number) {
    this.listProduct = [];
    this.pagingConstant.page_number = 1;
    this.orderBy = orderBy;
    this.getListProduct();
  }
  public getListProduct() {
    const param  = {
      list_category_product_id:this.listSelectedCategory,
      category_province_id: this.listSelectedProvince,
      category_standard_id:  this.listSelectedProductType,
      category_area_id: this.listSelectedRegion,
      is_smart_mall: SmartMall.isNotSmartMall,
      language_code: this.translate.currentLang,
      page_number:this.pagingConstant.page_number,// this.paging.page,
      page_size:this.pagingConstant.page_size,// this.paging.itemsPerPage,
      order: this.orderBy,
      from_price: this.priceFrom,
      to_price: this.priceTo,
      shipping_type: this.listSelectedTranform,
      ratio: this.listSelectedEvaluate,
      keyword: ""
    }
    this.categoryProductFacadeService.getCategoryProductService().getCategoryProduct(param).subscribe( (res: any) => {
      this.totalItems = res.data.totalcount;
      this.temp=[];
      let listProduct = this.listProduct;
      this.temp =res.data.lists;
      this.temp.forEach(item => {
        listProduct.push(item);
      })

      let category_standard_code_smartmall: string = 'SMARTMALL';
      let category_standard_code_truyxuat: string = 'TRUYXUAT';

      listProduct.map((obj: any) => {
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
  public navigateItem(item) {
    //category_product_id
    const productUrl = this.seoUrlPipe.transform(item.name, item.product_id);
    window.location.href = `/${productUrl}`;
    //this.router.navigate([`${url}/${item.product_id}`]);
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

}
