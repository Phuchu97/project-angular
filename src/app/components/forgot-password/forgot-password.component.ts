import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShopsService } from './../../services/shops.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { ForgotPasswordShop, RegisterShop } from './../../viewModels/shops/register-shop';
import { Component, OnInit, Injector, Inject } from '@angular/core';
import { NgOtpInputConfig } from 'ng-otp-input';
import { NotifyMessageService } from 'src/app/shared/services/notify-message.service';
import { ThisReceiver } from '@angular/compiler';
import { ThumbnailsPosition } from 'ng-gallery';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
declare const countDownOTP: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})


export class ForgotPasswordComponent extends AppComponentBase implements OnInit {

  EmailOrPhone: string;
  clickStep1: boolean = true;
  clickStep2: boolean = false;
  clickStep3: boolean = false;
  disableOtp: boolean = true;
  disableRules: boolean = false;
  isOpt: boolean = true;
  messageError: boolean = false;
  forgotPasswordShop: ForgotPasswordShop = new ForgotPasswordShop;
  inputPassword: string;
  inputRePassword: string;
  strOtp: string;
  is_phone_number: boolean = false;
  is_email_address: boolean = false;
  public errorComfirmPassword: boolean = false;
  otpInputConfig: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  confirmRules: boolean = true;
  constructor(private injector: Injector, private shopService: ShopsService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { super(injector) }

  override ngOnInit(): void {
    this.messageError = false;
   
  }
  nextStep2() {
    //check trùng
    this.shopService.checkExistUser(this.EmailOrPhone).subscribe(rs => {
      if (rs.statusCode == 500) {
        this.sendOtp();
      }

      else {
        this.messageError = true;//mở thông báo
      
      }
    })

  }
  showOtpComponent = true;
  sendOtp() {

    this.showOtpComponent = false;
    
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
    if (this.validatePhoneNumber(this.EmailOrPhone)) {
      this.is_phone_number = true;
      // this.clickStep1=false;
      //   this.clickStep2=true;
      this.shopService.CreateOtpSMSForgotPassword(this.EmailOrPhone).subscribe(r => {
        this.clickStep1 = false;
        this.clickStep2 = true;
        countDownOTP();
      })
    }
    else if (this.validateEmail(this.EmailOrPhone)) {
      this.is_email_address = true;
      this.clickStep1 = false;
      this.clickStep2 = true;
    }
  }
  //Mỗi lần thay đổi input opt
  onInputChange(e: any) {
    if (e.length == this.otpInputConfig.length) {
      // e will emit values entered as otp and,
      this.strOtp = e;
      this.disableOtp = false;
    } else {
      this.disableOtp = true;
      this.messageError = false;//tắt thông báo
    }
  }
  //check OPT, nếu đúng thì sang bước 3, nếu sai báo sai opt, hết hạn cho phép gửi lại opt mới
  nextStep3() {
    if (this.is_phone_number) {
      // this.clickStep3 =true;
      //    this.clickStep2=false;
      this.shopService.CheckOtpForgotPassword(this.EmailOrPhone, this.strOtp).subscribe(rs => {
        if (rs.statusCode == 200) {
          this.clickStep3 = true;
          this.clickStep2 = false;
        }
        else {
          this.messageError = true;//hiện thông báo
        }
      })
    }
    else if (this.is_email_address) {
      this.shopService.CheckOtpEmailForgotPassword(this.EmailOrPhone, this.strOtp).subscribe(rs => {
        if (rs.statusCode == 200) {
          this.clickStep3 = true;
          this.clickStep2 = false;
        }
        else {
          this.messageError = true;//hiện thông báo
        }
      })
    }
    //kiểm tra opt, nếu đúng thì sang bước 3

  }
  succesForgotPassword() {
    this.shopService.forgotPassword(this.EmailOrPhone, this.inputPassword).subscribe(rs => {
      this.toast.success("Chào mừng bạn đến với hệ thống dành cho người bán hàng của SmartGap.", "ĐỔI MẬT KHẨU THÀNH CÔNG!",
        {
          positionClass: 'toast-center-center',
        }
      )
      let urlLoginShop = environment.baseUrl.webShopAdmin;
      this.document.location.href = urlLoginShop;
    })
  }
  showPass(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  validateEmail(email: string): boolean {
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
  }
  validatePhoneNumber(phone_number: string): boolean {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone_number);
  }

  fieldsChange = (evt: any) => {
    this.confirmRules = evt.target.checked;
    if (this.confirmRules == true) { this.disableRules = false } else { this.disableRules = true }
  }
  checkPassword($event: any) {
    const password = $event.target.value;
    const confirm_new_password = this.inputRePassword;
    if (password !== undefined) {
      if (confirm_new_password !== password) {
        this.errorComfirmPassword = true;
      } else {
        this.errorComfirmPassword = false;
      }
    }
  }
  checkRePassword($event: any) {
    const password = this.inputPassword;
    const confirm_new_password = $event.target.value;
    if (password !== undefined) {
      if (confirm_new_password !== password) {
        this.errorComfirmPassword = true;
      } else {
        this.errorComfirmPassword = false;
      }
    }
  }
}
