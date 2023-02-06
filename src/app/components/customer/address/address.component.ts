import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../shared/services/storage.service";
import {CustomerFacadeService} from "../service/customer-facade.service";
import {AddressModel} from "../model/address.model";
import {DialogService} from "../../../shared/services/dialog.service";
import {AddressIoComponent} from "./address-io/address-io.component";
import {NotifyMessageService} from "../../../shared/services/notify-message.service";
import {AppStatusCode} from "../../../shared/common/app.constants";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public appStatusCode = AppStatusCode;
  public userId: number;
  public listAddress: AddressModel[] = [];
  public dataObject: AddressModel;
  public enablaSelect = false;
  constructor(
    private storeService: StorageService,
    private customerFacadeService: CustomerFacadeService,
    private dialogService: DialogService,
    private notifyMessageService: NotifyMessageService,
    private activeModal: NgbActiveModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.enablaSelect = this.router.url.indexOf("order") !== -1;
    this.userId = this.storeService.get('id');
    this.getLissAddress();
  }

  public getLissAddress() {
    this.customerFacadeService.getCustomerUserService().customerUserAddressList({customer_id: this.userId}).subscribe( (res: any) => {
      this.listAddress = res.data;
      if (this.dataObject) {
        this.listAddress.forEach(item => {
          item.selected = item.id === this.dataObject.id;
        })
      }
    });
  }

  public setDefaultAddress(item: AddressModel) {
    item.is_default = true;
    this.listAddress.forEach(address => {
      if (address.id !== item.id) {
        address.is_default = false;
      }
    })
    this.customerFacadeService.getCustomerUserService().customerUserAddressModify(item).subscribe(res => {
      this.activeModal.close(item);
    });
  }

  public addOrEditAdress(item?: AddressModel) {
    let dataObject: AddressModel = {};
    if (!item) {
      dataObject.customer_id = this.userId
    } else {
      dataObject = item
    }
    this.dialogService.openDialogComponent(AddressIoComponent, dataObject).then( res => {
      if (res) {
        this.getLissAddress();
      }
    })
  }


  public deleteAddress(item: AddressModel) {
    const title = "Xác nhận xóa";
    const mess = "Bạn có chắc chắn muốn xoá địa chỉ?";
    // const mess = `Địa chỉ ${item.receiver} ${item.phone} ${item.address}`;
    this.dialogService.confirm(title, mess).then( res => {
      if (res) {
        this.customerFacadeService.getCustomerUserService().customerUserAddressDelete({id: item.id}).subscribe((res) => {
          if (res.statusCode === this.appStatusCode.StatusCode200) {
            this.notifyMessageService.success(res.message)
          } else {
            this.notifyMessageService.error(res.message)
          }
          this.getLissAddress();
        },
          (err) => this.notifyMessageService.error(err.message))
      }
    });
  }

  close() {
    this.activeModal.close();

  }
}
