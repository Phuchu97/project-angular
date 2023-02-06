import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouterConstants} from "../../../common/router.constants";
import {AuthService} from "../../../../services/auth.service";
import {SeoUrlPipe} from "../../../pipes/seo-url.pipe";
import {StorageService} from "../../../services/storage.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {CategoryProductService} from "../../../../services/category-product.service";

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit {
  @Input() listMenu: any = [];
  @Output() signIn = new EventEmitter();
  @Output() signUp = new EventEmitter();
  public username: string;

  constructor(
    private authService: AuthService,
    public seoUrlPipe: SeoUrlPipe,
    private storeService: StorageService,
    private router: Router,
    private translate: TranslateService,
    private categoryService: CategoryProductService,
  ) {
    this.storeService.change$.subscribe(() => {
      this.username = this.storeService.get("username");
    })
  }

  ngOnInit(): void {
    this.username = this.storeService.get("username");
    if (this.listMenu && this.listMenu.length == 0) {
      let lang = this.translate.currentLang;
      this.categoryService.getListCategoryProductMenu(lang).subscribe((rs: any) => {
        this.listMenu = rs.data;
      })
    }
  }

  navigateItem(item: any) {
    const categoryUrl = this.seoUrlPipe.transform(item.name, item.id);
    window.location.href = `${RouterConstants.chuyen_muc}/${categoryUrl}`;
  }

  public toggleMenu() {
    const el1: any = document.getElementsByClassName("menu_toggle");
    const el2: any = document.getElementsByClassName("mobile-main-menu");
    Array.from(el1).forEach((item: any) => {
      item.className = item.className.replace(" active", "");
    })
    Array.from(el2).forEach((item: any) => {
      item.className = item.className.replace(" active", "");
    })
  }

  public userInfo() {
    this.router.navigate([`${RouterConstants.customer}/${RouterConstants.info}`]);
  }

  logOut() {
    this.authService.logout();
    window.location.reload();
  }

  openSignIn() {
    this.toggleMenu();
    this.signIn.emit(true);
  }

  openSignUp() {
    this.toggleMenu();
    this.signUp.emit(true);
  }
}
