import { Injector } from '@angular/core';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RequestShop } from 'src/app/viewModels/shops/request-shop';
import { RequestShopService } from "../../../services/request-shop.service";
import { PrefixPhone } from '../../common/app.constants';

@Component({
  selector: 'app-modal-request-shop',
  templateUrl: './modal-request-shop.component.html',
  styleUrls: ['./modal-request-shop.component.css']
})
export class ModalRequestShopComponent extends AppComponentBase implements OnInit {

  @ViewChild('modalRequestShop', { static: true }) modal: ModalDirective;
  requesShop: RequestShop = new RequestShop();
  requestError: any;
  prefixPhone: typeof PrefixPhone = PrefixPhone;
  msgPrefix: boolean = false;
  constructor(private injector: Injector, private requestShopService: RequestShopService,

  ) { super(injector) }

  override ngOnInit() {
    this.requesShop = new RequestShop();
  }

  showPopup() {
    this.modal.show();
  }
  checkPrefix() {
    if (this.requesShop.phone != undefined && this.requesShop.phone.length >= 3) {
      let prefix = this.requesShop.phone.slice(0, 3);
      if (this.prefixPhone.PrefixPhone.indexOf(prefix) == -1) {
        this.msgPrefix = true;
      }
      else {
        this.msgPrefix = false;
      }
    }

  }
  saveRequestShop(): void {
    this.requestError = this.requesShop;
    if (this.requesShop.phone != undefined && this.requesShop.phone.length >= 3) {
      let prefix = this.requesShop.phone.slice(0, 3);
      if (this.prefixPhone.PrefixPhone.indexOf(prefix) == -1) {
        this.requesShop = this.requestError;
        this.toast.warning("Số điện thoại không đúng !");
      }
      else {
        //this.close();
        this.requestShopService.requestShop(this.requesShop).subscribe(rs => {
          if (rs.statusCode === 200) {
            this.toast.success("Đăng ký thành công shop truy xuất !", "Thành công");
            this.close();
          } else {
            this.toast.error(rs.message)
          }
        })
        this.requesShop = new RequestShop();
      }
    }

  }
  close(): void {
    this.modal.hide();
  }
}
