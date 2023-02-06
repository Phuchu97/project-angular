import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductTypeModel} from "../model/product-type.model";
import {CategoryProductFacadeService} from "../service/category-product-facade.service";
import {TranslateService} from "@ngx-translate/core";
import { Location } from '@angular/common';

@Component({
  selector: 'app-filter-product-type',
  templateUrl: './filter-product-type.component.html',
  styleUrls: ['./filter-product-type.component.css']
})
export class FilterProductTypeComponent implements OnInit {

  productTypeId: any;
  @Output() listProductType = new EventEmitter();
  public listFilter: ProductTypeModel[] = [];
  public listCheckedItem: number[] = [];

  constructor(
    private categoryProductFacadeService: CategoryProductFacadeService,
    public translate: TranslateService,
    private location: Location
  ) {
  }

   ngOnInit(): void {
    this.getProductType();
  }

  public getProductType() {
    const param = {
      language_code: this.translate.currentLang
    }
    this.categoryProductFacadeService.getCategoryProductService().getCategoryStandardList(param).subscribe((res: any) => {
      this.listFilter = res.data
      let getUrl = this.location.path().replace('/', '').replace('-', '').toUpperCase()
      this.productTypeId = this.listFilter.find(obj => obj.code === getUrl)?.id
    })
  }

  // @ts-ignore
  public onClick(event, item: ProductTypeModel) {
    const checked = event.target.checked;
    if (checked) {
      this.listCheckedItem.push(item.id);
    } else {
      const index = this.listCheckedItem.findIndex(x => x == item.id);
      this.listCheckedItem.splice(index, 1);
    }
    this.listProductType.emit(this.listCheckedItem);
  }

}
