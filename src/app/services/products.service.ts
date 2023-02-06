import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConstant } from '../shared/common/api.constants';
import { DataService } from '../shared/services/data.service';
import { FlashSaleHome } from '../viewModels/customers/flashsale-home';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private dataService:DataService) { }

public productSmartMallHome(language_code:string,keyword:string,page_number:number,page_size:number): Observable<any> {
  return this.dataService.get(ApiConstant.ProductSmartMallHome+"?language_code="+language_code+"&keyword="+keyword+"&page_number="+page_number+"&page_size="+page_size).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}

public productSmartMallHomeReal(keyword:string,page_number:number,page_size:number): Observable<any> {
  return this.dataService.get(ApiConstant.ProductSmartMallHomeReal+"?keyword="+keyword+"&page_number="+page_number+"&page_size="+page_size).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}

public productAreaHome(category_area_id:number,language_code:string,keyword:string,page_number:number,page_size:number): Observable<any> {
  return this.dataService.get(ApiConstant.ProductAreaHome+"?category_area_id="+category_area_id+ "&keyword="+keyword+"&language_code="+language_code+"&page_number="+page_number+"&page_size="+page_size).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
public productSearchHome(language_code:string,page_number:number,page_size:number): Observable<any> {
  return this.dataService.get(ApiConstant.ProductSearchHome+"?language_code="+language_code+"&page_number="+page_number+"&page_size="+page_size).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
//sugget to day
public productSuggetTodayHome(language_code:string,page_number:number,page_size:number): Observable<any> {
  return this.dataService.get(ApiConstant.ProductSuggetToday+"?language_code="+language_code+"&page_number="+page_number+"&page_size="+page_size).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}

//smart mall all
public productSmartMallAll(language_code:string,page_number:number,page_size:number): Observable<any> {
  return this.dataService.get(ApiConstant.ProductSmartMallAll+"?language_code="+language_code+"&page_number="+page_number+"&page_size="+page_size).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
//area all
public productAreaAll(language_code:string,page_number:number,page_size:number): Observable<any> {
  return this.dataService.get(ApiConstant.ProductAreaAll+"?language_code="+language_code+"&page_number="+page_number+"&page_size="+page_size).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
//flashsale
public productFlashSale(): Observable<any>{
  return this.dataService.get(ApiConstant.ProductFlashSaleAll).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
//product flash sale future
public productFlashSaleFuture(): Observable<any>{
  return this.dataService.get(ApiConstant.ProductFlashSaleAll).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
//Flashsale đang diễn ra
public FlashSaleHappenning(request:FlashSaleHome): Observable<any> {
  return this.dataService.post(ApiConstant.FlashSaleHappenning,request).pipe(
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
