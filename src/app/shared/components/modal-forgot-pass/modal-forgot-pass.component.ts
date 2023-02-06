import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgOtpInputConfig } from 'ng-otp-input';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CustomersService } from 'src/app/services/customers.service';
import { RegisCustomer } from 'src/app/viewModels/customers/register-customer';
import { AppComponentBase } from '../../common/app-base-component';

import { ModalLoginCustomerComponent } from '../modal-login-customer/modal-login-customer.component';

declare const countDownOTP: any;
@Component({
  selector: 'app-modal-forgot-pass',
  templateUrl: './modal-forgot-pass.component.html',
  styleUrls: ['./modal-forgot-pass.component.css']
})
export class ModalForgotPassComponent extends AppComponentBase implements OnInit {
  // loginForm: FormGroup;

  @ViewChild('modalRegisCustomer', { static: true }) modal: ModalDirective;
  @ViewChild('modalLoginCustomer', { static: true }) modalLogin: ModalLoginCustomerComponent;

  EmailOrPhone_ForgotPass:string;
  clickStep1_ForgotPass:boolean=true;
  clickStep2_ForgotPass:boolean=false;
  clickStep3_ForgotPass:boolean=false;
  disableOtp_ForgotPass:boolean=true;
  Forgot_Pass:boolean=true;
  isOpt:boolean=true;
  messageError_ForgotPass:boolean=false;
  messageExistUser_ForgotPass:boolean=false;
  inputPassword_ForgotPass:string;
  regisCustomer:RegisCustomer =new RegisCustomer();
  otpInputConfig_ForgotPass: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  is_phone_number:boolean=false;
  is_email_address:boolean=false;
  strOtp:string;
  is_login:boolean=false;
  
  @Output() closeModal = new EventEmitter();
  constructor(private injector:Injector,private customerService:CustomersService,
    private router:Router,
   
    )
  {super(injector) }

  override ngOnInit(): void {
      this.showPopup();
  }

  showPopup()
  {
    this.modal.show();
  }
  close(): void {
    this.modal.hide();
  }
  //Sinh mã otp, gửi mail , sms về mail or số điện thoại
  nextStep2_ForgotPass(){
    this.sendOtp_ForgotPass();
  }
  sendOtp_ForgotPass()
  {
    this.customerService.CheckExistUserName(this.EmailOrPhone_ForgotPass).subscribe(rs=>{
      if(rs.statusCode==500)
      {
        this.messageExistUser_ForgotPass=false;
        if(this.validatePhoneNumber(this.EmailOrPhone_ForgotPass))
        {
          this.is_phone_number=true;
          this.customerService.CreateOtpSMS_ForgotPass(this.EmailOrPhone_ForgotPass).subscribe(r=>{
            this.clickStep1_ForgotPass=false;
            this.clickStep2_ForgotPass=true;
            countDownOTP();
          })
        }
        else  if(this.validateEmail(this.EmailOrPhone_ForgotPass))
        {
          this.is_email_address=true;
          this.customerService.CreateOtpEmail_ForgotPass(this.EmailOrPhone_ForgotPass).subscribe(r=>{
            this.clickStep1_ForgotPass=false;
            this.clickStep2_ForgotPass=true;
            countDownOTP();
          })
        }
      }
      else
      {
        this.messageExistUser_ForgotPass=true;
      }
    })

  }
  //Mỗi lần thay đổi input opt
  onInputChange_ForgotPass(e:any) {
    if(e.length == this.otpInputConfig_ForgotPass.length) {
      // e will emit values entered as otp and,
      this.strOtp =e;
      this.disableOtp_ForgotPass=false;
    }else {
      this.disableOtp_ForgotPass=true;
      this.messageError_ForgotPass=false;//tắt thông báo
    }
  }
  //check OPT, nếu đúng thì sang bước 3, nếu sai báo sai opt, hết hạn cho phép gửi lại opt mới
  nextStep3_ForgotPass(){
    //kiểm tra opt, nếu đúng thì sang bước 3
      //kiểm tra opt, nếu đúng thì sang bước 3
      if(this.is_phone_number)
      {
        this.customerService.CheckOtpSMS_ForgotPass(this.EmailOrPhone_ForgotPass,this.strOtp).subscribe(rs=>{
          if(rs.statusCode==200)
          {
           this.clickStep3_ForgotPass =true;
           this.clickStep2_ForgotPass=false;
          }
          else
          {
           this.messageError_ForgotPass=true;//hiện thông báo
          }
        })
      }
      else if(this.is_email_address)
      {
        this.customerService.CheckOtpEmail_ForgotPass(this.EmailOrPhone_ForgotPass,this.strOtp).subscribe(rs=>{
          if(rs.statusCode==200)
          {
           this.clickStep3_ForgotPass =true;
           this.clickStep2_ForgotPass=false;
          }
          else
          {
           this.messageError_ForgotPass=true;//hiện thông báo
          }
        })
      }

  }
  forgotPassword()
  {
    this.regisCustomer.username=this.EmailOrPhone_ForgotPass;
    this.regisCustomer.password=this.inputPassword_ForgotPass;
    this.customerService.ForgotPass(this.EmailOrPhone_ForgotPass,this.inputPassword_ForgotPass).subscribe(rs=>{
      this.router.navigate(['/']);
      this.clickCloseModal();
      this.toast.success("Hãy tận hưởng mua sắm cùng SmartGap.","ĐỔI MẬT KHẨU THÀNH CÔNG !",
        {
          positionClass:'toast-center-center',
        }
      )
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

  // clickCloseModal()
  // {
  //   this.closeModal.emit();
  // }

  login()
  {
    this.modal.hide;
    this.is_login=true;
   this.Forgot_Pass=false;
   
  }
  
  clickCloseModal()
  {
    this.modal.hide();
  }
  showlogin()
  {
this.modalLogin.showPopup(2);
  }
}
