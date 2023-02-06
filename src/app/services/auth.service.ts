import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiConstant } from '../shared/common/api.constants';
import { AppStatusCode, TokenEnum } from '../shared/common/app.constants';
import { CookieProvider } from '../shared/providers/cookie.provider';
import { StorageService } from '../shared/services/storage.service';
import { DataService } from '../shared/services/data.service';
import { ReqLogin } from '../viewModels/auth/req-login';

@Injectable()
export class AuthService {
  public redirectUrl?: string;

  constructor(private router: Router,
    private dataService: DataService,
    private storeService: StorageService,
    private cookieService: CookieProvider,
    ) {
  }

  public getToken(token: TokenEnum) {
    return this.storeService.get(token);
  }

  public signIn(request: ReqLogin): Observable<any> {
    return this.dataService.post(ApiConstant.LoginUrl, request).pipe(
      map((res: any) => {
        if (res.statusCode === AppStatusCode.StatusCode200) {
          this.setStoreToken(res['data']['token']);
          this.storeUserInfor(res['data']);
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = undefined;
          } else {
            this.router.navigate(['/']);
          }

        }

        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }

  // public refreshToken(): Observable<any> {
    // const token: Token = {
    //   accessToken: this.getToken(TokenEnum.ACCESS_TOKEN),
    //   refreshToken: this.getToken(TokenEnum.REFRESH_TOKEN)
    // };
    // return this.http.post<Token>(refreshTokenApiUrl, token).pipe(
    //   tap((data: Token) => {
    //     this.storeToken(data);
    //     return data;
    //   }),
    //   catchError(err => {
    //     return throwError(err);
    //   })
    // );
  // }

  public setStoreToken(accessToken: string, refreshToken?: string): void {
    this.storeService.set(TokenEnum.ACCESS_TOKEN, accessToken);

    if (refreshToken) {
      this.storeService.set(TokenEnum.REFRESH_TOKEN, refreshToken);
    }
  }

  // public decodeJwtToken(token): any {
  //   return jwt_decode(token);
  // }

  public storeUserInfor(data:any): void {
    this.storeService.set('full_name', data.full_name);
    this.storeService.set('username', data.username);
    this.storeService.set('avatar', data.avata);
    this.storeService.set('id', data.id);
    // this.storeService.set('address', data.address);

    // this.storeService.set('phone_number', data.phone);
    // this.storeService.set('email', data.email);
    // this.storeService.set('is_active', data.status);
    // this.storeService.set('access_key', data.access_key);
    // this.storeService.set('menu', JSON.stringify(data['listMenus']));
  }

  public logout(): void {
    // this.storeService.delete(TokenEnum.ACCESS_TOKEN);
    this.storeService.clear();
    this.router.navigate(['/']);
  }
}
