import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { CategoryProductFacadeService } from '../../category-product/service/category-product-facade.service';

@Component({
  selector: 'app-production-diagram',
  templateUrl: './production-diagram.component.html',
  styleUrls: ['./production-diagram.component.css']
})
export class ProductionDiagramComponent extends AppComponentBase implements OnInit {
  @Input() shopId: number;
  page_number:number=1;
  page_size:number=10;
  productionDiagram:any;
  constructor(private injector:Injector,
    private categoryProductFacadeService: CategoryProductFacadeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  )  {super(injector) }

  override ngOnInit(): void {
    this.getProductionDiagram();
  }

  getProductionDiagram(){
    const param={
      shop_id:this.shopId,
      name:"",
      page_number:this.page_number,
      page_size:this.page_size

    };
    this.categoryProductFacadeService.getCategoryProductService().getProductionDiagram(param).subscribe((rs:any)=>{
    this.productionDiagram =rs.data.lists;
    })
}

}
