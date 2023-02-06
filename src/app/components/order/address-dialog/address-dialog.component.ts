import { Component, OnInit } from '@angular/core';
import {AppStatusCode} from "../../../shared/common/app.constants";
import {AddressModel} from "../../customer/model/address.model";
import {StorageService} from "../../../shared/services/storage.service";
import {CustomerFacadeService} from "../../customer/service/customer-facade.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {

  public appStatusCode = AppStatusCode;
  public userId: number;
  public dataObject: AddressModel[] = [];
  constructor(
    private storeService: StorageService,
    private customerFacadeService: CustomerFacadeService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.userId = this.storeService.get('id');
  }

  public setDefaultAddress(item: AddressModel) {
    item.is_default = true;
    this.customerFacadeService.getCustomerUserService().customerUserAddressModify(item).subscribe()
  }

  public close() {
    this.activeModal.close();
  }

  public selectAddress(item: AddressModel) {
    this.activeModal.close(item);
  }
}
