import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShopsService } from './../../services/shops.service';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { RegisterShop } from './../../viewModels/shops/register-shop';
import { Component, OnInit, Injector, Inject } from '@angular/core';
import { NgOtpInputConfig } from 'ng-otp-input';
import { NotifyMessageService } from 'src/app/shared/services/notify-message.service';
import { ThisReceiver } from '@angular/compiler';
import { ThumbnailsPosition } from 'ng-gallery';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
declare const countDownOTP: any;
@Component({
  selector: 'app-regis-shop',
  templateUrl: './regis-shop.component.html',
  styleUrls: ['./regis-shop.component.css']
})
export class RegisShopComponent extends AppComponentBase implements  OnInit {

  EmailOrPhone:string;
  clickStep1:boolean=true;
  clickStep2:boolean=false;
  clickStep3:boolean=false;
  disableOtp:boolean=true;
  disableRules:boolean=false;
  isOpt:boolean=true;
  messageError:boolean=false;
  registerShop:RegisterShop =new RegisterShop;
  inputPassword:string;
  strOtp:string;
  is_phone_number:boolean=false;
  is_email_address:boolean=false;
  otpInputConfig: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  confirmRules:boolean=true;
  constructor(
    private injector:Injector,
    private shopService:ShopsService,
    private router:Router,
    @Inject(DOCUMENT) private document: Document
    )
  {super(injector) }
  override ngOnInit(): void {
  }
  nextStep2(){
    //check trùng
    this.shopService.checkExistUser(this.EmailOrPhone).subscribe(rs=>{
      if(rs.statusCode!=200)
      {
        this.messageError=true;//mở thông báo
      }
      else
      {
        //gửi otp

       this.sendOtp();
      }
    })
  }

  sendOtp()
  {
    if(this.validatePhoneNumber(this.EmailOrPhone))
    {
      this.is_phone_number=true;
      this.shopService.CreateOtpSMS(this.EmailOrPhone).subscribe(r=>{
        this.clickStep1=false;
        this.clickStep2=true;
        countDownOTP();
      })
    }
    else  if(this.validateEmail(this.EmailOrPhone))
    {
      this.is_email_address=true;
      this.clickStep1=false;
      this.clickStep2=true;
    }
  }
  //Mỗi lần thay đổi input opt
  onInputChange(e:any) {
    if(e.length == this.otpInputConfig.length) {
      // e will emit values entered as otp and,
      this.strOtp =e;
      this.disableOtp=false;
    }else {
      this.disableOtp=true;
      this.messageError=false;//tắt thông báo
    }
  }
  //check OPT, nếu đúng thì sang bước 3, nếu sai báo sai opt, hết hạn cho phép gửi lại opt mới
  nextStep3(){
    if( this.is_phone_number)
    {
      this.shopService.CheckOtp(this.EmailOrPhone,this.strOtp).subscribe(rs=>{
        if(rs.statusCode==200)
        {
         this.clickStep3 =true;
         this.clickStep2=false;
        }
        else
        {
         this.messageError=true;//hiện thông báo
        }
      })
    }
    else if(this.is_email_address)
    {
      this.shopService.CheckOtpEmail(this.EmailOrPhone,this.strOtp).subscribe(rs=>{
        if(rs.statusCode==200)
        {
         this.clickStep3 =true;
         this.clickStep2=false;
        }
        else
        {
         this.messageError=true;//hiện thông báo
        }
      })
    }
    //kiểm tra opt, nếu đúng thì sang bước 3

  }
  succesRegister()
  {
    this.registerShop.username=this.EmailOrPhone;
    this.registerShop.password=this.inputPassword;
    this.registerShop.type=0;
    if(this.is_phone_number) this.registerShop.phone_number=this.EmailOrPhone;
    else if(this.is_email_address) this.registerShop.email=this.EmailOrPhone;

    this.shopService.registerShop(this.registerShop).subscribe(rs=>{
        this.toast.success("Chào mừng bạn đến với hệ thống dành cho người bán hàng của SmartGap.","ĐĂNG KÝ THÀNH CÔNG GIAN HÀNG",
        {
          positionClass:'toast-center-center',
        }
        )
        let urlLoginShop = environment.baseUrl.webShopAdmin;
        this.document.location.href = urlLoginShop;
    })
  }
  showPass(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  validateEmail(email:string):boolean
  {
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    return emailReg.test(email);
  }
  validatePhoneNumber(phone_number:string):boolean
  {
      let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      return re.test(phone_number);
  }
  fieldsChange = (evt:any) => {
    this.confirmRules = evt.target.checked;
    if(this.confirmRules==true){this.disableRules=false}else{this.disableRules=true}
    }
}
