import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteLayoutComponent} from './shared/components/layout/site-layout/site-layout.component';
import {RouterConstants} from "./shared/common/router.constants";
import {RegisShopLayoutComponent} from "./shared/components/layout/regis-shop-layout/regis-shop-layout.component";
import {AuthGuard} from "./shared/services/auth.guard";

const routes: Routes = [

  {
    path: 'regis-shop',
    component: RegisShopLayoutComponent,
    loadChildren: () => import('./components/regis-shop/regis-shop.module').then(m => m.RegisShopModule)
  },
  {
    path: RouterConstants.forgot_password,
    component: RegisShopLayoutComponent,
    loadChildren: () => import('./components/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },

  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
      },
      {
        path: RouterConstants.chuyen_muc,
        loadChildren: () => import('./components/category-product/category-product.module').then(m => m.CategoryProductModule)
      },
      {
        path: RouterConstants.shops,
        loadChildren: () => import('./components/shops/shops.module').then(m => m.ShopsModule)
      },
      {
        path: RouterConstants.smart_mall_all,
        loadChildren: () => import('./components/smart-mall-all/smart-mall-all.module').then(m => m.SmartMallAllModule)
      },
      {
        path: RouterConstants.area_all,
        loadChildren: () => import('./components/area-all/area-all.module').then(m => m.AreaAllModule)
      },
      {
        path: RouterConstants.order,
        loadChildren: () => import('./components/order/order.module').then(m => m.OrderModule)
      },
      {
        path:RouterConstants.search_product,
        loadChildren: () => import('./components/search-product/search-product.module').then(m => m.SearchProductModule)
      },
      {
        path:RouterConstants.search_top_product_list,
        loadChildren: () => import('./components/top-search-product/top-search-product.module').then(m => m.ProductTopSearchModule)
      },
      {
        path: RouterConstants.flash_sale,
        loadChildren: () => import('./components/flash-sale/flash-sale.module').then(m => m.FlashSaleModule)
      },
      {
        path: RouterConstants.voucher_shop,
        loadChildren: () => import('./components/voucher-shop/voucher-shop.module').then(m => m.VoucherShopModule)
      },
      {
        path: RouterConstants.product_standard,
        loadChildren: () => import('./components/product-standard/product-standard.module').then(m => m.ProductStandardModule)
      },
      {
        path: RouterConstants.news,
        loadChildren: () => import('./components/news/news.module').then(m => m.NewsModule)
      },
      {
        path: RouterConstants.policy_security,
        loadChildren: () => import('./components/policy-security/policy-security.module').then(m => m.PolicySecurityModule)
      },

      {
        path: ':productId',
        loadChildren: () => import('./components/product-detail/product-detail.module').then(m => m.ProductDetailModule)
      },
    ]
  },
  // customer routes goes here here
  {
    path: RouterConstants.customer,
    loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuard]
  },

  //no layout routes

  //otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
