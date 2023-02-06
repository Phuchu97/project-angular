import { Component, OnInit } from '@angular/core';
import {CustomerFacadeService} from "../service/customer-facade.service";
import {StorageService} from "../../../shared/services/storage.service";
import {OderPayItemModel, OrderPayModel, OrderStatus, OrderStatusName} from "../../order/model/order-pay.model";
import {RouterConstants} from "../../../shared/common/router.constants";
import {Router} from "@angular/router";
import {SeoUrlPipe} from "../../../shared/pipes/seo-url.pipe";
import {NotifyMessageService} from "../../../shared/services/notify-message.service";
import {DialogService} from "../../../shared/services/dialog.service";
import {OrderFacadeService} from "../../order/service/order-facade.service";
import {CartService} from "../../../services/cart.service";
import {ShipingMethodName, ShippingCompany} from "../../../shared/common/category.constans";
import {PaymentMothodName, PaymentStatusName} from "../../order/model/payment.model";

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {

  public userId: number;
  public listOrder: OrderPayModel[] = [];
  public orderStatusName = OrderStatusName;
  public orderStatus = OrderStatus;
  public templateDataAll = {};
  public templateDataChoDuyet = {};
  public templateDataDaDuyet= {};
  public templateDataDangGiaoHang = {};
  public templateDataDaGiao = {};
  public templateDataDonHuy = {};
  public templateDataTraHangHoanTien = {};
  public keyword: string = "";
  public shippingCompany = ShippingCompany;
  public paymentMothodName = PaymentMothodName;
  public paymentStatusName = PaymentStatusName;
  constructor(
    private storeService: StorageService,
    private customerFacadeService: CustomerFacadeService,
    private router: Router,
    public seoUrlPipe: SeoUrlPipe,
    private notifyMessageService: NotifyMessageService,
    private orderFacadeService: OrderFacadeService,
    private dialogService: DialogService,
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.storeService.get('id');
    this.getOrderList();
  }

  public getOrderList(param?: any) {
    if (!param) {
      param = {
        customer_id: this.userId,
        page_number: 0
      }
    } else {
      param = {
        ...param,
        customer_id: this.userId,
        page_number: 0
      }
    }
    this.customerFacadeService.getCustomerUserService().getCustomerOrderList(param).subscribe((res: any) => {
      this.listOrder = res.data.lists;
      this.templateDataAll = {
        data: this.listOrder,
        status_id: OrderStatus.All
      }
      this.templateDataChoDuyet = {
        data: this.listOrder.filter(x => x.status_id === OrderStatus.ChuaXacNhan),
        status_id: OrderStatus.ChuaXacNhan
      }
      this.templateDataDaDuyet = {
        data: this.listOrder.filter(x => x.status_id === OrderStatus.DaXacNhan),
        status_id: OrderStatus.DaXacNhan
      }
      this.templateDataDangGiaoHang = {
        data: this.listOrder.filter(x => x.status_id === OrderStatus.DaDieuPhoiGiaoHang),
        status_id: OrderStatus.DaDieuPhoiGiaoHang
      }
      this.templateDataDaGiao = {
        data: this.listOrder.filter(x => x.status_id === OrderStatus.DaGiaoHang),
        status_id: OrderStatus.DaGiaoHang
      }
      this.templateDataDonHuy = {
        data: this.listOrder.filter(x => x.status_id === OrderStatus.DonHuy),
        status_id: OrderStatus.DonHuy
      }
      this.templateDataTraHangHoanTien = {
        data: this.listOrder.filter(x => x.status_id === OrderStatus.DaTraHang),
        status_id: OrderStatus.DaTraHang
      }
    })
  }

  public navigateToShop(shop_id: number) {
    this.router.navigate([`${RouterConstants.shops}/${shop_id}`]);
  }

  navigateProduct(product: OderPayItemModel) {
    const productUrl = this.seoUrlPipe.transform(product.product_name, product.product_id);
    this.router.navigate([productUrl]);
  }

  public cancelOrder(order: OrderPayModel) {
    this.dialogService.confirm("Xác nhận hủy đơn", "Bạn có chắc chắn muốn hủy đơn hàng này?").then(confirm => {
      if (confirm) {
        this.orderFacadeService.oderService().cancelOrder({order_id: order.id}).subscribe(() => {
          this.getOrderList();
          this.notifyMessageService.success("Hủy đơn hàng thành công!");
          },
          (error) => {
            this.notifyMessageService.error(error.error.message);
          })
      }
    })
  }

  public reOrder(order: any) {
    order.details.forEach((item: any) => {
      item.selected = true;
      item.product_avatar = item.product_img;
      item.shop_avatar = "";
      item.shop_name = order.shop_name;
    });
    this.cartService.addToCart(order.details, true);
  }

  public search(status_id: typeof OrderStatus) {
    this.getOrderList({keyword: this.keyword.trim(), status_id: status_id})
  }
}
