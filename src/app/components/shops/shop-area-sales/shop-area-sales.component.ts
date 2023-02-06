import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { CategoryProductFacadeService } from '../../category-product/service/category-product-facade.service';
import { ShopFacadeService } from '../service/shop-facade.service';

@Component({
  selector: 'app-shop-area-sales',
  templateUrl: './shop-area-sales.component.html',
  styleUrls: ['./shop-area-sales.component.css']
})
export class ShopAreaSalesComponent extends AppComponentBase implements OnInit {

  page_number:number=1;
  page_size:number=10;
  @Input() shopId: number;
  @Output() areasalesCountEvent = new EventEmitter<any>();
  AreaSalesShop:any;
  constructor(private injector:Injector,
    public shopFacadeService: ShopFacadeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  )  {super(injector) }

  override ngOnInit(): void {
    this.getAreaSales();
  }

  getAreaSales(){
    const param={
      shop_id:this.shopId,
      page_number:this.page_number,
      page_size:this.page_size

    };
    this.shopFacadeService.getShopService().getAreaSales(param).subscribe((rs:any)=>{
    this.AreaSalesShop =rs.data;
    this.areasalesCountEvent.emit(this.AreaSalesShop.length);
    })
}

}
