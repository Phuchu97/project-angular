import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProvinceModel} from "../model/province.model";
import {CategoryProductFacadeService} from "../service/category-product-facade.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-filter-province',
  templateUrl: './filter-province.component.html',
  styleUrls: ['./filter-province.component.css']
})
export class FilterProvinceComponent implements OnInit {

  @Output() listProvince = new EventEmitter();
  public isShowMore = true;
  public listFilter: ProvinceModel[] = []
  public listFilterOrigin: ProvinceModel[] = [];
  public listCheckedItem: number[] = [];

  constructor(
    private categoryProductFacadeService: CategoryProductFacadeService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.getProvinceList();
  }

  public getProvinceList() {
    const param = {
      language_code: this.translate.currentLang,
      page_number: 0
    }
    this.categoryProductFacadeService.getCategoryProductService().getCategoryProvinceList(param).subscribe((res: any) => {
      this.listFilterOrigin = res.data.lists;
      this.listFilter = this.listFilterOrigin.slice(0, 10);
    })
  }

  // @ts-ignore
  public onClick(event, item: ProvinceModel) {
    const checked = event.target.checked;
    if (checked) {
      this.listCheckedItem.push(item.id);
    } else {
      const index = this.listCheckedItem.findIndex(x => x == item.id);
      this.listCheckedItem.splice(index, 1);
    }
    this.listProvince.emit(this.listCheckedItem);
  }

  showMore() {
    this.listFilter = this.listFilterOrigin;
    this.isShowMore = false;
  }
}
