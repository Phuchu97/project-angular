import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private baseUrl: string;
  public baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
    // this.baseUrl = environment.apiUrl;
  }

  get(url: string) {
    url = this.baseUrl.apiUrl + url;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(url, { headers });
  }

  post(url: string, data?: any) {
    url = this.baseUrl.apiUrl + url;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url, data, { headers });
  }

  put(url: string, data?: any) {
    url = this.baseUrl.apiUrl + url;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(url, data, { headers });
  }

  delete(url: string, id: number) {
    url = this.baseUrl.apiUrl + url;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.delete(url + id, { headers });
  }
}
