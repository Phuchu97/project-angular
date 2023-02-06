import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderService} from "./order.service";

@Injectable({
  providedIn: 'root'
})
export class OrderFacadeService {

  constructor(private httpClient: HttpClient) { }

  public oderService() {
    return new OrderService(this.httpClient)
  }
}
