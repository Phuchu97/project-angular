import { ModalForgotPassComponent } from './components/modal-forgot-pass/modal-forgot-pass.component';
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {TranslateModule} from "@ngx-translate/core";
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {ModalModule} from "ngx-bootstrap/modal";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ModalDialogModule} from "ngx-modal-dialog";
import {NgxSpinnerModule} from "ngx-spinner";
import {ToastrModule} from "ngx-toastr";
import {NgxUsefulSwiperModule} from "ngx-useful-swiper";
// import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {MyPaginationComponent} from "./components/my-pagination/my-pagination.component";
import {AppHeaderComponent} from "./components/layout/app-header/app-header.component";
import {AppLayoutComponent} from "./components/layout/app-layout/app-layout.component";
import {HeaderMenuSearchComponent} from "./components/layout/header-menu-search/header-menu-search.component";
import {HeaderTopComponent} from "./components/layout/header-top/header-top.component";
import {MenuMobileComponent} from "./components/layout/menu-mobile/menu-mobile.component";
import {PopupCartComponent} from "./components/layout/popup-cart/popup-cart.component";
import {RegisShopLayoutComponent} from "./components/layout/regis-shop-layout/regis-shop-layout.component";
import {SiteFooterComponent} from "./components/layout/site-footer/site-footer.component";
import {SiteHeaderComponent} from "./components/layout/site-header/site-header.component";
import {SiteLayoutComponent} from "./components/layout/site-layout/site-layout.component";
import {PipeModule} from "./pipes/pipe.module";
import {NgOtpInputModule} from "ng-otp-input";
import {ModalLoginCustomerComponent} from "./components/modal-login-customer/modal-login-customer.component";
import {ModalRegisCustomerComponent} from "./components/modal-regis-customer/modal-regis-customer.component";
import {ModalRequestShopComponent} from "./components/modal-request-shop/modal-request-shop.component";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import {GalleryModule} from "ng-gallery";
import {LightboxModule} from "ng-gallery/lightbox";
import {NganluongComponent} from "./components/nganluong/nganluong.component";
import {AgmCoreModule} from "@agm/core";
import {NgxGalleryModule} from "@kolkov/ngx-gallery";
import {MapViewComponent} from "./components/map-view/map-view.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {MapComponent} from "./components/map/map.component";
@NgModule({
  exports: [
    RouterModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSpinnerModule,
    ToastrModule,
    PaginationModule,
    ModalModule,
    TranslateModule,
    NgxUsefulSwiperModule,
    PipeModule,
    NgOtpInputModule,
    BsDatepickerModule,
    ModalDialogModule,
    InfiniteScrollModule,
    GalleryModule,
    LightboxModule,
    AgmCoreModule,
    NgxGalleryModule,
    // ProductDetailComponent,
    MyPaginationComponent,
    AppHeaderComponent,
    AppLayoutComponent,
    HeaderMenuSearchComponent,
    HeaderTopComponent,
    MenuMobileComponent,
    PopupCartComponent,
    RegisShopLayoutComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    SiteLayoutComponent,
    ModalLoginCustomerComponent,
    ModalRegisCustomerComponent,
    ModalRequestShopComponent,
    ConfirmDialogComponent,
    MapViewComponent,
    MapComponent,
    ModalForgotPassComponent
  ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgxSpinnerModule,
        NgxUsefulSwiperModule,
        ToastrModule.forRoot(),
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        ModalDialogModule.forRoot(),
        BsDatepickerModule,
        TranslateModule,
        PipeModule,
        NgOtpInputModule,
        InfiniteScrollModule,
        GalleryModule.withConfig({
            loadingStrategy: "lazy",
            counter: false,
        }),
        LightboxModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA8vqktVPxULbHbDu98_m02Abm1l1vi6J0'
        }),
        NgxGalleryModule,
        BsDropdownModule
    ],
  declarations: [
    // ProductDetailComponent,
    MyPaginationComponent,
    AppHeaderComponent,
    AppLayoutComponent,
    HeaderMenuSearchComponent,
    HeaderTopComponent,
    MenuMobileComponent,
    PopupCartComponent,
    RegisShopLayoutComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    SiteLayoutComponent,
    ModalLoginCustomerComponent,
    ModalRegisCustomerComponent,
    ModalRequestShopComponent,
    ConfirmDialogComponent,
    NganluongComponent,
    MapViewComponent,
    MapComponent,
    ModalForgotPassComponent
  ],
  providers: [BsDatepickerConfig, NgbActiveModal]
})
export class ShareModule {
}
