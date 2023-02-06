import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../shared/services/storage.service";
import {CustomerFacadeService} from "../service/customer-facade.service";
import {VoucherModel, VoucherType} from "../../order/model/voucher.model";
import {RouterConstants} from "../../../shared/common/router.constants";

@Component({
  selector: 'app-customer-voucher',
  templateUrl: './customer-voucher.component.html',
  styleUrls: ['./customer-voucher.component.scss']
})
export class CustomerVoucherComponent implements OnInit {
  public listShopVoucher: VoucherModel[] = [];
  public listSmartVoucher: VoucherModel[] = [];
  public allVoucher: VoucherModel[] = []
  public userId: any;
  public voucherType = VoucherType;
  public routerConstants = RouterConstants
  constructor(
    private storeService: StorageService,
    private customerFacadeService: CustomerFacadeService,
  ) { }

  ngOnInit(): void {
    this.userId = this.storeService.get('id');
    this.getListVoucher();
  }

  public getListVoucher() {
    this.customerFacadeService.getCustomerUserService().getCustomerVoucherList({customer_id: this.userId}).subscribe((res: any) => {
      this.listShopVoucher = res.data.shop_Vouchers;
      this.listSmartVoucher = res.data.vouchers;
      this.allVoucher = this.allVoucher.concat(this.listSmartVoucher, this.listShopVoucher);
    })
  }

}
