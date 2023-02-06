import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegionModel } from "../model/region.model";
import { CategoryProductFacadeService } from "../service/category-product-facade.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-filter-regions',
  templateUrl: './filter-regions.component.html',
  styleUrls: ['./filter-regions.component.css']
})
export class FilterRegionsComponent implements OnInit {
  @Input() listSelectedRegion: number[]
  @Output() listRegion = new EventEmitter();
  public listFilter: RegionModel[] = [];
  public listCheckedItem: number[] = [];

  constructor(
    private categoryProductFacadeService: CategoryProductFacadeService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.getRegionList();
  }

  public getRegionList() {
    const param = {
      language_code: this.translate.currentLang
    }
    this.categoryProductFacadeService.getCategoryProductService().getCategoryRegionList(param).subscribe((res: any) => {
      this.listFilter = res.data;
      this.listSelectedRegion && this.listSelectedRegion.forEach(id => {
        this.listFilter.forEach(ele => {
          if (ele.id == id) {
            ele.checked = true;
            this.listCheckedItem.push(ele.id)
          }
        })
      })
    })
  }

  // @ts-ignore
  public onClick(event, item: RegionModel) {
    const checked = event.target.checked;
    if (checked) {
      this.listCheckedItem.push(item.id);
    } else {
      const index = this.listCheckedItem.findIndex(x => x == item.id);
      this.listCheckedItem.splice(index, 1);
    }
    this.listRegion.emit(this.listCheckedItem);
  }
}
