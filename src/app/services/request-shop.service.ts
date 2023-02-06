import { RequestShop } from './../../viewModels/request-shop';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConstant } from '../shared/common/api.constants';
import { DataService } from '../shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RequestShopService {

  constructor(private dataService:DataService) { }

public requestShop(request:RequestShop): Observable<any> {
  return this.dataService.post(ApiConstant.RequestShop,request).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}

}
