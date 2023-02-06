
export class ApiConstant {
  //#region Auth

  public static LoginUrl = 'customer/api/customer/customer-login';
  public static LanguageList = 'category/api/category/category-language-list';
  //#endregion
  //#region

  public static CategoryUnitsList = 'category/api/category/category-unit-list';
  public static CategoryUnitsGetById = 'category/api/category/category-unit';

  //#endregion

  //#region CategoryProduct

  public static CategoryProductGetAll = 'category/api/category-product/category-product-list';
  public static CategoryProductMenu = 'category/api/category-product/category-product-list-view-search';
  public static CategoryProductViewHome = 'category/api/category-product/category-product-list-view-menu';
  public static CategoryProductByParentID = 'category/api/category-product/category-product-list-parent'

  public static CategoryProductGetById = 'category/api/category-product/category-product';
  public static CategoryProductSearch = `shop/api/customer/product-customer-search`;
  public static ProductSearchByKeyWord = `shop/api/customer/product-customer-search`;
  public static ProductSearchByCategoryParentID='category/api/category-product/category-product-prent-child-list';




  //#endregion
  //#region CategoryProductStandard

  public static CategoryProductStandardList = 'category/api/category/category-standard-list';
  public static CategoryProductStandardGetById = 'category/api/category/category-standard';
  public static CategoryStandardList = `category/api/category/category-standard-list-view`;
  //#endregion
  //#region category-status
  public static CategoryStatusList = 'category/api/category/category-status-list-bytype';
  //#endregion
  //#region categoryPacking

  public static CategoryPackingList = 'category/api/category/category-packing-list';
  public static CategoryPackingGetById = 'category/api/category/category-packing';

  //#endregion
  //#region categoryArea

  public static CategoryAreaList = 'category/api/category/category-area-list';
  public static CategoryAreaGetById = 'category/api/category/category-area';
  public static CategoryRegionList = `category/api/category/category-area-list-view`;

  //#endregion
  //#region categoryArea

  public static CategoryNationList = 'category/api/category/category-nation-list';
  public static CategoryNationGetById = 'category/api/category/category-nation';

  //#endregion
  //#region categoryArea

  public static CategoryLinkList = 'category/api/category/category-link-list';
  public static CategoryStandardListView = 'category/api/category/category-standard-list-view';
  public static CategoryLinkGetById = 'category/api/category/category-link';

  //#region categoryProvince
  public static CategoryProvinceList = `category/api/category/category-province-list-view`;
  public static CategoryProvince = `category/api/category/category-province-list`;
  public static CategoryDisTrictListProvince = `category/api/category/category-district-list-province`;
  public static CategoryWardListDistrict = `category/api/category/category-ward-list-district`;
  public static CategoryNewsGetAll = 'category/api/category/category-news-list';
  //#endregion

  //#region shops
  public static RequestShop = 'shop/api/user/shop-request-create';
  public static RegisterShop = 'shop/api/user/shop-user-create';
  public static Shop = `shop/api/user/shop`;
  public static ShopPoduct = "shop/api/product/shop-product-list-byshop";
  public static CheckUserName = "shop/api/user/shop-check-username";
  public static ProductionDiagram = `shop/api/user/shop-production-diagram-list`;
  public static Shop_Partner = `shop/api/user/shop-affiliated-list`;
  public static ShopMaterialArea = 'shop/api/user/shop-raw-material-area-list';
  public static ShopFactory = 'shop/api/user/shop-factory-list';
  public static ShopSeedMaterial = 'shop/api/user/shop-seed-material-list';
  public static ShopMaterial = `shop/api/product/shop-product-material-list`;//vat tu san xuat
  public static CreateOtpSMS = 'shop/api/user/send-otp-create';
  public static CreateOtpEmail = 'shop/api/user/send-mail-otp-create';
  public static CheckOtp = 'shop/api/user/check-otp';
  public static CheckOtpEmail = 'shop/api/user/check-mail-otp';
  public static ShopAreaSales = 'shop/api/user/shop-store-list';
  public static ShopAddress = 'shop/api/user/shop-address-list';
  public static VoucherShop = 'sale/api/voucher/shop-voucher-list-for-customer';
  //forgot password
  public static CreateOtpSMSForgotPassword = 'shop/api/user/send-otp-forgot-password';
  public static CreateOtpEmailForgotPassword = 'shop/api/user/send-mail-otp-create';
  public static CheckOtpForgotPassword = 'shop/api/user/check-otp-forgot-password';
  public static CheckOtpEmailForgotPassword = 'shop/api/user/check-mail-otp';
  public static ForgotPasswordShop = 'shop/api/user/forgot-password-modify';

