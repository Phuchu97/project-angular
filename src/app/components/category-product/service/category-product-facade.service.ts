import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryProductService} from "./category-product.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryProductFacadeService {

  constructor(private httpClient: HttpClient) { }

  public getCategoryProductService() {
    return new CategoryProductService(this.httpClient)
  }
}
