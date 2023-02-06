import { ApiConstant } from '../shared/common/api.constants';
import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public baseUrl = environment.baseUrl;
  constructor(private dataService: DataService) { }

  public getListNews(data:any): Observable<any> {
    // return this.dataService.get(`${ApiConstant.Newslist}?category_id=${data.category_id}&name=${data.name}&page_number=${data.page_number}&page_size=${data.page_size}`).pipe(
    //   map((res: any) => {
    //     return res;
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     console.log(error);
    //     return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    //   }),
    // )


    // return this.dataService.get(ApiConstant.Newslist).pipe(
    //   map((res: any) => {
    //     return res;
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     console.log(error);
    //     return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    //   }),
    // )

    return this.dataService.get(`${ApiConstant.Newslist}?category_id=${data.category_id}`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }

  public getNewsDetail(id: number): Observable<any> {
    return this.dataService.get(`${ApiConstant.NewsDetail}?id=${id}`).pipe(
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
