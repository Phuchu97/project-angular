import {AppComponentBase} from 'src/app/shared/common/app-base-component';
import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReqLogin} from 'src/app/viewModels/auth/req-login';
import {AppStatusCode} from 'src/app/shared/common/app.constants';
import {CustomersService} from "../../../services/customers.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CartService} from "../../../services/cart.service";
import {OrderModel} from "../../../components/order/model/order.model";
import {ItemCart} from "../../../viewModels/products/product-cart";

@Component({
  selector: 'app-modal-login-customer',
  templateUrl: './modal-login-customer.component.html',
  styleUrls: ['./modal-login-customer.component.css']
})
export class ModalLoginCustomerComponent extends AppComponentBase implements OnInit {
  is_login:boolean=true;
  is_forgotpass:boolean= false;
  is_regis:boolean=false;
  loginFormSubmitted = false;
  isLoginFailed = false;
  resMessageLogin = '';
  public isShowPopup = false
  public redirectUrl: string = '/';
  public listCartItem: ItemCart[];

  loginForm: FormGroup;
  @ViewChild('modalLoginCustomer', {static: true}) modal: ModalDirective;
  @ViewChild('modalRegisCustomer', {static: true}) modalRegis: ModalDirective;
  @ViewChild('modalForgotPass', {static: true}) modalForgotPass: ModalDirective;

  constructor(
    private injector: Injector, private customerService: CustomersService,
    private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private cartService: CartService,
  ) {
    super(injector)
  }


  
  override ngOnInit(): void {
    this.initForm();
    if (this.isShowPopup) {
      this.showPopup();
    }
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      rememberMe: new FormControl(true)
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  async onSubmit(): Promise<void> {
    this.loginFormSubmitted = true;
    this.isLoginFailed = false;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    const reqLogin = new ReqLogin();
    reqLogin.username = this.loginForm.value.username;
    reqLogin.password = this.loginForm.value.password;// Md5.hashStr(this.loginForm.value.password);

    this.authService.signIn(reqLogin).subscribe((res) => {
      this.spinner.hide();
      if (res.statusCode !== AppStatusCode.StatusCode200) {
        this.isLoginFailed = true;
        this.resMessageLogin = "Đăng nhập không thành công !";
      } else {
        this.close();
        this.activeModal.close(true);
        this.router.navigate([this.redirectUrl]);
        if (this.listCartItem) {
          localStorage.setItem('local_cart', JSON.stringify(this.listCartItem));
        }
        window.location.reload();
      }
    })
  }

  showPopup(f_show?:number) {
    if(f_show==1)
    {
        this.is_regis =true;
        this.is_forgotpass=false;
        this.is_login=false;
    }
    else
    {
      this.is_regis =false;
      this.is_forgotpass=false;
      this.is_login=true;
    }
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
    this.activeModal.close();
    this.is_forgotpass=false;
    this.is_login=true;
    this.is_regis=false;
  }

  showPass(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
  
  showForgotPass(){
    this.is_forgotpass=true;
    this.is_login=false;
  }
  showRegis(){
    this.is_forgotpass=false;
    this.is_login=false;
    this.is_regis=true;
  }
  clickCloseModal()
  {
    this.modal.hide();
  }
}
