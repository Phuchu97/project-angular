import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { VoucherModel, VoucherType } from "../model/voucher.model";
import { OrderFacadeService } from "../service/order-facade.service";
import { RouterConstants } from "../../../shared/common/router.constants";
import { Router } from "@angular/router";
import { NotifyMessageService } from "../../../shared/services/notify-message.service";
import { OrderModel } from "../model/order.model";
import { isEmpty } from "lodash";
import { of } from 'rxjs';
import { ThumbnailsPosition } from 'ng-gallery';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { ShopFacadeService } from '../../shops/service/shop-facade.service';

@Component({
  selector: 'app-voucher-dialog',
  templateUrl: './voucher-dialog.component.html',
  styleUrls: ['./voucher-dialog.component.scss']
})
export class VoucherDialogComponent implements OnInit {
  public dataObject: OrderModel;
  public voucherType = VoucherType;
  public listSmartGapVoucher: VoucherModel[] = [];
  public listShopVocher: VoucherModel[] = [];
  public listSmartGapVoucherSearch: VoucherModel[] = [];
  public listShopVocherSearch: VoucherModel[] = [];
  public selectedShopVoucher: VoucherModel | undefined;
  public selectedSmartgapVoucher: VoucherModel | undefined;
  inputSearch: any;
  searchVoucherWithName = '';
  shopInfo: any;

  constructor(
    private activeModal: NgbActiveModal,
    private orderFacadeService: OrderFacadeService,
    public shopFacadeService: ShopFacadeService,
    public router: Router,
    private notifyMessageService: NotifyMessageService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    let listCategoryProductId: any[] = [];
    let listProductId: any[] = [];
    this.dataObject.products.forEach(obj => {
      if (obj.selected) {
        listCategoryProductId.push(obj.category_product_id)
        listProductId.push(obj.product_id);
      }
    })
    this.inputSearch = {
      "keyword": "",
      "page_number": 0,
      "page_size": 10,
      "shop_id": this.dataObject.shopId,
      // @ts-ignore
      "categorys": listCategoryProductId,
      // @ts-ignore
      "product_ids": listProductId,
    };
    if (this.dataObject) {
      this.selectedShopVoucher = Object.assign({}, this.dataObject?.shop_voucher);
      this.selectedSmartgapVoucher = Object.assign({}, this.dataObject?.smartgap_voucher);
    }
    this.getListVoucher();
    this.getSmartVoucher();
    this.getShopInfor(this.dataObject.shopId);
    this.activeTab();
  }

  getShopInfor(shop_id: number) {
    this.shopFacadeService.getShopService().get({ id: shop_id }).subscribe((res: any) => {
      this.shopInfo = res.data;
    })
  }

  activeTab() {
    const listTab = document.querySelectorAll(".tab-items");
    listTab.forEach(element => {
      element.className = element.className.replace("active", "");
      if (!isEmpty(this.selectedShopVoucher) && isEmpty(this.selectedSmartgapVoucher)) {
        if (element.id && element.id == "tabshop") {
          element.className = element.className + " active";
          this.tabName = 'shop'
        }
      } else {
        if (element.id && element.id == "tabsmartgap") {
          element.className = element.className + " active";
          this.tabName = 'smartgap'
        }
      }
    })
    const listTabContent = document.querySelectorAll(".tab-pane");
    listTabContent.forEach(element => {
      element.className = element.className.replace("active", "");
      if (!isEmpty(this.selectedShopVoucher) && isEmpty(this.selectedSmartgapVoucher)) {
        if (element.id && element.id == "shopvoucher") {
          element.className = element.className + " active";
        }
      } else {
        if (element.id && element.id == "smartgapvoucher") {
          element.className = element.className + " active";
        }
      }
    })
  }

  tabName = '';
  switchTab(name: any) {
    this.searchVoucherWithName = '';
    this.searchVoucher(this.searchVoucherWithName);
    this.tabName = name;
  }

  public getListVoucher() {
    this.listShopVocher = [];

    this.orderFacadeService.oderService().getVoucherByShopId(this.inputSearch).subscribe((res: any) => {
      // this.listShopVocher = res.data.lists;
      // @ts-ignore
      res.data.lists.forEach(obj => {
        obj.disable = false;
        if (this.checkDate(obj.active_date, obj.end_date) || this.dataObject.total_order_price < obj.min_apply_value) {
          obj.disable = true;
        }
        if (obj.disable) {
          this.listShopVocher.push(obj)
        } else {
          this.listShopVocher.unshift(obj)
        }
      })
      if (this.dataObject.shop_voucher) {
        // @ts-ignore
        const selected = this.listShopVocher.find(voucher => voucher.id == this.dataObject.shop_voucher.id);
        if (selected) {
          selected.selected = true;
        }
      }
      this.listShopVocherSearch = JSON.parse(JSON.stringify(this.listShopVocher))
    })
  }

