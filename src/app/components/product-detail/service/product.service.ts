import { Injectable } from '@angular/core';
import {RepositoryEloquentService} from "../../../services/baserepository.service";
import {ApiConstant} from "../../../shared/common/api.constants";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends RepositoryEloquentService {

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
  public getProduct(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.Product
    })
    return this.get(param);
  }

    // @ts-ignore
  public ProductRelatedCustomerSearch(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ProductRelatedCustomerSearch
    })
    return this.post(param)
  }
  // @ts-ignore
  public getProductDescription(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.Product
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductProcess(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductProductionProcess
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductCamLive(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.Product
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductCertificate(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductCertificate
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductSeedMeterial(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductMeterial
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductTechnicalProcess(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.Product
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductMeterial(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductMeterial
    })
    return this.get(param);
  }

  // @ts-ignore
  public updateCountView(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductUpdateCountView
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductProcessLogList(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductProductionLogList
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductFactoryList(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductFactory
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductMaterialAreaList(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductMaterialArea
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductSeedMaterialList(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductSeedMaterial
    })
    return this.get(param);
  }

  // @ts-ignore
  public getProductProcessEngineeringList(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductEngineeringProcess
    })
    return this.get(param);
  }

  // @ts-ignore
  public checkProductFlashsale(param) {
    this.setServiceInfo({
      apiUrl:this.baseUrl.apiUrl + ApiConstant.ProductFlashSale
    })
    return this.get(param);
  }

}
