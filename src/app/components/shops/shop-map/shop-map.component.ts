import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ShopFacadeService} from "../service/shop-facade.service";
import {ShopAddressModel} from "../model/shop-address.model";
import {GoongjsMapService} from "../../../shared/services/goongjs-map.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-shop-map',
  templateUrl: './shop-map.component.html',
  styleUrls: ['./shop-map.component.scss']
})
export class ShopMapComponent implements OnInit, OnChanges {
  public coordinate: {lng: '105.83140708984524', lat: '21.022452089739573'}
  @Input() shopId: number;
  @Input() showMap: boolean;
  @Output() checkmapgoole = new EventEmitter<any>();
  public listAddress: ShopAddressModel[] = [];
  public goongjsMapService: GoongjsMapService;
  constructor(
    public shopFacadeService: ShopFacadeService,
    private httpClient: HttpClient
  ) {
    this.goongjsMapService = new GoongjsMapService(this.httpClient);
  }

  public ngOnInit() {
    this.getListShopAdress();
  }

  public getListShopAdress() {
    const param = {
      shop_id: this.shopId,
      type: 0,
      page_number: 0
    }
    this.shopFacadeService.getShopService().getListAddress(param).subscribe((res: any) => {
      this.listAddress = res.data.lists;
      this.checkmapgoole.emit(this.listAddress)
    })
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showMap && this.listAddress.length > 0) {
      this.listAddress.forEach(address => {
        const element = document.getElementById(address.id.toString());
        // @ts-ignore
        setTimeout( () => this.goongjsMapService.renderMap(element, address));
      })
    }
  }

}
