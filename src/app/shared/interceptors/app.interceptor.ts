import { AppStatusCode, TokenEnum } from '../common/app.constants';
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";
import {ModalLoginCustomerComponent} from "../components/modal-login-customer/modal-login-customer.component";
import {NotifyMessageService} from "../services/notify-message.service";
import {DialogService} from "../services/dialog.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const notifyMessageService = this.injector.get(NotifyMessageService)
    const router = this.injector.get(Router);
    const dialogService = this.injector.get(DialogService);
    const token = authService.getToken(TokenEnum.ACCESS_TOKEN) ? authService.getToken(TokenEnum.ACCESS_TOKEN) : '';
    const reqHeader = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(reqHeader).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        if (err.status === 401) {
          authService.logout();
          notifyMessageService.warning("Phiên đăng nhập hết hạn vui lòng đăng nhập lại!");
          const context = {
            redirectUrl: router.url,
            isShowPopup: true
          }
          dialogService.openDialogComponent(ModalLoginCustomerComponent, context, true).then(() => {
          });
        }

        const error = err.message || err.statusText;

        return throwError(error);
      }),
    );
  }
}
