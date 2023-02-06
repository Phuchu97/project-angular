import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderOptionModel } from "../model/order-option.model";
import { OrderConstans } from "../../../shared/common/category.constans";

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.css']
})
export class OrderByComponent implements OnInit {
  @Output() orderBySelected = new EventEmitter();
  @Input() orderByOptionKey?: number;
  public orderByOption: OrderOptionModel[] = [
    {
      name: "Sản phẩm mới",
      key: OrderConstans.New
    },
    {
      name: "Xem nhiều nhất",
      key: OrderConstans.MostView
    },
    {
      name: "Giá từ thấp đến cao",
      key: OrderConstans.PriceDesc
    },
    {
      name: "Giá từ cao đến thấp",
      key: OrderConstans.PriceAsc
    },
    // {
    //   name: "Khuyến mại",
    //   key: OrderConstans.Sale
    // },
    {
      name: "Bán chạy",
      key: OrderConstans.BestSaler
    }
  ];

  constructor() { }

  ngOnInit(): void {
    if (!this.orderByOptionKey) {
      this.orderByOption[0].status = true
    };
  }

  public selectedOrder(item: OrderOptionModel) {
    this.orderByOptionKey = 0;
    this.orderByOption.forEach(option => {
      option.status = option.key === item.key;
    })
    this.orderBySelected.emit(item.key);
  }
}
