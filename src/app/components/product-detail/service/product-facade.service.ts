import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {

  constructor(private httpClient: HttpClient) { }

  public getProductService() {
    return new ProductService(this.httpClient)
  }
}
