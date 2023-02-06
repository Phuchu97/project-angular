import {AppComponentBase} from 'src/app/shared/common/app-base-component';
import {Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild, Pipe} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {ItemCart} from 'src/app/viewModels/products/product-cart';
import {CartService} from 'src/app/services/cart.service';
import {Router} from "@angular/router";
import {RouterConstants} from "../../../common/router.constants";

@Component({
  selector: 'app-popup-cart',
  templateUrl: './popup-cart.component.html',
  styleUrls: ['./popup-cart.component.css']
})
export class PopupCartComponent extends AppComponentBase implements OnInit {
  @ViewChild('modalCart', {static: true}) modal: ModalDirective;
  @Input() hasProductCart: boolean;
  @Output("checkProductCart") checkProductCart = new EventEmitter();
  productCart: ItemCart[] = [];
  isShowCart: boolean = false;
  clickHideCart:boolean =true;
  constructor(
    private injector: Injector,
    private cartService: CartService,
    private router: Router,
  ) {
    super(injector)
  }

  override ngOnInit(): void {
    this.productInCart();
  }

  productInCart() {
    this.cartService.cartItem.subscribe((rs: ItemCart[]) => {
      this.productCart = rs;
      this.isShowCart = this.productCart.length > 0;
    })
  }

  showPopupCart() {
    this.modal.show();
  }

  navigateToCart() {
    this.clickHideCart=!this.clickHideCart;
    this.checkProductCart.emit(true);
    this.router.navigate([RouterConstants.order]);
  }
}
