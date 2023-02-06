import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConstant } from '../shared/common/api.constants';
import { DataService } from '../shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class BannerSlideService {

  constructor(private dataService:DataService) { }

  public getBannerSlideHome(location_id:number):Observable<any>{
    return this.dataService.get(ApiConstant.BannerSlide+"?location_id="+location_id).pipe(
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