  public getSmartVoucher() {
    this.orderFacadeService.oderService().getVoucher(this.inputSearch).subscribe(rs => {
      // this.listSmartGapVoucher = rs.data.lists;
      // @ts-ignore
      rs.data.lists.forEach(obj => {
        obj.disable = false;
        if (this.checkDate(obj.active_date, obj.end_date) || this.dataObject.total_order_price < obj.min_apply_value) {
          obj.disable = true;
        }
        if (obj.disable) {
          this.listSmartGapVoucher.push(obj)
        } else {
          this.listSmartGapVoucher.unshift(obj)
        }
      })
      if (this.dataObject.smartgap_voucher) {
        // @ts-ignore
        const selected = this.listSmartGapVoucher.find(voucher => voucher.id == this.dataObject.smartgap_voucher.id);
        if (selected) {
          selected.selected = true;
        }
      }
      this.listSmartGapVoucherSearch = JSON.parse(JSON.stringify(this.listSmartGapVoucher))
    })
  }

  applyVoucherName(name: any) {
    if (this.tabName == 'smartgap') {
      let findVoucher = false;
      this.listSmartGapVoucher.forEach(obj => {
        if (obj.code == name) {
          this.selectedSmartgapVoucher = undefined;
          findVoucher = true;
          this.selectedSmartgapVoucher = obj;
          this.selectItem(obj, 2);
        }
      });
      if (findVoucher) {
        this.confirm();
      } else {
        this.notifyMessageService.error('Tên mã giảm giá bạn nhập không đúng')
      }
    } else {
      let findVoucher = false;
      this.listShopVocher.forEach(obj => {
        if (obj.code == name) {
          this.selectedShopVoucher = undefined;
          findVoucher = true;
          this.selectedShopVoucher = obj;
          this.selectItem(obj, 1);
        }
      });
      if (findVoucher) {
        this.confirm();
      } else {
        this.notifyMessageService.error('Tên mã giảm giá bạn nhập không đúng')
      }
    }
  }

  searchVoucher(name: any) {
    // this.listShopVocherSearch = [];
    // this.listSmartGapVoucherSearch = [];
    name = this.removeAccents(name).toLowerCase();
    this.listShopVocher = this.listShopVocherSearch.filter(obj => {
      let objName = this.removeAccents(obj.code).toLowerCase();
      return (objName.search(name) != -1)
    })

    this.listSmartGapVoucher = this.listSmartGapVoucherSearch.filter(obj => {
      let objName = this.removeAccents(obj.code).toLowerCase();
      return (objName.search(name) != -1)
    })
  }

