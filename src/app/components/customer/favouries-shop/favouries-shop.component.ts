import { Component, OnInit } from '@angular/core';
import {CustomerFacadeService} from "../service/customer-facade.service";
import {RouterConstants} from "../../../shared/common/router.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favouries-shop',
  templateUrl: './favouries-shop.component.html',
  styleUrls: ['./favouries-shop.component.scss']
})
export class FavouriesShopComponent implements OnInit {

  public listFollowShop: any = []

  constructor(
    private customerFacadeService: CustomerFacadeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getListFollowShop();
  }

  public getListFollowShop() {
    this.customerFacadeService.getCustomerUserService().customerFollowShopList().subscribe((res: any) => {
      this.listFollowShop = res.data;
    });
  }

  // @ts-ignore
  routeToShop(shop) {
    this.router.navigate([`${RouterConstants.shops}/${shop.shop_id}`]);
  }

  // @ts-ignore
  unfollowShop(shop: any) {
    this.customerFacadeService.getCustomerUserService().customerUnfollowShop({shop_id: shop.shop_id}).subscribe( res => {
      this.getListFollowShop();
    });
  }

  // @ts-ignore
  chatNow(shop: any) {

  }
}
