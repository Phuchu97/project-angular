import { Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { Component, OnInit } from '@angular/core';
import { CookieProvider } from 'src/app/shared/providers/cookie.provider';
import { StorageService } from 'src/app/shared/services/storage.service';
import { PositionBannerSlide, StorageOption, TokenEnum } from 'src/app/shared/common/app.constants';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { RouterConstants } from "../../../../shared/common/router.constants";
import { AuthService } from "../../../../services/auth.service";
import { SeoUrlPipe } from "../../../pipes/seo-url.pipe";
import { AliasStringPipe } from "../../../pipes/alias-string.pipe";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BannerSlideService } from 'src/app/services/banner-slide.service';

declare const toggleMenu: any;

@Component({
  selector: 'header-menu-search',
  templateUrl: './header-menu-search.component.html',
  styleUrls: ['./header-menu-search.component.scss']
})
export class HeaderMenuSearchComponent extends AppComponentBase implements OnInit {
  @ViewChild('modalLoginCustomer', { static: true }) modal: ModalDirective;
  @ViewChild('modalRegisCustomer', { static: true }) modalRegis: ModalDirective;
  @ViewChild('modalForgotPass', { static: true }) modalForgotPass: ModalDirective;
  hasProductCart: boolean = false;
  categoryProduct: any;
  fullName: string;
  username: string;
  totalProductInCart: number = 0;
  search: string;

  positionBannerSlide: typeof PositionBannerSlide = PositionBannerSlide;
  searchSuggesstion: Array<string> = ['Rau', ' trái cây', ' gia vị', ' hải sản', ' thịt'];
  constructor(
    private injector: Injector,
    private categoryService: CategoryProductService,
    private cookieService: CookieProvider,
    private storeService: StorageService,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    public seoUrlPipe: SeoUrlPipe,
    public aliasStringPipe: AliasStringPipe,
    private bannerService: BannerSlideService,
  ) {
    super(injector);
    this.storeService.change$.subscribe(() => {
      this.fullName = this.storeService.get('full_name');
      this.username = this.storeService.get("username");
    })
  }

  override ngOnInit(): void {
    this.showCategoryProduct();
    this.storeService.initialize(StorageOption.LocalStorage);
    this.fullName = this.storeService.get('full_name');
    this.username = this.storeService.get("username");
    this.countProductInCart();
    this.getLogo();
  }

  toggleMenuClick() {
    toggleMenu();
  }

  onMouseOverLeaveCart() {
    this.hasProductCart = false;
  }

  navigateToCart() {
    this.router.navigate([RouterConstants.order]);
  }

  handleData(event:any){
    this.hasProductCart = false;
  }

  onMouseOverMoveCart() {
    this.hasProductCart = true;
  }

  countProductInCart() {
    this.cartService.cartItem.subscribe((rs: any) => {
      this.totalProductInCart = rs.length;
    })
  }

  showCategoryProduct() {
    let lang = this.translate.currentLang;
    this.categoryService.getListCategoryProductMenu(lang).subscribe(rs => {
      this.categoryProduct = rs.data;
    })
  }

  logOut() {
    this.authService.logout();
    window.location.reload();
  }

  // @ts-ignore
  public navigateItem(item) {
    const categoryUrl = this.seoUrlPipe.transform(item.name, item.id);
    window.location.href = `${RouterConstants.chuyen_muc}/${categoryUrl}`;
  }


  public userInfo() {
    this.router.navigate([`${RouterConstants.customer}/${RouterConstants.info}`]);
  }
  public purchase_order()
  {

     this.router.navigate(['/customer/customer-order'])
  }
  public searchProduct(keyword: string) {
    this.search = keyword;
    this.router.navigateByUrl('/search-product?search=' + this.search);
  }

  listBannerSlide: any;
  url = '';
  getLogo() {
    this.bannerService.getBannerSlideHome(this.positionBannerSlide.LogoTop).subscribe(rs => {
      this.listBannerSlide = rs.data[0].files[0];
      this.url = rs.data[0].url
    })
  }
}
