import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerUserService} from "./customer-user.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerFacadeService {

  constructor(private httpClient: HttpClient) { }

  public getCustomerUserService() {
    return new CustomerUserService(this.httpClient)
  }
}
