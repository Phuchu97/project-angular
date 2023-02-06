import { Injectable } from '@angular/core';
import {RepositoryEloquentService} from "../../../services/baserepository.service";
import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../../../shared/common/api.constants";
import {environment} from "../../../../environments/environment";
import { ApiStorageConstant } from 'src/app/shared/common/api-storage';

@Injectable({
  providedIn: 'root'
})
export class CustomerUserService extends RepositoryEloquentService{
  public baseUrl = environment.baseUrl
  constructor(
    public override httpClient: HttpClient,
  ) {
    super();
    this.setServiceInfo({
      httpClient: this.httpClient,
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerUser
    })
  }

  // @ts-ignore
  public customerUserModify(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl+ ApiConstant.CustomerUserModify
    })
    return this.post(body);
  }

  // @ts-ignore
  public customerUserChangepass(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerUserChangePassword
    })
    return this.post(body);
  }

  // @ts-ignore
  public customerUserAddressList(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerAddressList
    })
    return this.get(body);
  }

  // @ts-ignore
  public customerUserAddressModify(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerAddressModify
    })
    return this.post(body);
  }

  // @ts-ignore
  public customerUserAddressDelete(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerAddressDelete
    })
    return this.delete(param);
  }

  // @ts-ignore
  public customerAddress(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerAddress
    })
    return this.get(param);
  }

  // @ts-ignore
  public customerUserAddressCreate(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerAddressCreate
    })
    return this.post(body);
  }

  // @ts-ignore
  public customerFollowProduct(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerFollowProduct
    })
    return this.post(body);
  }

  // @ts-ignore
  public customerUnfollowProduct(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerUnfollowProduct
    })
    return this.delete(param);
  }

  // @ts-ignore
  public customerFollowProductList() {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerFollowProductList
    })
    return this.get();
  }

  // @ts-ignore
  public uploadFile(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiCommonUrl + ApiStorageConstant.UploadImg
    })
    return this.addFile(body);
  }

  // @ts-ignore
  public getCustomerOrderList(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.OderList
    })
    return this.post(body);
  }

  // @ts-ignore
  public modifyCustomerAvatar(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerModifyAvatar
    })
    return this.post(body);
  }

  // @ts-ignore
  public addVocher(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerAddVoucher
    })
    return this.post(body);
  }

  // @ts-ignore
  public getCustomerVoucherList(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerVoucherList
    })
    return this.get(param);
  }

  // @ts-ignore
  public customerFollowShop(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerFollowShop
    })
    return this.post(body);
  }

  // @ts-ignore
  public customerUnfollowShop(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerUnfollowShop
    })
    return this.delete(param);
  }

  public customerFollowShopList() {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerFollowShopList
    })
    return this.get();
  }

  // @ts-ignore
  public customerCheckFollowProduct(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerCheckFollowProduct
    })
    return this.get(param);
  }

  // @ts-ignore
  public customerCheckFollowShop(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerCheckFollowShop
    })
    return this.get(param);
  }
}
