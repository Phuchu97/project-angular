import {Component, Input, OnInit} from '@angular/core';
import {ShopFacadeService} from "../service/shop-facade.service";
import {ShopModel} from "../model/shop.model";
import { ShopTypeConstant } from 'src/app/shared/common/app.constants';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {

  @Input() shopId: number;
  shopType:number;
  public shopInfo: ShopModel;
  public keywordSearch: string = "";
  shopTypeConstant:typeof ShopTypeConstant=ShopTypeConstant;
  constructor(
    public shopFacadeService: ShopFacadeService
  ) { }

  ngOnInit(): void {
    this.getShopInfo();
  }

  public getShopInfo() {
    this.shopFacadeService.getShopService().get({id : this.shopId}).subscribe( (res: any) => {
      this.shopInfo = res.data;
      this.shopType =res.data.type;
    })
  }

  public chatNow() {

  }

  public followShop() {

  }

  public searchShopProduct() {

  }
}
