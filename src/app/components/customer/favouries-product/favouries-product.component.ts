import { Component, OnInit } from '@angular/core';
import {CustomerFacadeService} from "../service/customer-facade.service";
import {RouterConstants} from "../../../shared/common/router.constants";
import {Router} from "@angular/router";
import {SeoUrlPipe} from "../../../shared/pipes/seo-url.pipe";

@Component({
  selector: 'app-favouries-product',
  templateUrl: './favouries-product.component.html',
  styleUrls: ['./favouries-product.component.scss']
})
export class FavouriesProductComponent implements OnInit {
  public listFollowProduct: any = [];

  constructor(
    private customerFacadeService: CustomerFacadeService,
    private router: Router,
    public seoUrlPipe: SeoUrlPipe,
  ) { }

  ngOnInit(): void {
    this.getListFollowProduct();
  }

  public getListFollowProduct() {
    this.customerFacadeService.getCustomerUserService().customerFollowProductList().subscribe((res: any) => {
      this.listFollowProduct = res.data;
    })
  }

  routeToProduct(product: any) {
    const productUrl = this.seoUrlPipe.transform(product.product_name, product.product_id);
    this.router.navigate([productUrl]);
  }

  unfollowProduct(product: any) {
    this.customerFacadeService.getCustomerUserService().customerUnfollowProduct({product_id: product.product_id}).subscribe( res => {
      this.getListFollowProduct();
    });
  }

  routeToShop(product: any) {
    this.router.navigate([`${RouterConstants.shops}/${product.shop_id}`]);
  }
}
