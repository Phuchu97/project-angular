import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RepositoryEloquentService} from "./baserepository.service";
import {ApiConstant} from "../shared/common/api.constants";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends RepositoryEloquentService{

  public baseUrl = environment.baseUrl;
  constructor(
    public override httpClient: HttpClient,
  ) {
    super();
  }

  // @ts-ignore
  public getCategoryProvince(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CategoryProvince
    })
    return this.get(param)
  }

  // @ts-ignore
  public getCategoryDistrictbyProvince(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl  + ApiConstant.CategoryDisTrictListProvince
    })
    return this.get(param)
  }

  // @ts-ignore
  public getCategoryWardByDistrict(param) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl  + ApiConstant.CategoryWardListDistrict
    })
    return this.get(param)
  }

  public getListCategoryNews(param:any) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl  + ApiConstant.CategoryNewsGetAll+"?language_code="+param.language_code+"&code="+param.code+"&name="+param.name
    })
    return this.get(param)
    // return this.dataService.get(ApiConstant.CategoryNewsGetAll+"?language_code="+language_code+"&code="+code+"&name="+name).pipe(
    //   map((res: any) => {
    //     return res;
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     console.log(error);
    //     return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    //   }),
    // )
  }
}
