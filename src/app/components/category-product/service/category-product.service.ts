import { Injectable } from '@angular/core';
import {RepositoryEloquentService} from "../../../services/baserepository.service";
import {ApiConstant} from "../../../shared/common/api.constants";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService extends RepositoryEloquentService {

  public baseUrl = environment.baseUrl;
  constructor(
    public override httpClient: HttpClient,
  ) {
    super();
    this.setServiceInfo({
      httpClient: this.httpClient,
    })
  }

  // @ts-ignore
  public getCategoryStandardList(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl+ ApiConstant.CategoryStandardList
    })
    return this.get(param);
  }

  // @ts-ignore
  public getCategoryRegionList(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl+ ApiConstant.CategoryRegionList
    })
    return this.get(param);
  }

  // @ts-ignore
  public getCategoryProvinceList(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CategoryProvinceList
    })
    return this.get(param);
  }

  // @ts-ignore
  public getCategoryProduct(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CategoryProductSearch
    })
    return this.post(param)
  }
  // @ts-ignore
  public getSearchProduct(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ProductSearchByKeyWord
    })
    return this.post(param)
  }
   // @ts-ignore
   public getCategory(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CategoryProductViewHome
    })
    return this.get(param)
  }
 // @ts-ignore
  public getCategoryByID(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CategoryProductGetById
    })
    return this.get(param)
  }
 // @ts-ignore
 public getProductionDiagram(param) {
  this.setServiceInfo({
    apiUrl: this.baseUrl.apiUrl + ApiConstant.ProductionDiagram
  })
  return this.get(param)
}
 // @ts-ignore
 public getShopPartner(param) {
  this.setServiceInfo({
    apiUrl: this.baseUrl.apiUrl + ApiConstant.Shop_Partner
  })
  return this.get(param)
}
// @ts-ignore
//Vat tu san xuat
public getShopMaterial(param) {
  this.setServiceInfo({
    apiUrl: this.baseUrl.apiUrl + ApiConstant.ShopMaterial
  })
  return this.get(param)
}
 // @ts-ignore
 //get categoryChild by list parentID
 public getCategoryChildByParentListID(param) {
  this.setServiceInfo({
    apiUrl: this.baseUrl.apiUrl + ApiConstant.ProductSearchByCategoryParentID
  })
  return this.post(param)
}

}
