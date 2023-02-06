import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranformModel} from "../model/tranform.model";
import {TranformConstans} from "../../../shared/common/category.constans";

@Component({
  selector: 'app-filter-tranform',
  templateUrl: './filter-tranform.component.html',
  styleUrls: ['./filter-tranform.component.css']
})
export class FilterTranformComponent implements OnInit {

  @Output() listTransform = new EventEmitter();
  public listFilter: TranformModel[] = [
    {
      name: "Nhanh",
      id: 1
    },
    {
      name: "Siêu Tốc",
      id: 2
    }
  ];
  public listCheckedItem: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  public onClick(event, item: TranformModel) {
    const checked = event.target.checked;
    if (checked) {
      this.listCheckedItem.push(item.id);
    } else {
      const index = this.listCheckedItem.findIndex(x => x == item.id);
      this.listCheckedItem.splice(index, 1);
    }
    this.listTransform.emit(this.listCheckedItem);
  }

}
