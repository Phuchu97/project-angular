import { Injectable } from '@angular/core';
import {RepositoryEloquentService} from "../../../services/baserepository.service";
import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../../../shared/common/api.constants";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShopService extends RepositoryEloquentService{

  public baseUrl = environment.baseUrl;
  constructor(
    public override httpClient: HttpClient,
  ) {
    super();
    this.setServiceInfo({
      httpClient: this.httpClient,
      apiUrl: this.baseUrl.apiUrl + ApiConstant.Shop
    })
  }

  // @ts-ignore
  public getShopProduct(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ShopPoduct
    })
    return this.post(body)
  }

  // @ts-ignore
  public getMaterial(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ShopMaterialArea
    })
    return this.get(param)
  }

  // @ts-ignore
  public getFactory(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ShopFactory
    })
    return this.get(param)
  }

  // @ts-ignore
  public getSeedMaterial(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ShopSeedMaterial
    })
    return this.get(param)
  }

    // @ts-ignore
    public getAreaSales(param) {
      this.setServiceInfo({
        apiUrl: this.baseUrl.apiUrl + ApiConstant.ShopAreaSales
      })
      return this.get(param)
    }

  // @ts-ignore
  public getListAddress(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ShopAddress
    })
    return this.get(param)
  }
}
