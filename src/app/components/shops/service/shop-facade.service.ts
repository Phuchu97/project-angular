import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopService} from "./shop.service";

@Injectable({
  providedIn: 'root'
})
export class ShopFacadeService {

  constructor(private httpClient: HttpClient) { }

  public getShopService() {
    return new ShopService(this.httpClient)
  }
}
