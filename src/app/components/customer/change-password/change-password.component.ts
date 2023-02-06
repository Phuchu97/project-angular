import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../shared/services/storage.service";
import {CustomerFacadeService} from "../service/customer-facade.service";
import {NotifyMessageService} from "../../../shared/services/notify-message.service";
import {AppStatusCode} from "../../../shared/common/app.constants";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public appStatusCode = AppStatusCode;
  public form: FormGroup;
  public userId: number;
  public isConfirmpassword = false;
  constructor(
    private storeService: StorageService,
    private customerFacadeService: CustomerFacadeService,
    private formBuilder: FormBuilder,
    private notifyMessageService: NotifyMessageService
  ) { }

  ngOnInit(): void {
    this.userId = this.storeService.get('id');
    this.buildForm();
  }

  public buildForm() {
    this.form = this.formBuilder.group({
      passwordOld: ["", [Validators.required]],
      passwordNew: ["", [Validators.required]],
      confirmpassword: ["", [Validators.required]],
      id: this.userId
    })
  }

  public save() {
   
    if (!this.validate()) {
      return;
    }
    const body = this.form.value;
    this.customerFacadeService.getCustomerUserService().customerUserChangepass(body).subscribe( res => {
      if (res.statusCode === this.appStatusCode.StatusCode200) {
        this.notifyMessageService.success(res.message)
        this.storeService.clear();
      } else {
        this.notifyMessageService.error(res.message)
      }
    }, (error) => this.notifyMessageService.error(error.message));
  }

  public validate() {
    this.isConfirmpassword = this.form.value.passwordNew !== this.form.value.confirmpassword;
    return !this.isConfirmpassword;
  }

  public forgotPassword() {
  }
}
