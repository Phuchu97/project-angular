import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RepositoryEloquentService } from 'src/app/services/baserepository.service';
import { ApiConstant } from 'src/app/shared/common/api.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends RepositoryEloquentService {
  public baseUrl = environment.baseUrl
  constructor(
    public override httpClient: HttpClient,
  ) {
    super();
    this.setServiceInfo({
      httpClient: this.httpClient,
      apiUrl: this.baseUrl.apiUrl + ApiConstant.UrlNotifyByUser
    })
  }

  // @ts-ignore
  public GetAllNotify(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.UrlNotifyByUser
    })
    return this.get(param);
  }

  // public getCategoryChildByParentID(parent_id:number,language_code:string): Observable<any> {
  //   return this.dataService.get(ApiConstant.CategoryProductByParentID+"?parent_id="+parent_id+"&language_code="+language_code ).pipe(
  //     map((res: any) => {
  //       return res;
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.log(error);
  //       return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
  //     }),
  //   )
  // }

}
