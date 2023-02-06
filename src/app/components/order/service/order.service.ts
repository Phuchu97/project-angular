import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from "../../../services/baserepository.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ApiConstant } from "../../../shared/common/api.constants";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends RepositoryEloquentService {

  public baseUrl = environment.baseUrl
  constructor(
    public override httpClient: HttpClient,
  ) {
    super();
    this.setServiceInfo({
      httpClient: this.httpClient,
      apiUrl: this.baseUrl.apiUrl + ApiConstant.Oder
    })
  }

  // @ts-ignore
  public creatOrder(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.OderCreat
    })
    return this.post(body)
  }

  // @ts-ignore
  public getVoucherByShopId(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ShopVoucherListForCustomer
    });
    return this.post(body)
  }

  // @ts-ignore
  public getProductCartList(body: number[]) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ProductCartList
    });
    return this.post(body)
  }

  // @ts-ignore
  public getProductFlashsaleCheckList(body: number[]) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ProductFlashsaleCheckList
    });
    return this.post(body)
  }

  // @ts-ignore
  public getVoucher(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerVoucherSmartGap
    });
    return this.post(body)
  }

  // @ts-ignore
  public getShippingCost(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.OderShipFee
    });
    return this.post(body)
  }

  // @ts-ignore
  public OrderShippingPriceGrab(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.OrderShippingPriceGrab
    });
    return this.post(body)
  }

  // @ts-ignore
  public OrderShippingPriceGhtk(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.OrderShippingPriceGhtk
    });
    return this.post(body)
  }

  // @ts-ignore
  public getProductPrice(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ProductPrice
    });
    return this.get(param)
  }

  // @ts-ignore
  public getListProductPrice(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.ProductListPrice
    });
    return this.post(body)
  }

  // @ts-ignore
  public applyShopVoucher(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerApplyShopVoucher
    });
    return this.post(body)
  }

  // @ts-ignore
  public applyVoucher(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CustomerApplyVoucher
    });
    return this.get(param)
  }

  // @ts-ignore
  public VoucherCustomerCheckDiscount(body) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.VoucherCustomerCheckDiscount
    });
    return this.post(body)
  }

  // @ts-ignore
  public cancelOrder(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.OderCancel
    });
    return this.get(param)
  }
}
