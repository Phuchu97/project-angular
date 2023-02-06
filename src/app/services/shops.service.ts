import { ForgotPasswordShop, RegisterShop } from './../viewModels/shops/register-shop';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConstant } from '../shared/common/api.constants';
import { DataService } from '../shared/services/data.service';
import { VoucherShop } from '../viewModels/shops/shops';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private dataService:DataService) { }

public registerShop(request:RegisterShop): Observable<any> {
  return this.dataService.post(ApiConstant.RegisterShop,request).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}

public checkExistUser(username:string): Observable<any> {
  return this.dataService.get(ApiConstant.CheckUserName+"?username="+username).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
//tạo otp gửi vào phone or email
public CreateOtpSMS(phone_number:string): Observable<any> {
  return this.dataService.get(ApiConstant.CreateOtpSMS+"?phone_number="+phone_number).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}

public CreateOtpEmail(email:string): Observable<any> {
  return this.dataService.get(ApiConstant.CreateOtpEmail+"?email="+email).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}

//check otp
public CheckOtp(phoneOrEmail:string,otp:string): Observable<any> {
  return this.dataService.get(ApiConstant.CheckOtp+"?phone_number="+phoneOrEmail+"&otp="+otp).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
public CheckOtpEmail(phoneOrEmail:string,otp:string): Observable<any> {
  return this.dataService.get(ApiConstant.CheckOtpEmail+"?email="+phoneOrEmail+"&otp="+otp).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}

//OTP quên mật khẩu
public CreateOtpSMSForgotPassword(phone_number:string): Observable<any> {
  return this.dataService.get(ApiConstant.CreateOtpSMSForgotPassword+"?phone_number="+phone_number).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
public CreateOtpEmailForgotPassword(email:string): Observable<any> {
  return this.dataService.get(ApiConstant.CreateOtpEmail+"?email="+email).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
//check otp
public CheckOtpForgotPassword(phoneOrEmail:string,otp:string): Observable<any> {
  return this.dataService.get(ApiConstant.CheckOtpForgotPassword+"?phone_number="+phoneOrEmail+"&otp="+otp).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
public CheckOtpEmailForgotPassword(phoneOrEmail:string,otp:string): Observable<any> {
  return this.dataService.get(ApiConstant.CheckOtpEmailForgotPassword+"?email="+phoneOrEmail+"&otp="+otp).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
public forgotPassword(phone_number:string,passwordnew:string): Observable<any> {
  return this.dataService.get(ApiConstant.ForgotPasswordShop+"?phone_number="+phone_number+"&passwordnew="+passwordnew).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}
//end


//get voucher theo shop
public VoucherShop(request:VoucherShop): Observable<any> {
  return this.dataService.post(ApiConstant.VoucherShop,request).pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }),
  )
}


}
