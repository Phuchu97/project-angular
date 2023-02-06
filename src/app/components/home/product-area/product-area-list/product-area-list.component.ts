import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { CategoryStandardService } from 'src/app/services/category-standard.service';
import { ProductsService } from 'src/app/services/products.service';
import { RouterConstants } from 'src/app/shared/common/router.constants';
import { SeoUrlPipe } from "../../../../shared/pipes/seo-url.pipe";
import { SwiperOptions } from 'swiper';
import { LinkCatalogsService } from 'src/app/services/link-catalogs.service';
@Component({
  selector: 'app-product-area-list',
  templateUrl: './product-area-list.component.html',
  styleUrls: ['./product-area-list.component.css']
})
export class ProductAreaListComponent extends AppComponentBase implements OnInit {
  @Input() area: any;
  page_number: number = 1;
  page_size: number = 6;
  productAreaHome: any;
  starRating = 0;

  routerConstant: typeof RouterConstants = RouterConstants;
  linkCatalogs: any;
  constructor(
    private injector: Injector, private productService: ProductsService,
    private categoryStandardService: CategoryStandardService,
    public seoUrlPipe: SeoUrlPipe,
    private linkCatalogsService: LinkCatalogsService,
  ) { super(injector) }

  override ngOnInit(): void {
    let lang = this.translate.currentLang;
    this.linkCatalogsService.getCategoryStandardListView(lang).subscribe(rs => {
      this.linkCatalogs = rs.data;
      this.loadProductAreaHome();
    })
  }
  loadProductAreaHome() {
    this.productService.productAreaHome(this.area, this.lang, "", this.page_number, this.page_size).subscribe(rs => {
      let listProduct = this.productAreaHome;
      listProduct = rs.data.lists;
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
      this.productAreaHome = listProduct;
    })
  }
  public navigateItem(item: any) {
    const productUrl = this.seoUrlPipe.transform(item.name, item.product_id);
    window.location.href = `/${productUrl}`;
    //this.router.navigate([`${url}/${item.product_id}`]);
  }

}
