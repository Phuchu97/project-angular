import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { Router } from '@angular/router';
import {RegisCustomer} from "../../../viewModels/customers/register-customer";
import {CustomersService} from "../../../services/customers.service";
import { ShopsService } from 'src/app/services/shops.service';
import { ToastrService } from 'ngx-toastr';
declare const countDownOTP: any;
@Component({
  selector: 'app-modal-regis-customer',
  templateUrl: './modal-regis-customer.component.html',
  styleUrls: ['./modal-regis-customer.component.css']
})
export class ModalRegisCustomerComponent extends AppComponentBase implements OnInit {
  @ViewChild('modalRegisCustomer', { static: true }) modal: ModalDirective;
  @ViewChild('modalLoginCustomer', { static: true }) modalLogin: ModalDirective;
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;
  @ViewChild('ngOtpInput') ngOtpInputRef:any;

  @Output() closeModal = new EventEmitter();
  EmailOrPhone:string;
  clickStep1:boolean=true;
  clickStep2:boolean=false;
  clickStep3:boolean=false;
  disableOtp:boolean=true;
  isOpt:boolean=true;
  messageError:boolean=false;
  messageExistUser:boolean=false;
  messageExistUserErr:boolean=false;
  inputPassword:string;
  regisCustomer:RegisCustomer =new RegisCustomer();

  otpInputConfig: NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    containerClass:''
    
    
  };
  
  is_phone_number:boolean=false;
  is_email_address:boolean=false;
  strOtp:string;
  orrmessger:string;
  constructor(private injector:Injector,private customerService:CustomersService,
    private router:Router,
    private toastr: ToastrService,
    )
  {super(injector) }

  override ngOnInit(): void {
  }

  showPopup()
  {
    //this.modalLogin.hide();
    this.modal.show();

  }
  close(): void {
    this.modal.hide();
  }
  //Sinh m?? otp, g???i mail , sms v??? mail or s??? ??i???n tho???i

  nextStep2(){

    this.sendOtp();
  }
  showOtpComponent = true;
  sendOtp()
  {
  this.showOtpComponent = false;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
    this.customerService.CheckExistUserName(this.EmailOrPhone).subscribe(rs=>{
      if(rs.statusCode==200)
      {

        this.messageExistUser=false;
        if(this.validatePhoneNumber(this.EmailOrPhone))
        {
          this.is_phone_number=true;
          this.customerService.CreateOtpSMS(this.EmailOrPhone).subscribe(r=>{
            if(r.statusCode==200)
            {
            this.clickStep1=false;
            this.clickStep2=true;
            countDownOTP();
            }
            //check otp g??i qu?? 5 l???n b??o l???i
            else{
              this.orrmessger= r.message
            }
          })
        }
        else  if(this.validateEmail(this.EmailOrPhone))
        {
          this.is_email_address=true;
          this.customerService.CreateOtpEmail(this.EmailOrPhone).subscribe(r=>{
            this.clickStep1=false;
            this.clickStep2=true;
            countDownOTP();
          })
        }

      }
     else{
      this.messageError = true;
     }

    })

  }
  //M???i l???n thay ?????i input opt
  onInputChange(e:any) {
    if(e.length == this.otpInputConfig.length) {
      // e will emit values entered as otp and,
      this.strOtp =e;
      this.disableOtp=false;
    }else {
      this.disableOtp=true;
      this.messageError=false;//t???t th??ng b??o
    }
  }
  //check OPT, n???u ????ng th?? sang b?????c 3, n???u sai b??o sai opt, h???t h???n cho ph??p g???i l???i opt m???i
  nextStep3(){
    //ki???m tra opt, n???u ????ng th?? sang b?????c 3
      //ki???m tra opt, n???u ????ng th?? sang b?????c 3
      if(this.is_phone_number)
      {

        this.customerService.CheckOtp(this.EmailOrPhone,this.strOtp).subscribe(rs=>{
          if(rs.statusCode==200)
          {
           this.clickStep3 =true;
           this.clickStep2=false;
          }
          else
          {
           this.messageError=true;//hi???n th??ng b??o
          }
        })
      }
      else if(this.is_email_address)
      {
        this.customerService.CheckOtpEmail(this.EmailOrPhone,this.strOtp).subscribe(rs=>{
          if(rs.statusCode==200)
          {
           this.clickStep3 =true;
           this.clickStep2=false;
          }
          else
          {
           this.messageError=true;//hi???n th??ng b??o
          }
        })
      }




  }
  createCustomer()
  {
    this.regisCustomer.username=this.EmailOrPhone;
    this.regisCustomer.password=this.inputPassword;
    if(this.is_phone_number) this.regisCustomer.phone_number=this.EmailOrPhone;
    else if(this.is_email_address) this.regisCustomer.email=this.EmailOrPhone;
    //this.regisCustomer.
    this.customerService.registerCustomer(this.regisCustomer).subscribe(rs=>{
      this.router.navigate(['/']);
      this.clickCloseModal();
      this.toast.success("H??y t???n h?????ng mua s???m c??ng SmartGap.","????NG K?? TH??NH C??NG",
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
  clickCloseModal()
  {
    this.closeModal.emit();
  }

}
