import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConstant } from '../shared/common/api.constants';
import { DataService } from '../shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryStandardService {

  constructor(private dataService:DataService) { }

public categoryStandardByID(id:number): Observable<any> {
  return this.dataService.get(ApiConstant.CategoryProductStandardGetById+"?id="+id).pipe(
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
