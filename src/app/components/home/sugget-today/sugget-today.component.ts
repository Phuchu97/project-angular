import { Component, Injector, OnInit } from '@angular/core';
import { CategoryStandardService } from 'src/app/services/category-standard.service';
import { ProductsService } from 'src/app/services/products.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { PagingConstant } from 'src/app/shared/common/app.constants';
import { RouterConstants } from 'src/app/shared/common/router.constants';
import { CategoryProductFacadeService } from '../../category-product/service/category-product-facade.service';
import {SeoUrlPipe} from "../../../shared/pipes/seo-url.pipe";
import { LinkCatalogsService } from 'src/app/services/link-catalogs.service';
import { deepCopy } from '../../shared/globlafunction';

@Component({
  selector: 'app-sugget-today',
  templateUrl: './sugget-today.component.html',
  styleUrls: ['./sugget-today.component.css']
})
export class SuggetTodayComponent  extends AppComponentBase  implements OnInit {
  page_number:number=1;
  page_size:number=18;
  productSuggetToday:any;
  starRating = 0;
  totalItems:number;
  bnlShowLoadMore:boolean=false;
  pagingConstant: typeof PagingConstant=PagingConstant;
  routerConstant:typeof RouterConstants=RouterConstants;
  linkCatalogs: any;
  infiniteScrollDistance = 1;
  infiniteScrollThrottle = 50;
  smallOrder = 2;
  smallTruyxuat = 7;
  constructor(
    private injector:Injector,private productService:ProductsService,
    private categoryStandardService:CategoryStandardService,
    private categoryProductFacadeService: CategoryProductFacadeService,
    public seoUrlPipe: SeoUrlPipe,
    private linkCatalogsService: LinkCatalogsService,
    ) {super(injector) }
  override ngOnInit(): void {
    let lang = this.translate.currentLang;
    this.linkCatalogsService.getCategoryStandardListView(lang).subscribe(rs => {
      this.linkCatalogs = rs.data;
      this.loadProductSuggetToday();
    })

  }
  loadProductSuggetToday()
  {
    this.spinnerLoader.show();
    this.productService.productSuggetTodayHome(this.lang,this.page_number,this.pagingConstant.page_size_sugget_home).subscribe(rs=>{
      let listProduct = this.productSuggetToday;
      listProduct= deepCopy(rs.data.lists);

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
      this.productSuggetToday = listProduct;

      this.totalItems = rs.data.totalcount;
      this.bnlShowLoadMore=true?this.page_number*this.pagingConstant.page_size_sugget_home<this.totalItems:false;
      this.spinnerLoader.hide();
    })
  }
  onScroll()
  {
    this.pagingConstant.page_size_sugget_home =this.pagingConstant.page_size_sugget_home+this.pagingConstant.page_size_sugget_home;
    this.loadProductSuggetToday();
  }
  public navigateItem(item:any) {
    const productUrl = this.seoUrlPipe.transform(item.name, item.product_id);
    window.location.href = `/${productUrl}`
    // return `${url}/${productUrl}`;
    //this.router.navigate([`${url}/${item.product_id}`]);
  }

}
