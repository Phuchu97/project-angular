import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { ItemCart } from "../../viewModels/products/product-cart";
import { chain, isEmpty, isInteger } from 'lodash';
import { ItemOderCart, OrderModel, ShipFeeModel } from "./model/order.model";
import { catchError, debounceTime, map, mergeMap } from "rxjs/operators";
import { forkJoin, Observable, of, Subject, Subscription } from "rxjs";
import { OrderPayModel, OrderStatus } from "./model/order-pay.model";
import { OrderFacadeService } from "./service/order-facade.service";
import { AuthService } from "../../services/auth.service";
import { DialogService } from "../../shared/services/dialog.service";
import { ModalLoginCustomerComponent } from "../../shared/components/modal-login-customer/modal-login-customer.component";
import { Router } from "@angular/router";
import { AddressModel } from "../customer/model/address.model";
import { CustomerFacadeService } from "../customer/service/customer-facade.service";
import { ShippingMethod } from "./model/ship.model";
import { PaymentMethod, PaymentModel } from "./model/payment.model";
import { NotifyMessageService } from "../../shared/services/notify-message.service";
import { ShippingDialogComponent } from "./shipping-dialog/shipping-dialog.component";
import { VoucherDialogComponent } from "./voucher-dialog/voucher-dialog.component";
import { PaymentDialogComponent } from "./payment-dialog/payment-dialog.component";
import { VoucherModel, VoucherType } from "./model/voucher.model";
import { ShopFacadeService } from "../shops/service/shop-facade.service";
import { ShipingMethod, ShippingCompany, TranformConstans } from "../../shared/common/category.constans";
import { AddressComponent } from "../customer/address/address.component";
import { SeoUrlPipe } from "../../shared/pipes/seo-url.pipe";
import { formatDate } from '@angular/common';
import { async } from '@firebase/util';
import { ProductFacadeService } from "../product-detail/service/product-facade.service";
import { ProductFlashsaleModel } from "../shared/model/product-flashsale.model";
import { ProductFlashSale } from "../shared/model/product.model";
import { RouterConstants } from "../../shared/common/router.constants";
import { AppComponentBase } from 'src/app/shared/common/app-base-component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends AppComponentBase implements OnInit {
  public selectedAll: boolean = false;
  public listCartItem: ItemCart[];
  public listItemOder: OrderModel[];
  public listOderPay: OrderPayModel[];
  public productQuantityChanged: Subject<ItemOderCart> = new Subject<ItemOderCart>();
  public isOder: boolean = false;
  public selectedAdress: AddressModel;
  public listAddress: AddressModel[] = [];
  public listTranform: any = [];
  public listPayment: PaymentModel[] = [
    {
      name: "Thanh toán khi nhận hàng",
      id: 0,
      price: 16000
    },
    {
      name: "VNPay",
      id: 1,
      price: 18000,
    }
  ]
  isBuy = false;
  mobileStatus = false;
  public selectedPayment: PaymentModel = this.listPayment[0];
  public total_pay: number = 0;
  public total_ship: number = 0;
  public total_product: number = 0;
  public listSelectedCartDetails: any = [];
  public total_voucher_discount = 0;
  public total_smartgap_voucher_discount = 0;
  public smartGapVoucher: VoucherModel | undefined;
  public voucherType = VoucherType;
  public disableButton: boolean = false;
  public listShopProductDisable: any[] = [];
  public getListShipInfo = false;
  public listProductFlashsale = [];
  public priceProduct = {
    product_id: 0,
    price: 0,
    totalPrice: 0
  }
  constructor(
    private injector: Injector,
    private cartService: CartService,
    private orderFacadeService: OrderFacadeService,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    private customerFacadeService: CustomerFacadeService,
    private notifyMessageService: NotifyMessageService,
    private shopFacadeService: ShopFacadeService,
    public seoUrlPipe: SeoUrlPipe,
    private productFacadeService: ProductFacadeService,
  ) {
    super(injector);
    if (window.innerWidth < 500) {
      this.mobileStatus = true;
    } else {
      this.mobileStatus = false;
    }
  }

  override async ngOnInit() {
    this.getCartDetail();

    let unsubscribe = this.productQuantityChanged.pipe(
      debounceTime(500))// wait 500ms after the last event before emitting last event)
      .subscribe((product) => this.updateItemCartModel(product));
    this.unsubscribe.push(unsubscribe)
  }

  public getCartDetail() {
    let unsubscribe = this.cartService.cartItem.subscribe(async res => {
      this.listCartItem = res;
      // @ts-ignore
      const tmpListItemOder: any = chain(res).groupBy("shop_id").map((value, key) => ({ shopId: +key, products: value, selected: value.filter(x => x.selected).length === value.length, shop_name: value.find(x => x.shop_name)?.shop_name })).value();
      tmpListItemOder.forEach((order: any) => {
        this.listItemOder?.forEach(item => {
          if (order.shopId == item.shopId && item.selected == true) {
            order.selected = item.selected
            order.products.forEach((product: any) => {
              item.products.forEach(productOder => {

                if (productOder.selected == true && product.index_quantitative == productOder.index_quantitative && product.product_id == productOder.product_id) {
                  product.selected = true;
                }
              })
            })
          }
        })
        const updateOrder = this.listItemOder?.find((x: any) => x.shopId == order.shopId);
        if (updateOrder) {
          if (updateOrder.shop_voucher) {
            order.shop_voucher = updateOrder.shop_voucher;
          }
          if (updateOrder.smartgap_voucher) {
            order.smartgap_voucher = updateOrder.smartgap_voucher;
          }
        }
      })

      this.listItemOder = tmpListItemOder;
      let listIdProduct: number[] = [];
      this.listItemOder.forEach(obj => {
        if (obj?.products.length > 0) {
          obj?.products.forEach(ele => {
            ele?.product_id && listIdProduct.push(ele.product_id)
          })
        }
      })

      this.getProductCartList(listIdProduct);
      if (!this.selectedAdress?.province_name) {
        const resAddress: any = await this.getListAddress().toPromise();
        this.listAddress = resAddress.data;
        this.selectedAdress = this.listAddress.find(address => address.is_default) || this.listAddress[0];
        if (!this.selectedAdress) {
          this.notifyMessageService.warning("Thiếu địa chỉ nhận hàng!");
          return;
        }
      }
      // this.getShipInfo();
      // this.clickSelected();
    })
    this.unsubscribe.push(unsubscribe)
  }

  getProductCartList(listId: number[]) {
    this.listShopProductDisable = [];
    let listItemOrderLocal = JSON.parse(JSON.stringify(this.listItemOder));
    this.listItemOder = [];

    forkJoin([
      this.orderFacadeService.oderService().getProductCartList(listId),
      this.orderFacadeService.oderService().getProductFlashsaleCheckList(listId)
    ]).subscribe(([listProductPriceByQuantity, listProductFlashsale]) => {
      this.listProductFlashsale = listProductFlashsale.data;
      listItemOrderLocal.forEach((obj, indexOrder) => {
        // @ts-ignore
        obj.products.forEach((product, index) => {

          // listProductFlashsale.data.forEach(productFlashsale => {
          //   if (productFlashsale.product_id == product.product_id && product.index_quantitative == 1) {
          //     product.base_price = product.price;
          //     product.price = productFlashsale.sale_price
          //   }
          // })
          listProductPriceByQuantity.data.forEach((item: any) => {
            item.productpricebyquantity.forEach(itemProductpricebyquantity => {
              listProductFlashsale.data.forEach(productFlashsale => {
                if (itemProductpricebyquantity.product_id == productFlashsale.product_id) {
                  let base_price = itemProductpricebyquantity.productPriceRangeQuantities[0].price
                  itemProductpricebyquantity.productPriceRangeQuantities[0].price = productFlashsale.sale_price
                  if (!itemProductpricebyquantity.productPriceRangeQuantities[0].base_price) {
                    itemProductpricebyquantity.productPriceRangeQuantities[0].base_price = base_price
                    itemProductpricebyquantity.productPriceRangeQuantities[0].flashsale_product_id = productFlashsale.id
                    itemProductpricebyquantity.productPriceRangeQuantities[0].sale_price = productFlashsale.sale_price
                    itemProductpricebyquantity.productPriceRangeQuantities[0].sale_quantity = productFlashsale.sale_quantity
                  }
                }
              })
            })

            if (item.id == product.product_id) {
              product.productpricebyquantity = item.productpricebyquantity;
              product.product_name = item.name;
              product.is_lock = item.is_lock;
              product.product_avatar = item.path
              if (item.is_lock == true) {
                let findShopProductDisable = false;
                this.listShopProductDisable.forEach((shopProduct, index) => {
                  if (shopProduct.shopId == obj.shopId) {
                    findShopProductDisable = true;
                    this.listShopProductDisable[index].products.push(JSON.parse(JSON.stringify(product)))
                  }
                })
                if (!findShopProductDisable) {
                  this.listShopProductDisable.push(JSON.parse(JSON.stringify({ ...obj, products: [product] })))
                }
              }
            }
          })
        })
      })

      listItemOrderLocal.forEach((obj: any, index: number) => {
        obj.products.forEach((ele: any) => {
          if (ele.is_lock == false && this.listItemOder[index]) {
            this.listItemOder[index].products.push(ele)
          }
          if (ele.is_lock == false && !this.listItemOder[index]) {
            this.listItemOder.push({ ...obj, products: [ele] })
          }
        })
      })

      this.listItemOder.forEach(shop => {
        shop.products.forEach(product => {
          this.getPriceProduct(product, product.quantity)
        })
      })

      // this.listItemOder.forEach((obj: any, index: number) => {
      //   obj.products.forEach((ele: any) => {
      //     listProductFlashsale.data.forEach(product => {
      //       if(ele.product_id == product.product_id && ele.index_quantitative == 1){
      //         ele.base_price = ele.price;
      //         ele.price = product.sale_price
      //       }
      //     })
      //   })
      // })

      if (this.getListShipInfo = true) {
        this.getShipInfo();
      }
    })
  }

  // @ts-ignore
  shopSelected(event, item: OrderModel) {
    const checked = event.target.checked;
    item.products.forEach(prod => prod.selected = checked);
    this.clickSelected();
  }

  productSelected(item: OrderModel) {
    const listProdSelected = item.products.filter(prod => prod.selected);
    // item.selected = listProdSelected.length === item.products.length;
    if (listProdSelected.length > 0) {
      item.selected = true;
    } else {
      item.selected = false;
    }
    this.clickSelected();
  }

  productMinus(product: ItemOderCart, item: OrderModel) {
    // @ts-ignore
    item?.shop_voucher?.checked = false;
    // @ts-ignore
    item?.smartgap_voucher?.checked = false;
    if (product.quantity == 1) {
      this.dialogService.confirm("Xác nhận xóa", "Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?").then((confirm) => {
        if (confirm) {
          product.quantity--;
          if (product.quantity == 0) {
            item.products = this.removeUniqueProduct(item.products, product);
          }
          this.getPriceProduct(product, product.quantity)
          this.productQuantityChanged.next(product);
        }
      })
    } else {
      product.quantity--;
      if (product.quantity == 0) {
        item.products = this.removeUniqueProduct(item.products, product);
      }
      this.getPriceProduct(product, product.quantity)

      this.productQuantityChanged.next(product);
      this.productchangequantity(product, item)
    }
  }
  public productchangequantity(product: ItemOderCart, item: OrderModel) {
    console.log(product.price);
    console.log(product.quantity)
  }

  public getTotalPriceProduct(base_price, sale_price, quantity, sale_quantity) {
    let totalPrice = 0;
    if (sale_quantity) {
      if (quantity > sale_quantity) {
        totalPrice = sale_quantity * sale_price + base_price * (quantity - sale_quantity)
      } else {
        totalPrice = quantity * sale_price;
      }
    } else {
      totalPrice = base_price * quantity;
    }
    return totalPrice;
  }

  getPriceProduct(product: any, quantityNew: number) {
    let breakForEach = false;
    product.productpricebyquantity.forEach((prodQuantity: any, indexProdQuantity: number) => {
      if (breakForEach) { return; }
      if ((quantityNew >= prodQuantity.from_quantity && quantityNew <= prodQuantity.to_quantity) || (quantityNew >= prodQuantity.from_quantity && prodQuantity.to_quantity === 0)) {
        product.price = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.price;
        product.base_price = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.base_price || null;
        product.flashsale_product_id = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.flashsale_product_id || null;
        product.sale_price = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.sale_price || null;
        product.sale_quantity = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.sale_quantity || null;
        // product.totalPrice = product.price * quantityNew;
        product.totalPrice = this.getTotalPriceProduct(product.base_price || product.price, product.sale_price, product.quantity, product.sale_quantity);
        breakForEach = true;
      } else {
        if (indexProdQuantity == product.productpricebyquantity.length - 1 && quantityNew > prodQuantity.from_quantity) {
          product.price = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.price;
          product.base_price = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.base_price || null;
          product.flashsale_product_id = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.flashsale_product_id || null;
          product.sale_price = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.sale_price || null;
          product.sale_quantity = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1]?.sale_quantity || null;
          product.totalPrice = this.getTotalPriceProduct(product.base_price || product.price, product.sale_price, product.quantity, product.sale_quantity);
        }
      }
    })
  }
  checkQuantityAvailable(product: any, quantity: number) {
    let quantityStatus = false;
    let breakForEach = false;
    product.productpricebyquantity.forEach((prodQuantity: any, indexProdQuantity: number) => {
      if (breakForEach) { return; }
      if ((quantity >= prodQuantity.from_quantity && quantity <= prodQuantity.to_quantity) || (quantity >= prodQuantity.from_quantity && prodQuantity.to_quantity === 0)) {
        quantityStatus = true;
        breakForEach = true;
      }
      else {
        if (indexProdQuantity == product.productpricebyquantity.length - 1 && quantity > prodQuantity.from_quantity) {
          quantityStatus = true;
        }
      }
    })
    if (quantityStatus || quantity == 0) {
      return true;
    } else {
      this.notifyMessageService.warning("Số lượng sản phẩm không hợp lệ, bạn vui lòng chọn lại!");
      return false;
    }
  }

  productPlus(product: ItemOderCart, item: OrderModel) {
    product.quantity++;
    // @ts-ignore
    item?.shop_voucher?.checked = false;
    // @ts-ignore
    item?.smartgap_voucher?.checked = false;
    this.getPriceProduct(product, product.quantity)
    this.productQuantityChanged.next(product);
  }

  async updateItemCartModel(product: ItemOderCart) {
    const updateProd: any = this.listCartItem.find(prod => prod.product_id === product.product_id && prod.product_quantification_id === product.product_quantification_id);
    if (updateProd && product.quantity > 0) {
      updateProd.quantity = product.quantity;
    } else {
      this.listCartItem = this.removeUniqueProduct(this.listCartItem, product);
    }
    // @ts-ignore
    this.orderFacadeService.oderService().getListProductPrice([{ id: updateProd.product_id, quantity: updateProd.quantity, product_quantification_id: updateProd.product_quantification_id }]).subscribe(
      (res: any) => {
        // @ts-ignore
        updateProd.price = res.data[0].price;
        // @ts-ignore
        updateProd.totalPrice = this.getTotalPriceProduct(updateProd.base_price || updateProd.price, updateProd.price, updateProd.quantity, updateProd.sale_quantity);
        this.updateCart();
      },
      (error) => {
        this.notifyMessageService.error(error.error.message)

        let unsubscribe = forkJoin([this.checkProductFlashSale(updateProd), this.checkPridceProduct(updateProd)]).subscribe((res: any) => {
          const saleInfo: ProductFlashSale = res[0].data;
          const priceInfo = res[1].data[0];
          if (saleInfo && updateProd.quantity <= saleInfo.allow_buy_quantity) {
            updateProd.price = saleInfo.sale_price;
          } else {
            updateProd.price = priceInfo.price;
          }
          // @ts-ignore
          updateProd.totalPrice = this.getTotalPriceProduct(updateProd.base_price || updateProd.price, updateProd.price, updateProd.quantity, updateProd.sale_quantity);
          this.updateCart();
        },
          (error) => {
            this.notifyMessageService.error(error.error.message)
          })
        this.unsubscribe.push(unsubscribe)
      })
  }

  public checkPridceProduct(updateProd: ItemOderCart) {
    return this.orderFacadeService.oderService().getListProductPrice([{ id: updateProd.product_id, quantity: updateProd.quantity, product_quantification_id: updateProd.product_quantification_id }]);
  }

  public checkProductFlashSale(updateProd: ItemOderCart) {
    return this.productFacadeService.getProductService().checkProductFlashsale({ id: updateProd.product_id }).pipe(
      catchError((err) => {
        return of(false)
      })
    )
  }

  public updateCart() {
    if (this.cartService.userId) {
      let unsubscribe = this.cartService.cartModify(this.listCartItem).subscribe((res) => {
        this.listCartItem.forEach(item => {
          const updateProd = res.data.cart_Details.find((x: any) => item.product_id == x.product_id && item.product_quantification_id == x.product_quantification_id);
          item.id = updateProd.id;
        })
        this.cartService.setItems(this.listCartItem);
        // this.clickSelected();
      });
      this.unsubscribe.push(unsubscribe)
    } else {
      this.cartService.setItems(this.listCartItem)
      // this.clickSelected();
    }
  }

  public removeUniqueProduct(listProduct: ItemCart[] | ItemOderCart[], product: ItemCart | ItemOderCart) {
    return listProduct.filter(prod =>
      (prod.product_id !== product.product_id) ||
      (prod.product_id === product.product_id && prod.product_quantification_id !== product.product_quantification_id) ||
      (prod.shop_id !== product.shop_id)
    );
  }

  public deleteProductFromCart(product: ItemOderCart, item: OrderModel) {
    item.products = this.removeUniqueProduct(item.products, product);
    // @ts-ignore
    this.listCartItem = this.removeUniqueProduct(this.listCartItem, product);
    this.updateCart();
  }

  // @ts-ignore
  clickSelected(isAll?: boolean) {
    this.total_pay = 0;
    this.total_product = 0;
    this.total_ship = 0;
    this.total_voucher_discount = 0;
    this.listItemOder.forEach((item) => {
      if (isAll) {
        item.selected = this.selectedAll;
      }
      item.total_order_price = 0;
      item.products.forEach((prod) => {
        if (isAll) {
          prod.selected = this.selectedAll;
        }
        prod.totalPrice = this.getTotalPriceProduct(prod.base_price || prod.price, prod.price, prod.quantity, prod.sale_quantity);
        if (prod.selected) {
          item.total_order_price += prod.totalPrice
          this.total_product++
        }
      });
      this.caculateShopVoucher(item);
      this.caculateSmartGapVoucher(item);
      this.total_pay += item.total_order_price;
      this.total_ship += (item.shipInfo ? item.shipInfo.fee : 0);
      if (item.shop_voucher?.name && item.shop_voucher?.valid) {
        this.total_voucher_discount += item.shop_voucher.discount || 0;
      }
      if (item.smartgap_voucher?.id && item.smartgap_voucher?.valid) {
        this.total_voucher_discount += item.smartgap_voucher.discount || 0;
      }
    })
    this.selectedAll = this.listCartItem.length === this.total_product && this.total_product > 0;
  }

  public caculateSmartGapVoucher(item: OrderModel) {
    let body = {
      voucher_id: item?.smartgap_voucher?.id,
      shop_id: item.shopId,
      shipping_price: item.shipInfo?.fee,
      total_price: item.total_order_price,
      products: item.products.filter(x => x.selected).map(item => ({
        product_id: item.product_id,
        product_quantification_id: item.product_quantification_id,
        quantity: item.quantity,
        price: item.price,
        category_product_id: item.category_product_id,
      }))
    }
    if (item.smartgap_voucher) {
      item.smartgap_voucher.valid = item.total_order_price >= item.smartgap_voucher.min_apply_value;
      if (item.smartgap_voucher.checked == false) {
        let unsubscribe = this.orderFacadeService.oderService().VoucherCustomerCheckDiscount(body).subscribe(res => {
          // @ts-ignore
          item.smartgap_voucher.checked = true;
          if (res.statusCode == 200) {
            // @ts-ignore
            item.smartgap_voucher?.valid = true;
            // @ts-ignore
            item.smartgap_voucher?.discount = res.data;
            this.clickSelected();
          }
        })
        this.unsubscribe.push(unsubscribe)
      }
    }
    if (item.smartgap_voucher && item.smartgap_voucher.valid) {
    } else {

    }
  }

  public caculateShopVoucher(item: OrderModel) {
    let body = {
      voucher_id: item?.shop_voucher?.id,
      shop_id: item.shopId,
      shipping_price: item.shipInfo?.fee,
      total_price: item.total_order_price,
      products: item.products.filter(x => x.selected).map(item => ({
        product_id: item.product_id,
        product_quantification_id: item.product_quantification_id,
        quantity: item.quantity,
        price: item.price,
        category_product_id: item.category_product_id,
      }))
    }
    if (item.shop_voucher) {
      item.shop_voucher.valid = item.total_order_price >= item.shop_voucher.min_apply_value;
      if (item.shop_voucher.checked == false) {
        let unsubscribe = this.orderFacadeService.oderService().VoucherCustomerCheckDiscount(body).subscribe(res => {
          // @ts-ignore
          item.shop_voucher.checked = true;
          if (res.statusCode == 200) {
            // @ts-ignore
            item.shop_voucher?.valid = true;
            // @ts-ignore
            item.shop_voucher?.discount = res.data;
            this.clickSelected();
          }
        })
        this.unsubscribe.push(unsubscribe)
      }
    }
    if (item.shop_voucher && item.shop_voucher.valid) {
      // item.shop_voucher.discount = item.shop_voucher.discount;
    } else {
    }
  }

  async Buy() {
    // this.spinnerLoader.show();
    let checkTimeVoucher: boolean = true;
    let allVoucher: any[] = [];
    let isVouhcer: boolean = false;
    isVouhcer = this.listItemOder.some(obj => (obj?.shop_voucher) || (obj?.smartgap_voucher))
    if (isVouhcer) {
      this.listItemOder.forEach(obj => {
        if (obj?.shop_voucher) {
          allVoucher.push(obj.shop_voucher);
        }
        else if (obj?.smartgap_voucher) {
          allVoucher.push(obj.smartgap_voucher);
        }
      })
      checkTimeVoucher = allVoucher.every(obj => {
        let today: Date = new Date();
        let end_date: Date = new Date(obj.end_date);
        let active_date: Date = new Date(obj.active_date);
        return today.getTime() >= active_date.getTime() && today.getTime() <= end_date.getTime()
      })

      if (!checkTimeVoucher) {
        this.notifyMessageService.warning("Chưa đến thời gian áp dụng voucher");
      }
    }
    if (checkTimeVoucher) {
      const count = this.listItemOder.filter(item => item.products.filter(prod => prod.selected).length > 0).length;
      if (count <= 0) {
        this.notifyMessageService.warning("Vui lòng chọn sản phẩm");
        return;
      }


      for (let i = 0; i < this.listItemOder.length; i++) {
        for (let j = 0; j < this.listItemOder[i].products.length; j++) {
          if (this.listItemOder[i].products[j].selected) {
            if (!this.checkQuantityAvailable(this.listItemOder[i].products[j], this.listItemOder[i].products[j].quantity)) {
              return;
            }
          }
        }
      }

      if (this.cartService.userId) {
        this.isOder = true;
      } else {
        const context = {
          redirectUrl: this.router.url,
          isShowPopup: true,
          listCartItem: this.listCartItem
        }
        this.dialogService.openDialogComponent(ModalLoginCustomerComponent, context, true).then((res) => {
          if (res) {
            this.isOder = true;
          }
        });
      }


      if (this.isOder) {
        this.isBuy = true;
        if (!this.listAddress) {
          const resAddress: any = await this.getListAddress().toPromise();
          this.listAddress = resAddress.data;
          this.selectedAdress = this.listAddress.find(address => address.is_default) || this.listAddress[0];
          if (!this.selectedAdress) {
            this.notifyMessageService.warning("Thiếu địa chỉ nhận hàng!");
            return;
          }
        }
        const listItemOder: OrderModel[] = []
        this.listItemOder.forEach(item => {
          item.products = item.products.filter(prod => prod.selected);
          if (item.products.length > 0) {
            listItemOder.push(item);
          }
        });
        this.listItemOder = listItemOder;
        // this.getListTransform();

        let listIdProduct: number[] = [];
        this.listItemOder.forEach(obj => {
          if (obj?.products.length > 0) {
            obj?.products.forEach(ele => {
              ele?.product_id && listIdProduct.push(ele.product_id)
            })
          }
        })

        const listProductFlashSale: any = await this.orderFacadeService.oderService().getProductFlashsaleCheckList(listIdProduct).toPromise()
        // this.orderFacadeService.oderService().getProductFlashsaleCheckList(listIdProduct).subscribe(res => {
        console.log(listProductFlashSale)
        this.listItemOder.forEach(item => {
          item.products.forEach(product => {

            if (product.base_price) {
              let findProductFlashsale = false;
              if (listProductFlashSale?.data.length) {
                listProductFlashSale.data.forEach(productFlashsale => {
                  if (productFlashsale.product_id == product.product_id) {
                    findProductFlashsale = true;
                  }
                })
                if (!findProductFlashsale) {
                  product.price = product.base_price;
                  product.base_price = null;
                  product.sale_price = null;
                  product.sale_quantity = null;
                  // @ts-ignore
                  item?.shop_voucher?.checked = false;
                  // @ts-ignore
                  item?.smartgap_voucher?.checked = false;
                  this.notifyMessageService.error("Sản phẩm bạn chọn đã hết thời gian flashsale");
                }
              } else {
                product.price = product.base_price;
                product.base_price = null;
                product.sale_price = null;
                product.sale_quantity = null;
                // @ts-ignore
                item?.shop_voucher?.checked = false;
                // @ts-ignore
                item?.smartgap_voucher?.checked = false;
                this.notifyMessageService.error("Sản phẩm bạn chọn đã hết thời gian flashsale");
              }
            }
          })
        })

        this.clickSelected()
        // })
      }
    }
  }
  public getShipInfo() {
    let unsubscribe = this.getShopPickupAddress().pipe(
      mergeMap((order: OrderModel[]) => {
        return this.getOderShipCost(order)
      })
    ).subscribe((res: any) => {
      let listFeeShipGhtk: any[] = []
      res.forEach((obj: any) => {
        if (obj?.data[0].shipping_method == ShipingMethod.Gttk) {
          listFeeShipGhtk.push(obj?.data[0])
        }
      })

      let listFeeShipNow: any[] = []
      res.forEach((obj: any) => {
        if (obj?.data[0].shipping_method == ShipingMethod.Now) {
          listFeeShipNow.push(obj?.data[0])
        }
      })

      this.listItemOder.forEach((order: any, index: number) => {
        if (listFeeShipGhtk[index].fee < listFeeShipNow[index].fee) {
          order.listShipInfo = [{ ...listFeeShipGhtk[index], selected: true }, listFeeShipNow[index]]
        } else {
          order.listShipInfo = [{ ...listFeeShipNow[index], selected: true }, listFeeShipGhtk[index]]
        }
        order.listShipInfo.forEach((ship: any) => {
          ship.name = ShippingCompany[ship.shipping_method]
        })

        order.shipInfo = {
          ...order.listShipInfo[0],
          shop_id: order.shopId,
          pick_up_date: "",
          selected: true,
        };
        order.estimated_pickup_date = "";
        // @ts-ignore
        order.shipping_cost = order.shipInfo.fee;
        order.shipping_company = ShippingCompany[order.shipInfo.shipping_method];
        order.shipping_method = order.shipInfo.shipping_method;
        order.estimated_delivery_date = order.shipInfo.estimated_delivery_date
        this.spinnerLoader.hide();
      })
      this.clickSelected();
      this.getListShipInfo = true;
    });
    this.unsubscribe.push(unsubscribe)
  }

  public getShopPickupAddress() {
    // @ts-ignore
    return forkJoin(this.listItemOder.map((detail) =>
      this.shopFacadeService.getShopService().getListAddress({ shop_id: detail.shopId }).pipe(
        map((res: any) => {

          let shopAddress = res.data.lists.filter((x: any) => x.warehouse_address == true);
          if (!shopAddress) {
            shopAddress = res.data.lists[0];
          }
          return { ...detail, shipAddressInfo: shopAddress };
        })
      )
    ))
  }

  // @ts-ignore
  public getOderShipCost(order: any[]) {
    let body: any = [];
    order.forEach(async item => {
      let weight = 0;
      item.products.forEach((prod: any) => {
        weight = weight + (prod.quantity * prod.weigth);
      })

      let shopAddress: any = []
      item.shipAddressInfo.forEach((obj: any) => {
        if (obj.warehouse_address) {
          shopAddress.push({
            id: obj.id,
            shop_id: obj.shop_id,
            province_id: obj.province_id,
            district_id: obj.district_id,
            province_name: obj.province_name,
            district_name: obj.district_name,
            wards_name: obj.wards_name,
            wards_id: obj.wards_id,
            address: obj.address,
            lat: obj.lat,
            lng: obj.lng,
            phone: obj.phone,
          })
        }
      })

      if (!this.selectedAdress.province_name) { return }
      // @ts-ignore
      body.push({
        province: this.selectedAdress.province_name,
        district: this.selectedAdress.district_name,
        address: this.selectedAdress.address,
        latitude: this.selectedAdress.lat,
        longitude: this.selectedAdress.lng,
        weight: weight,
        value: item.total_order_price,
        transport: "fly",
        shop_id: item.shopId,
        deliver_option: "xteam",
        shop_address: shopAddress,
        lat: this.selectedAdress.lat,
        lng: this.selectedAdress.lng,
      })
    })

    let listShippingPriceGrab = body.map((detail: any) => {
      return this.orderFacadeService.oderService().OrderShippingPriceGrab([{ ...detail, shipping_method: 1 }])
    })

    let listOrderShippingPriceGhtk = body.map((detail: any) => {
      return this.orderFacadeService.oderService().OrderShippingPriceGhtk([{ ...detail, shipping_method: 2 }])
    })


    return forkJoin([...listShippingPriceGrab, ...listOrderShippingPriceGhtk])
  }

  public confirmOrder() {

    this.disableButton = true;
    this.listOderPay = this.convertToOrderPayModel();

    if (this.selectedPayment.id == PaymentMethod.VNPay) {
      localStorage.setItem("listCartOrder", (this.listSelectedCartDetails));
      let unsubscribe = this.orderFacadeService.oderService().creatOrder(this.listOderPay)
        .subscribe((res) => {
          setTimeout(() => {
            window.location.href = res.data.url;
          }, 500);
        },
          () => {
            this.notifyMessageService.error("Đặt hàng thất bại");
            this.disableButton = false;
          }
        )
      this.unsubscribe.push(unsubscribe)
    } else {
      let unsubscribe = this.orderFacadeService.oderService().creatOrder(this.listOderPay)
        .pipe(
          mergeMap(() => this.deleteCartItem(this.listSelectedCartDetails))
        )
        .subscribe((res) => {
          this.notifyMessageService.success("Đặt hàng thành công");
          setTimeout(() => {
            window.location.href = '';
          }, 500);
        },
          () => {
            this.notifyMessageService.error("Đặt hàng thất bại");
            this.disableButton = false;
          }
        )
      this.unsubscribe.push(unsubscribe)
    }

  }

  public convertToOrderPayModel() {
    const listOrderPay: OrderPayModel[] = [];
    this.listItemOder.forEach((item) => {
      let isSelected = false;
      const tmpObject: OrderPayModel = {
        code: "",
        customer_id: +this.cartService.userId,
        description: item.description || "",
        details: [],
        dictrics_id: this.selectedAdress.district_id,
        // flashsale_cost: 0,
        flashsale_id: 0,
        id: 0,
        insurance_fees: item.insurance_fee,
        // is_shop_payed: true,
        payment_method_id: this.selectedPayment.id,
        payment_status_id: this.selectedPayment.id,
        product_total_cost: item.total_order_price,
        provice_id: this.selectedAdress.province_id,
        recipient_adress: `${this.selectedAdress.address} - ${this.selectedAdress.ward_name} - ${this.selectedAdress.district_name} - ${this.selectedAdress.province_name}`,
        recipient_email: "",
        recipient_name: this.selectedAdress.receiver,
        recipient_phone: this.selectedAdress.phone,
        recipient_lat: this.selectedAdress.lat,
        recipient_lng: this.selectedAdress.lng,

        recipient_province: this.selectedAdress.province_name,
        recipient_district: this.selectedAdress.district_name,
        ward: this.selectedAdress.ward_name,

        pickup_adress: item.shipInfo.address,
        pickup_lat: item.shipInfo.pick_latitude?.toString(),
        pickup_lng: item.shipInfo.pick_longitude?.toString(),
        pickup_phone: item.shipInfo.phone,
        pick_province: item.shipInfo.pick_province,
        pick_district: item.shipInfo.pick_district,
        pick_ward: item.shipInfo.pick_wards,
        pickup_provice_id: item.shipInfo.pick_province_id,
        pickup_dictrics_id: item.shipInfo.pick_district_id,
        pickup_wards_id: item.shipInfo.pick_wards_id,

        estimated_delivery_date: item.shipInfo.estimated_delivery_date,
        shipping_company: item.shipping_method,
        shipping_method: item.shipping_method,
        shipping_cost: item.shipInfo ? item.shipInfo.fee : 0,
        shop_id: item.shopId,
        shop_name: item.shop_name,
        status_id: OrderStatus.ChuaXacNhan,
        // total_amount: item.total_order_price + item.shipping_cost,
        voucher_cost: item.smartgap_voucher && item.smartgap_voucher.valid ? item.smartgap_voucher.discount : 0,
        voucher_id: item.smartgap_voucher && item.smartgap_voucher.valid ? item.smartgap_voucher.id : 0,
        shop_voucher_cost: item.shop_voucher && item.shop_voucher.valid ? item.shop_voucher.discount : 0,
        shop_voucher_id: item.shop_voucher && item.shop_voucher.valid ? item.shop_voucher.id : 0,
        wards_id: this.selectedAdress.ward_id,
        // warehouse_cost: 0,
        weight: 0
      };
      item.products.forEach((prod: any) => {
        if (prod.selected) {
          isSelected = true;
          const tmpProd = {
            ...prod,
            order_id: 0,
            id: 0,
            flashsale_product_id: prod.flashsale_product_id || 0,
            sale_price: prod.sale_price || 0,
            sale_quantity: prod.sale_quantity || 0,
            into_money: prod.price * prod.quantity,
            product_img: prod.product_avatar,
          }
          tmpObject.weight += (prod.weigth * prod.quantity);
          tmpObject.details.push(tmpProd);
          this.listSelectedCartDetails.push(prod.id);
        }
      })
      if (isSelected) {
        listOrderPay.push(tmpObject)
      }
    })
    return listOrderPay
  }

  // @ts-ignore
  changeQuantity(event, product: ItemOderCart, item: OrderModel) {
    if (event.target.value && event.target.valueAsNumber.toString()) {
      if (event.target.valueAsNumber < 0 || !isInteger(event.target.valueAsNumber)) {
        event.target.value = product.quantity;
      } else {
        if (event.target.valueAsNumber == 0) {
          this.dialogService.confirm("Xác nhận xóa", "Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?").then((confirm) => {
            if (confirm) {
              product.quantity = event.target.valueAsNumber;
              // @ts-ignore
              item?.shop_voucher?.checked = false;
              // @ts-ignore
              item?.smartgap_voucher?.checked = false;
              item.products = this.removeUniqueProduct(item.products, product);
              this.productQuantityChanged.next(product);
            }
          })
        } else {
          // @ts-ignore
          item?.shop_voucher?.checked = false;
          // @ts-ignore
          item?.smartgap_voucher?.checked = false;
          product.quantity = event.target.valueAsNumber;
          this.productQuantityChanged.next(product);
        }
      }
    }
  }

  public getListAddress() {
    return this.customerFacadeService.getCustomerUserService().customerUserAddressList({ customer_id: this.cartService.userId });
  }

  public chooseAdress() {
    this.listAddress.forEach(item => {
      item.selected = item.id === this.selectedAdress.id;
    })
    this.dialogService.openDialogComponent(AddressComponent, this.selectedAdress).then((address) => {
      if (address) {
        this.selectedAdress = address;
        this.getShipInfo();
      }
    })
  }

  public async openShippingDialog(item: OrderModel) {
    if (!item.shipInfo) {
      this.spinnerLoader.show()
    }

    this.dialogService.openDialogComponent(ShippingDialogComponent, item.listShipInfo, null, this.mobileStatus ? 'xs' : 'lg').then(async (ship: ShipFeeModel) => {
      if (ship && ship?.name != item?.shipping_company) {
        let body = {
          voucher_id: 0,
          shop_id: item.shopId,
          shipping_price: ship.fee,
          total_price: item.total_order_price,
          products: item.products.filter(x => x.selected).map(item => ({
            product_id: item.product_id,
            product_quantification_id: item.product_quantification_id,
            quantity: item.quantity,
            price: item.price,
            category_product_id: item.category_product_id,
          }))
        }
        if (item.shop_voucher && item.shop_voucher.valid) {
          body.voucher_id = item.shop_voucher.id;
          let unsubscribe = this.orderFacadeService.oderService().VoucherCustomerCheckDiscount(body).subscribe(res => {
            if (res.statusCode == 200) {
              // @ts-ignore
              item.shop_voucher?.discount = res.data;
              this.clickSelected();
            }
          })
          this.unsubscribe.push(unsubscribe)
        }

        if (item.smartgap_voucher && item.smartgap_voucher.valid) {
          body.voucher_id = item.smartgap_voucher.id;
          let unsubscribe = this.orderFacadeService.oderService().VoucherCustomerCheckDiscount(body).subscribe(res => {
            if (res.statusCode == 200) {
              // @ts-ignore
              item.smartgap_voucher?.discount = res.data;
              this.clickSelected();
            }
          })
          this.unsubscribe.push(unsubscribe)
        }

      }
      if (ship) {
        item.shipInfo = { ...ship };
        item.shipping_cost = ship.fee;
        item.shipping_company = ship.name;
        item.shipping_method = ship.shipping_method;
        item.estimated_pickup_date = ship.pick_up_date;
        item.estimated_delivery_date = ship.estimated_delivery_date;
        this.clickSelected();
      }
    })
  }

  async getFeeShip() {
    this.spinnerLoader.show()
    if (this.cartService.userId) {
      this.isOder = true;
    } else {
      const context = {
        redirectUrl: this.router.url,
        isShowPopup: true,
        listCartItem: this.listCartItem
      }
      this.dialogService.openDialogComponent(ModalLoginCustomerComponent, context, true).then((res) => {
        if (res) {
          this.isOder = true;
        }
      });
    }
    if (this.isOder) {
      const resAddress: any = await this.getListAddress().toPromise();
      this.listAddress = resAddress.data;
      this.selectedAdress = this.listAddress.find(address => address.is_default) || this.listAddress[0];
      if (!this.selectedAdress) {
        this.notifyMessageService.warning("1vui lòng thiết lập địa chỉ nhận hàng!");
        return;
      }
      const listItemOder: OrderModel[] = []
      this.listItemOder.forEach(item => {
        item.products = item.products.filter(prod => prod.selected);
        if (item.products.length > 0) {
          listItemOder.push(item);
        }
      });
      this.listItemOder = listItemOder;
      // this.getListTransform();
      this.getShipInfo();
    }
  }

  public openVocherDialog(item: OrderModel) {

    if (this.cartService.userId) {
      for (let i = 0; i < item.products.length; i++) {
        if (item.products[i].selected) {
          if (!this.checkQuantityAvailable(item.products[i], item.products[i].quantity)) {
            return;
          }
        }
      }

      let selectedProduct = [];
      selectedProduct = item.products.filter(prod => prod.selected);
      if (selectedProduct.length > 0) { } else {
        this.toast.warning("Bạn chưa chọn sản phẩm")
        return;
      }
      if (!item.shipInfo) {
        this.spinnerLoader.show()
      }

      if (this.listItemOder)
        this.dialogService.openDialogComponent(VoucherDialogComponent, item, null, this.mobileStatus ? 'xs' : 'lg').then((voucher) => {
          item.shop_voucher = !isEmpty(voucher?.selectedShopVoucher) ? voucher?.selectedShopVoucher : undefined;
          item.smartgap_voucher = !isEmpty(voucher?.selectedSmartgapVoucher) ? voucher?.selectedSmartgapVoucher : undefined;

          if (item.shop_voucher && item.shop_voucher.shop_id) {
            item.shop_voucher.discount = voucher.selectedShopVoucher.discount;
          }
          if (item.smartgap_voucher && item.smartgap_voucher.id) {
            item.smartgap_voucher.discount = voucher.selectedSmartgapVoucher.discount;
          }
          this.clickSelected();
        })
    } else {
      const context = {
        redirectUrl: this.router.url,
        isShowPopup: true,
        listCartItem: this.listCartItem
      }
      this.dialogService.openDialogComponent(ModalLoginCustomerComponent, context, true).then((res) => {

      });
    }
  }

  public openPaymentMethodDialog() {
    this.dialogService.openDialogComponent(PaymentDialogComponent, this.selectedPayment).then((payment) => {
      if (payment) {
        this.selectedPayment = payment;
      }
    })
  }

  public deleteCartItem(listSelectedCartDetails: number[]): Observable<any> {
    return this.cartService.deleteCartItem(listSelectedCartDetails);
  }

  public navigateProduct(product: ItemOderCart) {
    const productUrl = this.seoUrlPipe.transform(product.product_name, product.product_id);
    this.router.navigate([productUrl]);
  }

  openPolicyTab() {
    const url = `${RouterConstants.policy_security}/dieu-khoan-dich-vu`
    window.open(url, "_blank",)
  }

  private unsubscribe: Subscription[] = [];
  override ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
