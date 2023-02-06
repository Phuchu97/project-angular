import { Component, Injector, OnInit } from '@angular/core';
import { CategoryStandardService } from 'src/app/services/category-standard.service';
import { ProductsService } from 'src/app/services/products.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { CategoryProductFacadeService } from '../../category-product/service/category-product-facade.service';

@Component({
  selector: 'app-product-area',
  templateUrl: './product-area.component.html',
  styleUrls: ['./product-area.component.css']
})
export class ProductAreaComponent extends AppComponentBase implements OnInit {
  page_number:number=1;
  page_size:number=30;
  productAreaHome:any;
  starRating = 0;
  categoryArea:any;
  area:number;

  constructor(private injector:Injector,private productService:ProductsService,
    private categoryStandardService:CategoryStandardService,
    private categoryProductFacadeService: CategoryProductFacadeService
    ) {super(injector) }

  override ngOnInit(): void {
    this.getRegionList();
  }
  public getRegionList() {
    const param = {
      language_code: this.translate.currentLang
    }
    this.categoryProductFacadeService.getCategoryProductService().getCategoryRegionList(param).subscribe((res: any) => {
      this.categoryArea = res.data
    })
  }


}
