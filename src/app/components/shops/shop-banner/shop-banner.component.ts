import {Component, Input, OnInit} from '@angular/core';
import {ShopFacadeService} from "../service/shop-facade.service";

@Component({
  selector: 'app-shop-banner',
  templateUrl: './shop-banner.component.html',
  styleUrls: ['./shop-banner.component.css']
})
export class ShopBannerComponent implements OnInit {
  @Input() shopId: number;
  constructor(
    public shopFacadeService: ShopFacadeService
  ) { }

  ngOnInit(): void {
  }

}
