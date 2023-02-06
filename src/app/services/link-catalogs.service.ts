import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConstant } from '../shared/common/api.constants';
import { DataService } from '../shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class LinkCatalogsService {

  constructor(private dataService:DataService) { }
  // public getLinkCatalogs(language_code:string):Observable<any>{
  //   return this.dataService.get(ApiConstant.CategoryLinkList+"?language_code="+language_code);
  // }
  public getLinkCatalogs(language_code:string):Observable<any>{
    return this.dataService.get(ApiConstant.CategoryLinkList+"?language_code="+language_code).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }

  public getCategoryStandardListView(language_code:string):Observable<any>{
    return this.dataService.get(ApiConstant.CategoryStandardListView+"?language_code="+language_code).pipe(
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
