import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryService} from "./category.service";

@Injectable({
  providedIn: 'root'
})
export class CommonFacadeService {

  constructor(private httpClient: HttpClient) { }

  public categoryService() {
    return new CategoryService(this.httpClient)
  }
}
