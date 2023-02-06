import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { CategoryProductFacadeService } from '../../category-product/service/category-product-facade.service';

@Component({
  selector: 'app-shop-partner',
  templateUrl: './shop-partner.component.html',
  styleUrls: ['./shop-partner.component.css']
})
export class ShopPartnerComponent extends AppComponentBase implements OnInit {
  @Input() shopId: number;
  @Output() shopPartner = new EventEmitter();
  page_number:number=1;
  page_size:number=10;
  productionDiagram:any;
  constructor(private injector:Injector,
    private categoryProductFacadeService: CategoryProductFacadeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  )  {super(injector) }

  override ngOnInit(): void {
    this.getShopPartner();
  }

  getShopPartner(){
    const param={
      shop_id:this.shopId,
      page_number:this.page_number,
      page_size:this.page_size

    };
    this.categoryProductFacadeService.getCategoryProductService().getShopPartner(param).subscribe((rs:any)=>{
    this.productionDiagram =rs.data.lists;
    this.shopPartner.emit(this.productionDiagram.length);
    })
}


}
