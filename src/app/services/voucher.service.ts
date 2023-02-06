import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConstant } from '../shared/common/api.constants';
import { DataService } from '../shared/services/data.service';
import { VoucherShop } from '../viewModels/customers/voucher-shop';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private dataService: DataService) { }
  //get voucher shop
  public getShopVoucher(request: VoucherShop): Observable<any> {
    return this.dataService.post(ApiConstant.ShopVoucherListForCustomer, request).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }
  //get voucher smartgap
  public getSmartGapVoucher(request: VoucherShop): Observable<any> {
    return this.dataService.post(ApiConstant.CustomerVoucherSmartGap, request).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }

  public voucherGetByIdUrl(id: string): Observable<any> {
    return this.dataService.get(ApiConstant.VoucherGetByIdUrl + "?id=" + id).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }

}