  removeAccents(str: any) {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

  // @ts-ignore
  checkDate(startDate, endDate) {
    if ((new Date().getTime() <= new Date(endDate).getTime()) && (new Date().getTime() >= new Date(startDate).getTime())) {
      return false;
    } else {
      return true;
    }
  }

  // @ts-ignore
  selectItem(item, type) {
    item.selected = !item.selected;
    switch (type) {
      case 1: //shop
        if (item.selected) {
          this.selectedShopVoucher = item;
          if (this.selectedSmartgapVoucher?.type == item.type) {
            this.selectedSmartgapVoucher = undefined
            this.listSmartGapVoucher.forEach(x => {
              x.selected = false;
            })
          }
        } else {
          this.selectedShopVoucher = undefined;
        }
        this.listShopVocher.forEach(x => {
          if (x.id !== item.id) {
            x.selected = false;
          }
        })
        break;
      case 2: //smartgap
        if (item.selected) {
          this.selectedSmartgapVoucher = item;
          if (this.selectedShopVoucher?.type == item.type) {
            this.selectedShopVoucher = undefined
            this.listShopVocher.forEach(x => {
              x.selected = false;
            })
          }
        } else {
          this.selectedSmartgapVoucher = undefined;
        }
        this.listSmartGapVoucher.forEach(x => {
          if (x.id !== item.id) {
            x.selected = false;
          }
        })
        break;
    }
  }

  // @ts-ignore
  dbClickItem(item, type, event) {
    event?.stopPropagation();
    item.selected = false;
    this.selectItem(item, type)
    this.confirm()
  }

  show = true;
  public showCondition(item: VoucherModel, shopInfor?: any, event?: any) {
    event?.stopPropagation();
    this.show = false;
    this.dialogService.openDialogComponent(VoucherDetailComponent, [item, shopInfor], undefined, 'xs').then((dataReturn) => {
      if (dataReturn) {
        this.dbClickItem(item, dataReturn, null);
      }
      this.show = true;
    })
  }

  public close() {
    if (this.dataObject && (this.dataObject.shop_voucher || this.dataObject.smartgap_voucher)) {
      this.confirm();
    } else {
      this.activeModal.close();
    }
  }

  async confirm() {
    if (isEmpty(this.selectedShopVoucher) && isEmpty(this.selectedSmartgapVoucher)) {
      this.activeModal.close();
    } else {
      const objectVoucher: any = {}
      const applyShopVoucherService = !isEmpty(this.selectedShopVoucher) ? this.VoucherCustomerCheckDiscount().toPromise() : null;
      const applySmartgapVoucherService = !isEmpty(this.selectedSmartgapVoucher) ? this.applyVoucher().toPromise() : null;
      const applyShopVoucherServiceResponse: any = await applyShopVoucherService;
      const applySmartgapVoucherServiceResponse: any = await applySmartgapVoucherService;
      if (applyShopVoucherServiceResponse) {
        if (applyShopVoucherServiceResponse.statusCode == 200) {
          // @ts-ignore
          if (this.dataObject.total_order_price >= this.selectedShopVoucher.min_apply_value) {
            // @ts-ignore
            this.selectedShopVoucher.valid = true;
            objectVoucher.selectedShopVoucher = this.selectedShopVoucher;
            objectVoucher.selectedShopVoucher.discount = applyShopVoucherServiceResponse.data;
          } else {
            this.notifyMessageService.error("Voucher shop không đạt giá trị đơn hàng tối thiểu!")
          }
        } else {
          this.notifyMessageService.error(applyShopVoucherServiceResponse?.message);
        }
      }
      if (applySmartgapVoucherServiceResponse) {
        if (applySmartgapVoucherServiceResponse.statusCode == 200) {
          // @ts-ignore
          if (this.dataObject.total_order_price >= this.selectedSmartgapVoucher.min_apply_value) {
            // @ts-ignore
            this.selectedSmartgapVoucher.valid = true;
            objectVoucher.selectedSmartgapVoucher = this.selectedSmartgapVoucher;
            objectVoucher.selectedSmartgapVoucher.discount = applySmartgapVoucherServiceResponse.data;
          } else {
            this.notifyMessageService.error("Voucher smartgap không đạt giá trị đơn hàng tối thiểu!")
          }
        } else {
          this.notifyMessageService.error(applyShopVoucherServiceResponse?.message);
        }
      }
      this.activeModal.close(objectVoucher);
    }
  }

  public applyVoucher() {
    // @ts-ignore
    let totalPrice = 0;
    this.dataObject.products.forEach(obj => {
      if (obj.selected) {
        totalPrice += obj.price * obj.quantity
      }
    })
    let body = {
      voucher_id: this.selectedSmartgapVoucher?.id,
      shop_id: this.inputSearch.shop_id || 0,
      shipping_price: this.dataObject.shipInfo.fee,
      total_price: totalPrice,
      products: this.dataObject.products.filter(x => x.selected).map(item => ({
        product_id: item.product_id,
        product_quantification_id: item.product_quantification_id,
        quantity: item.quantity,
        price: item.price,
        category_product_id: item.category_product_id,
      }))
    }
    return this.orderFacadeService.oderService().VoucherCustomerCheckDiscount(body)
  }

  public VoucherCustomerCheckDiscount() {
    let totalPrice = 0;
    this.dataObject.products.forEach(obj => {
      if (obj.selected) {
        totalPrice += obj.price * obj.quantity
      }
    })
    let body = {
      voucher_id: this.selectedShopVoucher?.id,
      shop_id: this.dataObject.shopId || 0,
      shipping_price: this.dataObject.shipInfo.fee,
      total_price: totalPrice,
      products: this.dataObject.products.filter(x => x.selected).map(item => ({
        product_id: item.product_id,
        product_quantification_id: item.product_quantification_id,
        quantity: item.quantity,
        price: item.price,
        category_product_id: item.category_product_id,
      }))
    }
    return this.orderFacadeService.oderService().VoucherCustomerCheckDiscount(body)
  }

  navigateToVoucher() {
    this.activeModal.close();
    this.router.navigate([RouterConstants.voucher_shop]);
  }

}
