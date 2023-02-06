import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConstant } from '../shared/common/api.constants';
import { DataService } from '../shared/services/data.service';
import { RegisCustomer } from '../viewModels/customers/register-customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private dataService: DataService) { }

  public registerCustomer(request: RegisCustomer): Observable<any> {
    return this.dataService.post(ApiConstant.RegisterCustomer, request).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }

  public getPaymentReturn(data): Observable<any> {
    return this.dataService.get(ApiConstant.PaymentReturn + "?vnp_Amount=" + data.vnp_Amount + "&vnp_BankCode=" + data.vnp_BankCode + "&vnp_BankTranNo=" + data.vnp_BankTranNo + "&vnp_CardType=" + data.vnp_CardType + "&vnp_OrderInfo=" + data.vnp_OrderInfo + "&vnp_PayDate=" + data.vnp_PayDate + "&vnp_ResponseCode=" + data.vnp_ResponseCode + "&vnp_TmnCode=" + data.vnp_TmnCode + "&vnp_TransactionNo=" + data.vnp_TransactionNo + "&vnp_TxnRef=" + data.vnp_TxnRef + "&vnp_SecureHashType=" + data.vnp_SecureHashType+ "&vnp_SecureHash=" + data.vnp_SecureHash+ "&vnp_TransactionStatus=" + data.vnp_TransactionStatus);
  }

  //tạo otp gửi vào phone or email
  public CreateOtpSMS(phone_number: string): Observable<any> {
    return this.dataService.get(ApiConstant.CreateOtpSMSCustomer + "?phone_number=" + phone_number).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }
  public CreateOtpEmail(email: string): Observable<any> {
    return this.dataService.get(ApiConstant.CreateOtpEmailCustomer + "?email=" + email).pipe(
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
  public CheckOtp(phoneOrEmail: string, otp: string): Observable<any> {
    return this.dataService.get(ApiConstant.CheckOtpCustomer + "?phone_number=" + phoneOrEmail + "&otp=" + otp).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }
  public CheckOtpEmail(phoneOrEmail: string, otp: string): Observable<any> {
    return this.dataService.get(ApiConstant.CheckOtpEmailCustomer + "?email=" + phoneOrEmail + "&otp=" + otp).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }

  //tạo otp gửi vào phone or email lấy lại mật khẩu
  public CreateOtpSMS_ForgotPass(phone_number: string): Observable<any> {
    return this.dataService.get(ApiConstant.CreateOtpSMSCustomer_ForgotPass + "?phone_number=" + phone_number).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }
  public CreateOtpEmail_ForgotPass(email: string): Observable<any> {
    return this.dataService.get(ApiConstant.CreateOtpEmailCustomer_ForgotPass + "?email=" + email).pipe(
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
  public CheckOtpSMS_ForgotPass(phoneOrEmail: string, otp: string): Observable<any> {
    return this.dataService.get(ApiConstant.CheckOtpSMSCustomer_ForgotPass + "?phone_number=" + phoneOrEmail + "&otp=" + otp).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }
  public CheckOtpEmail_ForgotPass(phoneOrEmail: string, otp: string): Observable<any> {
    return this.dataService.get(ApiConstant.CheckOtpEmailCustomer_ForgotPass + "?email=" + phoneOrEmail + "&otp=" + otp).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }
  public ForgotPass(phone_number: string, passwordnew: string): Observable<any> {
    return this.dataService.get(ApiConstant.ForgotPass + "?phone_number=" + phone_number + "&passwordnew=" + passwordnew).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }



  //check exist user name
  public CheckExistUserName(username: string): Observable<any> {
    return this.dataService.get(ApiConstant.CheckExistCustomer + "?username=" + username).pipe(
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
