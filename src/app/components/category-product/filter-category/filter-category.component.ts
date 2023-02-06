import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoryModel } from '../model/category-product';
import { CategoryProductFacadeService } from '../service/category-product-facade.service';
import { CategoryProductService } from 'src/app/services/category-product.service';
@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.css']
})
export class FilterCategoryComponent implements OnInit {

  @Output() listCategory = new EventEmitter();
  public isShowMore = true;
  public listFilterOrigin: CategoryModel[] = [];
  public listFilter: CategoryModel[] = [];
  public listCheckedItem: number[] = [];
  isCheckAll: boolean = false;

  constructor(
    private categoryService: CategoryProductService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.getCategory();
  }

  public getCategory() {
    let lang = this.translate.currentLang;
    this.categoryService.getListCategoryProductMenu(lang).subscribe((res: any) => {
      this.listFilterOrigin = res.data;
      this.listFilter = this.listFilterOrigin.slice(0, 5);
    })
  }

  // @ts-ignore
  public onClick(event, item: any) {
    const checked = event.target.checked;
    if (checked) {
      this.isCheckAll = false;
      this.listCheckedItem.push(item.id)
      item.products.forEach((obj: any) => {
        this.listCheckedItem.push(obj.id)
      })
      // @ts-ignore
    } else {
      this.isCheckAll = false;
      let listCheckedItemLocal = []
      listCheckedItemLocal.push(item.id)
      item.products.forEach((ele: any) => {
        listCheckedItemLocal.push(ele.id)
      })
      listCheckedItemLocal.forEach(id => {
        const index = this.listCheckedItem.findIndex(x => x == id);
        this.listCheckedItem.splice(index, 1);
      })

    }
    this.listCategory.emit(this.listCheckedItem);
  }
  onClickAll(event: any) {

    const checked = event.target.checked;
    if (checked) {
      this.listCheckedItem = [];
      this.isCheckAll = true;
    }
    else {
      this.isCheckAll = false;
      this.listCheckedItem = [];
    }
    this.listCategory.emit(this.listCheckedItem);
  }
  showMore() {
    this.listFilter = this.listFilterOrigin;
    this.isShowMore = false;
  }

}
