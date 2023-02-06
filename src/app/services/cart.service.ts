import {BehaviorSubject, forkJoin, of, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

import {map, mergeMap, tap} from 'rxjs/operators';
import {CartModel, ItemCart, ProductItemCart} from '../viewModels/products/product-cart';
import {isInteger} from 'lodash';
import {StorageService} from "../shared/services/storage.service";
import {StorageOption} from "../shared/common/app.constants";
import {RepositoryEloquentService} from "./baserepository.service";
import {environment} from "../../environments/environment";
import {ApiConstant} from "../shared/common/api.constants";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RouterConstants} from "../shared/common/router.constants";
import {NotifyMessageService} from "../shared/services/notify-message.service";
import {OrderFacadeService} from "../components/order/service/order-facade.service";

@Injectable({
  providedIn: 'root'
})
export class CartService extends RepositoryEloquentService {
  public baseUrl = environment.baseUrl;
  product: ProductItemCart;
  items: ItemCart;
  subject = new Subject();
  cartItem = new BehaviorSubject([]);
  // itemsInCart: ItemCart[] = [];
  public itemsInCart: ItemCart[] = [];
  public userId: number;
  public cartUser: CartModel;

  constructor(
    public override httpClient: HttpClient,
    private storeService: StorageService,
    private router: Router,
    private notifyMessageService: NotifyMessageService,
    private orderFacadeService: OrderFacadeService,
  ) {
    super();
    this.storeService.initialize(StorageOption.LocalStorage);
    this.initCart();
  }

  public getCartByUser() {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.Cart
    })
    return this.get({customer_id: this.userId});
  }

  public deleteCartItem(listCartItemId: number[]) {
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CartRemoveByOder
    })
    return this.post(listCartItemId);
  }

  public cartModify(body?: ItemCart[]) {
    this.cartUser.cart_Details = body ? body : this.itemsInCart;

    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CartModify
    })
    return this.post(this.cartUser)
  }

  // @ts-ignore
  public cartAddModify(cart, local_cart) {
    this.cartUser = cart.data;
    if (local_cart && local_cart.length > 0) {
      local_cart.forEach((itemLocal: any) => {
        const itemCart = this.cartUser.cart_Details.find(x => itemLocal.product_quantification_id === x.product_quantification_id && itemLocal.product_id === x.product_id);
        if (itemCart) {
          itemCart.quantity += itemLocal.quantity;
        } else {
          this.cartUser.cart_Details.push(itemLocal);
        }
      })
    }
    this.storeService.set('local_cart', "[]");
    this.setServiceInfo({
      apiUrl: this.baseUrl.apiUrl + ApiConstant.CartModify
    })
    return this.post(this.cartUser)
  }

  public initCart() {
    this.userId = this.storeService.get("id");
    if (this.userId) {
      let local_storage = JSON.parse(this.storeService.get('local_cart') || this.storeService.get('cart') || "[]");
      if (local_storage && local_storage.length > 0) {
        this.getCartByUser().pipe(
          mergeMap((cart: any) => this.cartAddModify(cart, local_storage))).subscribe( () => {
          this.setItems(this.cartUser.cart_Details);
        })
      } else {
        this.getCartByUser().subscribe((res: any) => {
          this.cartUser = res.data
          this.setItems(this.cartUser.cart_Details);
        });
      }
    } else {
      let local_storage = JSON.parse(this.storeService.get('cart') || "[]");
      if (local_storage) {
        this.setItems(local_storage);
      }
    }
  }

  getPriceProduct(product: any, quantityNew: number,  productpricebyquantity?: any) {
    let breakForEach = false;
    productpricebyquantity.forEach((prodQuantity: any, indexProdQuantity: number) => {
      if (breakForEach) { return; }
      if ((quantityNew >= prodQuantity.from_quantity && quantityNew <= prodQuantity.to_quantity) || (quantityNew >= prodQuantity.from_quantity && prodQuantity.to_quantity === 0)) {
        product.price = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1].price;
        breakForEach = true;
      } else {
        if (indexProdQuantity == productpricebyquantity.length - 1 && quantityNew > prodQuantity.from_quantity) {
          product.price = prodQuantity.productPriceRangeQuantities[product.index_quantitative - 1].price;
        }
      }
    })
  }

  async addToCart(listProduct: ItemCart[], isBynow?: boolean, productpricebyquantity?: any) {
    let error = false;
    if (listProduct.length == 0) {
      this.notifyMessageService.error("Số lượng sản phẩm chưa được nhập hoặc không hợp lệ!");
      return;
    }
    const local_storage: ItemCart[] = JSON.parse(localStorage.getItem('cart') || "[]");
    if (local_storage.length > 0) {
      listProduct.forEach(item => {
        item.cart_id = item.cart_id || this.cartUser?.id;
        item.id = item.id || 0;
        item.price = item.price || 0;
        const itemAdded = local_storage.find(x => x.product_id === item.product_id
          && x.product_quantification_id === item.product_quantification_id);
        if (itemAdded) {
          if ((itemAdded.quantity + item.quantity) > item.quantity_stock) {
            error = true;
            this.notifyMessageService.error(`Số lượng ${item.product_name} ${item.product_quantification_name} vượt quá số lượng trong kho!`);
            return;
          }
          itemAdded.quantity += item.quantity;
          itemAdded.selected = item.selected || false;
          itemAdded.saleInfo = item?.saleInfo;
          productpricebyquantity && this.getPriceProduct(itemAdded, itemAdded.quantity, productpricebyquantity)
        } else {
          local_storage.push(item)
        }
      })
      this.itemsInCart = local_storage;
    } else {
      this.itemsInCart = listProduct;
    }
    if (error) {
      return;
    }
    // await this.getProductPrice().toPromise();
    if (this.userId) {
      this.cartModify().subscribe( res => {
        const listProduct: ItemCart[] = res.data.cart_Details;
        listProduct.forEach(item => {
          const local = this.itemsInCart.find(x => x.product_id === item.product_id && x.product_quantification_id === item.product_quantification_id);
          item.selected = local ? local.selected : false;
        })
        this.setItems(listProduct)
        this.notifyMessageService.success("Thêm vào giỏ hàng thành công");
        if (isBynow) {
          this.router.navigate([RouterConstants.order])
        }
      }, () => {
        this.notifyMessageService.error("Thêm vào giỏ hàng thất bại");
      })
    } else {
      this.setItems(this.itemsInCart)
      this.notifyMessageService.success("Thêm vào giỏ hàng thành công");
      if (isBynow) {
        this.router.navigate([RouterConstants.order])
      }
    }
  }

  public getProductPrice() {
    const body = this.itemsInCart.map(item => ({
      id: item.product_id,
      quantity: item.quantity,
      product_quantification_id: item.product_quantification_id
    }));
    return this.orderFacadeService.oderService().getListProductPrice(body).pipe(
      tap((res: any) => {
        res.data.forEach((priceInfo: any) => {
          const cartItem = this.itemsInCart.find(x => x.product_id == priceInfo.id && x.product_quantification_id == priceInfo.product_quantification_id);
          if (cartItem && cartItem.saleInfo && cartItem.quantity <= cartItem.saleInfo.allow_buy_quantity) {
            cartItem.price = cartItem.saleInfo.sale_price;
          } else {
            // @ts-ignore
            cartItem.price = priceInfo.price
          }
        })
      }))
  }

  getItems() {
    return this.items = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  setItems(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
    this.cartItem.next(this.getItems());
  }
}
