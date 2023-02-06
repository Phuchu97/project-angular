import { VoucherShop } from './../../../viewModels/shops/shops';
import { ShopsService } from 'src/app/services/shops.service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { SeoUrlPipe } from 'src/app/shared/pipes/seo-url.pipe';
import { StorageService } from "../../../shared/services/storage.service";
import { CustomerFacadeService } from "../../customer/service/customer-facade.service";
import {
  ModalLoginCustomerComponent
} from "../../../shared/components/modal-login-customer/modal-login-customer.component";
import { DialogService } from "../../../shared/services/dialog.service";
import { NotifyMessageService } from "../../../shared/services/notify-message.service";
import { OrderFacadeService } from '../../order/service/order-facade.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-shop-discount',
  templateUrl: './shop-discount.component.html',
  styleUrls: ['./shop-discount.component.css']
})
export class ShopDiscountComponent extends AppComponentBase implements OnInit {
  voucherShop: VoucherShop = new VoucherShop();
  @Input() shopId: number;
  @Input() shopInfo: any;
  listVoucherShop: any;
  public userId: number;

  page = {
    totalItems: 0,
    index: 0,
    count: 0,
  }

  constructor(
    private injector: Injector,
    private router: Router,
    public seoUrlPipe: SeoUrlPipe,
    public shopsService: ShopsService,
    private orderFacadeService: OrderFacadeService,
    private storeService: StorageService,
    private customerFacadeService: CustomerFacadeService,
    private dialogService: DialogService,
    private notifyMessageService: NotifyMessageService
  ) {
    super(injector)
    this.voucherShop = {
      page_number: 0,
      page_size: 12,
      shop_id: this.shopId,
      keyword: "",
      categorys: [],
      product_ids: [],
    }
  }

  override ngOnInit(): void {
    this.userId = this.storeService.get('id');
    this.getVoucherShop();
  }

  getVoucherShop(): void {

    this.orderFacadeService.oderService().getVoucherByShopId(this.voucherShop).subscribe(rs => {
      this.listVoucherShop = rs.data.lists;
      this.page.totalItems = rs.data.totalcount;
    })
  }

  public pageChanged(event: any) {
    this.voucherShop.page_number = event.page;
    this.getVoucherShop();
  }


  public addVocher(item: any) {
    if (this.userId) {
      const body = {
        voucher_id: item.id,
        is_shop_voucher: true,
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
