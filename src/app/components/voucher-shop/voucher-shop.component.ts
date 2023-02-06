import {Component, Injector, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VoucherService} from 'src/app/services/voucher.service';
import {AppComponentBase} from 'src/app/shared/common/app-base-component';
import {VoucherShop} from 'src/app/viewModels/shops/shops';
import {ModalLoginCustomerComponent} from "../../shared/components/modal-login-customer/modal-login-customer.component";
import {CustomerFacadeService} from "../customer/service/customer-facade.service";
import {StorageService} from "../../shared/services/storage.service";
import {DialogService} from "../../shared/services/dialog.service";
import {NotifyMessageService} from "../../shared/services/notify-message.service";

@Component({
  selector: 'app-voucher-shop',
  templateUrl: './voucher-shop.component.html',
  styleUrls: ['./voucher-shop.component.css']
})
export class VoucherShopComponent extends AppComponentBase implements OnInit {
  voucherShop: VoucherShop = new VoucherShop();
  ListShopVoucher: any;
  ListSmartGapVoucher: any;
  public userId: any;

  constructor(
    private injector: Injector,
    private router: Router,
    private voucherService: VoucherService,
    private customerFacadeService: CustomerFacadeService,
    private storeService: StorageService,
    private dialogService: DialogService,
    private notifyMessageService: NotifyMessageService
  ) {
    super(injector)
  }

  override ngOnInit(): void {
    this.userId = this.storeService.get('id');
    this.getVoucherShop();
    this.getVoucherSmartGap();
  }

  getVoucherShop() {
    this.voucherService.getShopVoucher(this.voucherShop).subscribe(rs => {
      this.ListShopVoucher = rs.data.lists;
    })
  }

  getVoucherSmartGap() {
    this.voucherService.getSmartGapVoucher(this.voucherShop).subscribe(rs => {
      this.ListSmartGapVoucher = rs.data.lists;
    })
  }

  progessSold(quantity: number, used_quantity: number) {
    if (quantity != 0) {
      return ((used_quantity * 100) / quantity).toFixed(2) + '%';
    } else
      return "100%";
  }

  addVoucher(item: any, isShopVocher: boolean) {
    if (this.userId) {
      const body = {
        voucher_id: item.id,
        is_shop_voucher: isShopVocher,
        customer_id: this.userId
      }
      this.customerFacadeService.getCustomerUserService().addVocher(body).subscribe((res) => {
          if (res.message.toLocaleLowerCase() == "success") {
            this.notifyMessageService.success('Thêm voucher thành công!');
          } else {
            this.notifyMessageService.error(res.message);
          }
        },
        (error) => {
          this.notifyMessageService.error(error.error.message);
        });
    } else {
      const context = {
        redirectUrl: this.router.url,
        isShowPopup: true
      }
      this.dialogService.openDialogComponent(ModalLoginCustomerComponent, context, true).then(() => {
      });
    }
  }
}