  //#endregion

  //#region products
  public static ProductSmartMallHome = 'shop/api/customer/product-smart-mall-view-home';
  public static ProductSmartMallHomeReal = 'shop/api/customer/shop-smartmall-list';
  public static ProductAreaHome = 'shop/api/customer/product-area-view-home';
  public static ProductSearchHome = 'shop/api/customer/product-top-search-view-home';
  public static ProductSmartMallAll = 'shop/api/customer/product-smart-mall-view-all';
  public static ProductAreaAll = 'shop/api/customer/product-area-view-all';
  public static ProductSuggetToday = 'shop/api/customer/product-propose-view-home';
  public static ProductFlashSaleAll = 'sale/api/flashsale/list-product-flashSale';
  public static ProductFlashSaleFuture = 'sale/api/flashsale/list-product-flashSale-future';
  public static FlashSaleHappenning = 'sale/api/flashsale/list-for-customer';
  public static ProductFlashSale = 'sale/api/flashsale/check-product';
  public static ProductCartList = 'shop/api/product/product-cart-list';
  public static ProductFlashsaleCheckList = 'sale/api/flashsale/product-flashsale-check-list';
  //#endregion

  public static Product = '/shop/api/product/shop-product';
  public static ProductDescription = '/shop/api/product/shop-product';
  public static ProductCamLive = '/shop/api/product/shop-product';
  public static ProductCertificate =  `shop/api/product/shop-product-certificate-customer-viewlist`
  public static ProductEngineeringProcess = '/shop/api/product/shop-product-process-engineering-list';
  public static ProductMeterial = '/shop/api/product/shop-product-material-list';
  public static ProductUpdateCountView = '/shop/api/customer/product-update-view';
  public static ProductProductionProcess = '/shop/api/customer/product-production-process-view';
  public static ProductProductionLogList = '/shop/api/product/shop-product-production-log-list-view';
  public static ProductFactory = 'shop/api/user/product-factory-list';
  public static ProductMaterialArea = 'shop/api/user/product-raw-material-area-list';
  public static ProductSeedMaterial = 'shop/api/user/product-seed-material-list';
  public static ProductPrice = 'shop/api/product/shop-product-price-cart'
  public static ProductListPrice = 'shop/api/product/shop-product-list-price-cart'

