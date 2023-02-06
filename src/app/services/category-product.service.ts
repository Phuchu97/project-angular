import { ApiConstant } from './../shared/common/api.constants';
import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  constructor(private dataService:DataService) { }
  public getListCategoryProductMenu(language_code:string):Observable<any>{
    return this.dataService.get(ApiConstant.CategoryProductMenu+"?language_code="+language_code);
  }

  public getCategoryProductShowHome(language_code:string): Observable<any> {
    return this.dataService.get(ApiConstant.CategoryProductViewHome+"?language_code="+language_code).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }

  public getCategoryProductGetById(id:number): Observable<any> {
    return this.dataService.get(ApiConstant.CategoryProductGetById+"?id="+id).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }
//get child by parentID
  public getCategoryChildByParentID(parent_id:number,language_code:string): Observable<any> {
    return this.dataService.get(ApiConstant.CategoryProductByParentID+"?parent_id="+parent_id+"&language_code="+language_code ).pipe(
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