  //#region
  public static RegisterCustomer = 'customer/api/customer/customer-user-create';
  public static ProductRelatedCustomerSearch = 'shop/api/customer/product-related-customer-search';
  public static CustomerUser = `customer/api/customer/customer-user`;
  public static CustomerUserModify = `customer/api/customer/customer-user-modify`;
  public static CustomerUserChangePassword = `customer/api/customer/customer-user-changepass`;
  public static CustomerAddressList = `customer/api/customer-address/customer-address-list`;
  public static CustomerAddressModify = `customer/api/customer-address/customer-address-modify`;
  public static CustomerAddressDelete = `customer/api/customer-address/customer-address-delete`;
  public static CustomerAddress = `customer/api/customer-address/customer-address`;
  public static CustomerAddressCreate = `customer/api/customer-address/customer-address-create`;
  public static CustomerFollowProduct = `customer/api/customer-follow/customer-follow-product`;
  public static CustomerUnfollowProduct = `customer/api/customer-follow/customer-unfollow-product`;
  public static CustomerFollowProductList = `customer/api/customer-follow/customer-follow-product-list`;
  public static CustomerModifyAvatar = `customer/api/customer/customer-modify-avatar`;
  public static CreateOtpSMSCustomer = 'customer/api/customer/send-otp-create';
  public static CreateOtpEmailCustomer = 'customer/api/customer/send-mail-otp-create';
  public static CheckOtpCustomer = 'customer/api/customer/check-otp';
  public static CheckOtpEmailCustomer = 'customer/api/customer/check-mail-otp';
  public static CheckExistCustomer = 'customer/api/customer/customer-check-username';
  public static CustomerFollowShop= 'customer/api/customer-follow/customer-follow-shop';
  public static CustomerUnfollowShop= 'customer/api/customer-follow/customer-unfollow-shop';
  public static CustomerFollowShopList= 'customer/api/customer-follow/customer-follow-shop-list';
  public static CustomerCheckFollowProduct = 'customer/api/customer-follow/customer-check-follow-product';
  public static CustomerCheckFollowShop = 'customer/api/customer-follow/customer-check-follow-shop';
  //opt forgot pasword
  public static CreateOtpSMSCustomer_ForgotPass = 'customer/api/customer/send-otp-forgot-password';
  public static CreateOtpEmailCustomer_ForgotPass = 'customer/api/customer/send-otp-forgot-password';
  public static CheckOtpSMSCustomer_ForgotPass = 'customer/api/customer/check-otp-forgot-password';
  public static CheckOtpEmailCustomer_ForgotPass = 'customer/api/customer/check-mail-otp';
  public static ForgotPass = 'customer/api/customer/forgot-password-modify';

  //#endregion
  //#region banner-slide
  public static BannerSlide = 'news/api/news-banner/banner-list-home-view';

  //#endregion
  public static Cart = "cart/api/cart/cart";
  public static CartCreat = "cart/api/cart/cart-create";
  public static CartModify = "cart/api/cart/cart-modify";
  public static CartHistory = "cart/api/cart/cart-history";
  public static CartRemoveByOder = "cart/api/cart/cart-remove-by-order";

  // Odder
  public static Oder = "order/api/oder";
  public static OderCreat = "order/api/order-create";
  public static OderList = "order/api/order-list";
  public static OderShipFee = "order/api/order-check-fee2";
  public static OderCancel = "order/api/order-user-cancel";
  public static OrderShippingPriceGrab = "order/api/order-shipping-price-grab";
  public static OrderShippingPriceGhtk = "order/api/order-shipping-price-ghtk";

  public static PaymentReturn = "payment/api/payment/payment-return";

  // Sale
  public static ShopVoucherListForCustomer = "sale/api/voucher/voucher-shop-customer-list";
  public static CustomerAddVoucher = "sale/api/voucher/customer-add-voucher";
  public static CustomerVoucherList = "sale/api/voucher/customer-list-voucher";
  public static CustomerVoucherSmartGap = "sale/api/voucher/voucher-customer-list";
  public static CustomerApplyShopVoucher = "sale/api/voucher/customer-apply-shop-voucher";
  public static CustomerApplyVoucher = "sale/api/voucher/customer-apply-voucher";
  public static VoucherCustomerCheckDiscount = "sale/api/voucher/voucher-customer-check-discount";
  public static VoucherGetByIdUrl = 'sale/api/voucher/voucher';
  //#region news
  public static Newslist = "news/api/news/news-list";
  public static NewsDetail = "news/api/news/news-detail";
  //#endregion


  //#reigon Customer Notify
  public static UrlNotifyByUser="notification/api/notification/notification-list-byuser";

  //#endregion
}
