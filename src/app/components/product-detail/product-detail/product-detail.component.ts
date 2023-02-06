import { SmartMall } from './../../../shared/common/app.constants';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductFacadeService } from "../service/product-facade.service";
import {
  FileModel,
  ProductFlashSale,
  ProductModel,
  ProductPriceRangeQuantities,
  ProductQuantificationModel,
  ProductQuantity,
  ProductShippingInformations,
  ProductStandard,
  ProvinceOfSales
} from "../../shared/model/product.model";
import { forkJoin, Observable, of, Subject } from "rxjs";
import { ShopFacadeService } from "../../shops/service/shop-facade.service";
import { debounceTime, mergeMap } from "rxjs/operators";
import { ShopModel } from "../../shops/model/shop.model";
import { CartService } from "../../../services/cart.service";
import { ItemCart } from "../../../viewModels/products/product-cart";
import { ItemOderCart } from "../../order/model/order.model";
import { MaterialAreaModel } from "../../shops/model/material-area.model";
import { FactoryModel } from "../../shops/model/factory.model";
import { ProductProcessModel, ProductProductLog } from "../../shared/model/product-process.model";
import { ProductCertificateModel } from "../../shared/model/product-certificate.model";
import { SeedMaterialModel } from "../../shops/model/seed-material.model";
import { MaterialModel } from "../../shops/model/material.model";
import { CategoryProductFacadeService } from "../../category-product/service/category-product-facade.service";
import { NgxSpinnerService } from "ngx-spinner";
import {
  NgxGalleryAnimation,
  NgxGalleryComponent,
  NgxGalleryImage,
  NgxGalleryImageSize,
  NgxGalleryOptions
} from "@kolkov/ngx-gallery";
import { ProductEngineeringModel } from "../../shared/model/product-engineering.model";
import { AuthService } from "../../../services/auth.service";
import { isInteger } from "lodash";
import { RouterConstants } from 'src/app/shared/common/router.constants';
import {
  PagingConstant,
  ProductTypeConstant,
  ShopTypeConstant,
  StatusIdConstant,
  TokenEnum
} from "../../../shared/common/app.constants";
import { DialogService } from "../../../shared/services/dialog.service";
import { SeoUrlPipe } from "../../../shared/pipes/seo-url.pipe";
import { OrderConstans } from "../../../shared/common/category.constans";
import { CustomerFacadeService } from "../../customer/service/customer-facade.service";
import { StorageService } from "../../../shared/services/storage.service";
import { MapViewComponent } from "../../../shared/components/map-view/map-view.component";
import { UtilsService } from "../../../shared/services/utils.service";
import { NotifyMessageService } from "../../../shared/services/notify-message.service";
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { LinkCatalogsService } from 'src/app/services/link-catalogs.service';
import Swiper, { SwiperOptions } from 'swiper';
import { ApiStorageConstant } from 'src/app/shared/common/api-storage';
import { environment } from 'src/environments/environment';
import { auto } from '@popperjs/core';
import { SwiperComponent } from 'ngx-useful-swiper';
import { ImageUrlPipe } from 'src/app/shared/pipes/image-url.pipe';
import { formatDate } from '@angular/common';

import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  @ViewChild("ngxGalleryComponent", { static: true }) public ngxGalleryComponent: NgxGalleryComponent;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('usefulSwiper222') usefulSwiper222: SwiperComponent;
  @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
  @ViewChild('swiperdetail') swiperdetail: SwiperComponent;
  public productId: number;
  public productInfo: ProductModel;
  public productPriceByQuantity: ProductQuantity[] = [];
  public productPriceRange: any;
  public productQuantification: ProductQuantificationModel[] = [];
  public productShippingInformations: ProductShippingInformations[];
  public productStandard: ProductStandard[] = [];
  public provinceOfSales: ProvinceOfSales[] = [];
  public productService: Observable<any>;
  public shopService: Observable<any>;
  public shopID: number;
  public shopInfo: ShopModel;
  public listProductOrderModel: ItemCart[] = [];
  public productQuantityChanged: Subject<ItemOderCart> = new Subject<ItemOderCart>();
  public isProducNomal: boolean = true;
  public productDescription: any;
  public productProcess: ProductProcessModel[];
  public productCamlive: any;
  public productCertificate: ProductCertificateModel[];
  public productSeedMeterial: SeedMaterialModel[];
  public productTechnicalProcess: ProductEngineeringModel[];
  public productMeterial: MaterialModel[];
  public material: MaterialAreaModel[] = [];
  public factory: FactoryModel[] = [];
  public isShopNomal: boolean = true;
  public productProcessOrigin: ProductProcessModel[];
  public collapse: boolean = false;
  public isDetailHistory: boolean = false;
  public isHistoryProcess: boolean = false;
  public statusIdConstant = StatusIdConstant;
  public selectedProductProcess: ProductProcessModel | null;

  public pagingConstant = PagingConstant;
  public totalItems: number;
  public listProduct: ProductModel[] = [];
  public routerConstant = RouterConstants;
  public listProductBestSaler: ProductModel[] = [];
  public productProductionLogList: ProductProductLog[] = [];
  public productProductionLogListOrigin: ProductProductLog[] = [];

  public galleryOptions: NgxGalleryOptions[] = [];
  public galleryTabOptions: NgxGalleryOptions[] = [];
  public galleryImages: NgxGalleryImage[] = [];
  public productMaterialArea: MaterialAreaModel[] = [];
  public productFactory: FactoryModel[] = [];
  public urlCurrent: string;
  private userId: any;
  public isFollowProduct = false;
  public isFollowShop = false;
  public productFlashSale: ProductFlashSale;
  public countdownConfig: CountdownConfig = {
    leftTime: 0,
    format: 'd:HH:mm:ss',
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="custom-timer">${v}</span>`)
        .join(':');
    },
  };
  slideConfig = {
    "slidesToShow": 2,
    "slidesPerRow": 1,
    "arrows": true,
    "centerMode": true,
    "focusOnSelect": true,
    "focusOnChange": true,
    "infinite": false,
    "mobileFirst": true,
    "swipe": true,
    "swipeToSlide": true,
    "touchMove": true,
    "touchThreshold": 3,
    "initialSlide": 1,
    "speed": 100,
    "allowSlidePrev": true,
    "allowSlideNext": true,
  };

  config1: SwiperOptions = {
    autoplay: true,
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true
    // },
    //navigation: true,
    slidesPerView: auto,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      //disabledClass:'.swiper-button-disabled'

    },

    direction: 'horizontal',
    preventClicks: true,
    spaceBetween: 30,
    loop: false,
    // loopedSlides: 2,
    speed: 100,
    watchOverflow: true,
    scrollbar: { draggable: true },
    slideToClickedSlide: false,
    touchRatio: 0.2,
    centeredSlides: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  config: SwiperOptions = {
    autoplay: false,
    slidesPerView: auto,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    direction: 'horizontal',
    preventClicks: true,
    spaceBetween: 30,
    loop: true,
    loopedSlides: 2,
    speed: 900,
    watchOverflow: true,
    scrollbar: { draggable: true },
    slideToClickedSlide: false,
    touchRatio: 0.2,
    centeredSlides: true,

  };
  public imageUrlBase = environment.baseUrl.apiCommonUrl + ApiStorageConstant.compressedImageUrl;
  currentImg: any;
  public shopInfoChanged: Subject<any> = new Subject<any>();
  public productInfoChanged: Subject<any> = new Subject<any>();
  categoryProduct: any;
  linkCatalogs: any;
  constructor(
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private productFacadeService: ProductFacadeService,
    private shopFacadeService: ShopFacadeService,
    private cartService: CartService,
    private router: Router,
    private categoryProductFacadeService: CategoryProductFacadeService,
    public spinnerLoader: NgxSpinnerService,
    public imageUrlPipe: ImageUrlPipe,
    private dialogService: DialogService,
    private customerFacadeService: CustomerFacadeService,
    private notifyMessageService: NotifyMessageService,
    public seoUrlPipe: SeoUrlPipe,
    public utilsService: UtilsService,
    private storeService: StorageService,
    private authService: AuthService,
    private linkCatalogsService: LinkCatalogsService,
    private _sanitizer: DomSanitizer,
  ) {
    this.userId = this.storeService.get("id");
    this.galleryOptions = [
      { image: false },
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: NgxGalleryImageSize.Contain,
        thumbnailSize: NgxGalleryImageSize.Cover
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.galleryTabOptions = [
      {
        width: '600px',
        height: '400px',
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: NgxGalleryImageSize.Contain,
        thumbnails: false
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        thumbnails: false
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
        thumbnails: false
      }
    ];
  }
  currentDate = new Date();
  isFollowShopPrevious: Boolean;
  isFollowProductPrevious: Boolean;
  mobileStatus = false;
  public ngOnInit() {
    if (window.innerWidth < 500) {
      this.mobileStatus = true;
    } else {
      this.mobileStatus = false;
    }
    this.urlCurrent = window.location.origin + this.router.url;
    this.activatedRoute.params.subscribe(async (param) => {
      this.listProduct = [];
      this.productId = this.utilsService.getIdBySeoUrl(param['productId']);
      let lang = this.translate.currentLang;
      this.linkCatalogsService.getCategoryStandardListView(lang).subscribe(rs => {
        this.linkCatalogs = rs.data;
        this.getProductAndShopInfo();
      })
      this.upDateCountView();
      this.getProductProcess();
      this.getProductFactoryList();
      this.getProductMaterialAreaList();
      this.checkFollowProduct();
      this.productQuantityChanged.subscribe(item => {
        item.price = this.getGetPriceProduct(item.quantity ? item.quantity : 1, item.product_quantification_index, item);
      })
    })

    this.shopInfoChanged.pipe(
      debounceTime(500))// wait 500ms after the last event before emitting last event)
      .subscribe((shopInfo) => {
        if (this.isFollowShop && this.isFollowShopPrevious == false) {
          this.customerFacadeService.getCustomerUserService().customerFollowShop({ shop_id: this.shopID }).subscribe(res => {
            this.isFollowShopPrevious = true;
          });
        } else {
          if (!this.isFollowShop && this.isFollowShopPrevious == true) {
            this.customerFacadeService.getCustomerUserService().customerUnfollowShop({ shop_id: this.shopID }).subscribe(res => {
              this.isFollowShopPrevious = false;
            });
          }
        }
      });

    this.productInfoChanged.pipe(
      debounceTime(500))// wait 500ms after the last event before emitting last event)
      .subscribe((productInfo) => {
        if (this.isFollowProduct && this.isFollowProductPrevious == false) {
          this.customerFacadeService.getCustomerUserService().customerFollowProduct({
            shop_id: this.shopID,
            product_id: this.productId,
          }).subscribe(res => {
            this.isFollowProductPrevious = true;
          });
        } else {
          if (!this.isFollowProduct && this.isFollowProductPrevious == true) {
            this.customerFacadeService.getCustomerUserService().customerUnfollowProduct({ product_id: this.productId }).subscribe(res => {
              this.isFollowProductPrevious = false;
            });
          }
        }
      });
    let swiper = new Swiper('.swiper', {
      // ...
    });
    swiper.on('slideChange', function () {
      console.log('slide changed');
    });
  }
  afterChange(e: any) {
    this.currentImg = this.galleryImages[e.currentSlide]?.small;
  }
  public upDateCountView() {
    this.productFacadeService.getProductService().updateCountView({ product_id: this.productId }).subscribe();
  }

  categoryShop: string;
  category_standard_code_smartmall: string = 'SMARTMALL';
  category_standard_code_truyxuat: string = 'TRUYXUAT';
  // @ts-ignore
  public getShopService(product) {
    this.categoryShop = '';
    this.shopID = product.data.product.shop_id;
    this.productInfo = product.data.product;
    this.productInfo.url_live_video && (this.productInfo.url_live_video = this._sanitizer.bypassSecurityTrustResourceUrl(this.productInfo.url_live_video))
    this.productPriceByQuantity = product.data.productpricebyquantity;
    this.productPriceRange = product.data.productpricerange;
    this.productQuantification = product.data.productquantification;

    this.productShippingInformations = product.data.productshippinginformations
    this.productStandard = product.data.productstandard;
    //#region sắp xếp lại vị trí ảnh cần ưu tiên
    this.productStandard.map(obj => {
      obj.category_standard_code = this.linkCatalogs.find((ele: any) => ele.id == obj.category_standard_id).code;
    });
    let
      toIndex = 0,
      findSmartmall = this.productStandard.some(obj => obj.category_standard_code == this.category_standard_code_smartmall),
      findTruyXuat = this.productStandard.some(obj => obj.category_standard_code == this.category_standard_code_truyxuat);

    if (findSmartmall && findTruyXuat) {
      let
        indexStandard = this.productStandard.findIndex(obj => obj.category_standard_code == this.category_standard_code_smartmall),
        element = this.productStandard.splice(indexStandard, 1)[0];
      this.productStandard.splice(toIndex, 0, element);
    }
    else {
      let
        indexStandard = this.productStandard.findIndex(obj => obj.category_standard_code == this.category_standard_code_smartmall || obj.category_standard_code == this.category_standard_code_truyxuat),
        element = this.productStandard.splice(indexStandard, 1)[0];
      this.productStandard.splice(toIndex, 0, element);
    }
    //#endregion
    this.productStandard.forEach(obj => {
      if (obj?.category_standard_name) {
        obj.category_standard_quality = "Tiêu chuẩn" + obj.category_standard_name.replace("Sản phẩm", '');
      }
    })
    this.provinceOfSales = product.data.provinceofsales
    this.isProducNomal = this.productInfo.type === ProductTypeConstant.Thuong;
    this.processImage();
    if (this.productInfo.is_lock_order) {
      this.notifyMessageService.warning("Sản phẩm đang tạm dừng bán")
    }
    return forkJoin([
      this.shopFacadeService.getShopService().get({ id: this.shopID }),
      this.checkFollowShop(),
      this.getListProduct(),
      this.getListProductBestSaler(),
      this.getProductCertificate(),
      this.getProductSeedMaterial(),
      this.getProductMaterial(),
      this.getProductTechnicalProcess(),
      this.ProductRelatedCustomerSearch()
    ],
      (shopInfo: any,
        followShopInfo: any,
        listShopProduct: any,
        listProductBestSaler: any,
        productCertificate: any,
        productSeedMeterial: any,
        productMeterial: any,
        productTechnical: any,
        productRelative: any
      ) => {
        return {
          shopInfo: shopInfo,
          followShopInfo: followShopInfo,
          listShopProduct: listShopProduct,
          listProductBestSaler: listProductBestSaler,
          productCertificate: productCertificate,
          productSeedMeterial: productSeedMeterial,
          productMeterial: productMeterial,
          productTechnical: productTechnical,
          productRelative: productRelative
        };
      }
    )
  }

  public ProductRelatedCustomerSearch() {
    return this.productFacadeService.getProductService().ProductRelatedCustomerSearch({
      "product_id": this.productInfo.id,
      "keyword": "",
      "shop_id": 0,
      "page_number": 1,
      "page_size": 12,
      "list_category_product_id": [
        this.productInfo.category_product_id || 0
      ],
      "category_area_id": []
    })

  }

  public processImage() {
    this.productInfo.files?.forEach(img => {
      this.galleryImages.push({
        small: this.imageUrlPipe.transform(img?.path),
        medium: this.imageUrlPipe.transform(img?.path),
        big: this.imageUrlPipe.transform(img?.path)
      })
    });
    this.currentImg = this.galleryImages[0]?.small
  }

  public processImageMaterialFactoryArea() {
    if (this.productMaterialArea && this.productMaterialArea.length > 0) {
      this.productMaterialArea.forEach((item: any) => {
        item.listimage = [];
        item.file.forEach((file: FileModel) => {
          item.listimage.push({
            small: this.imageUrlPipe.transform(file?.path),
            medium: this.imageUrlPipe.transform(file?.path),
            big: this.imageUrlPipe.transform(file?.path)
          })
        })
      })
    }
    if (this.productFactory && this.productFactory.length > 0) {
      this.productFactory.forEach((item: any) => {
        item.listimage = [];
        item.file.forEach((file: FileModel) => {
          item.listimage.push({
            small: this.imageUrlPipe.transform(file?.path),
            medium: this.imageUrlPipe.transform(file?.path),
            big: this.imageUrlPipe.transform(file?.path)
          })
        })
      })
    }
  }

  public getProductAndShopInfo() {
    this.productFacadeService.getProductService().getProduct({ id: this.productId }).pipe((
      mergeMap((product: any) => {
        return this.getShopService(product)
      }))).subscribe((res: any) => {
        this.shopInfo = res.shopInfo.data;
        this.isFollowShop = res.followShopInfo.data;
        this.isFollowShopPrevious = this.isFollowShop
        this.isShopNomal = this.shopInfo.type === ShopTypeConstant.Thuong;

        this.productStandard.forEach(obj => {
          if (obj?.category_standard_code) {
            if (obj.category_standard_code == this.category_standard_code_smartmall) {
              this.categoryShop = 'smartmall'
            }
            if (obj.category_standard_code == this.category_standard_code_truyxuat) {
              this.categoryShop = 'truyxuat'
            }
          }
        })

        this.listProductBestSaler = res.listProductBestSaler.data.lists;
        this.productCertificate = res.productCertificate.data.lists;

        this.productCertificate.forEach((item: any) => {
          item.listImage = [];
          item.files.forEach((file: FileModel) => {
            item.listImage.push({
              small: this.imageUrlPipe.transform(file?.path),
              medium: this.imageUrlPipe.transform(file?.path),
              big: this.imageUrlPipe.transform(file?.path)
            })
          })
        })

        this.productSeedMeterial = res.productSeedMeterial.data;
        this.productMeterial = res.productMeterial.data;
        this.productTechnicalProcess = res.productTechnical.data.lists;
        this.processListShopProduct(res.productRelative);
        this.processData();
        this.processImageMaterialFactoryArea();
      });
  }

  // @ts-ignore
  public processListShopProduct(res) {
    this.totalItems = res.data.totalcount;
    const temp = res.data.lists;
    if (temp) {
      temp.forEach((item: any) => {
        this.listProduct.push(item);
      })
    } else {
      this.listProduct = [];
    }
  }

  // @ts-ignore
  public processData() {
    this.listProductOrderModel = [];
    this.productQuantification.forEach(item => {
      const itemProductOder: ItemCart = {
        id: item.id,
        product_quantification_index: item.index,
        product_quantification: item.quantitative,
        product_id: item.product_id,
        product_quantification_id: item.id,
        product_quantification_name: item.quantitative + item.category_unit_name + "/" + item.category_packing_name,
        quantity: 0,
        price: this.getGetPriceProduct(1, item.index),
        quantity_stock: item.quantity_stock,
        product_avatar: this.productInfo.files && this.productInfo.files.length > 0 ? this.productInfo.files[0]?.path : "",
        product_name: this.productInfo.name,
        shop_id: this.productInfo.shop_id,
        shop_name: this.shopInfo.name,
        shop_avatar: this.shopInfo.avatar ? this.shopInfo.avatar?.path : "",
        category_unit_name: item.category_unit_name,
        category_packing_name: item.category_packing_name,
        weigth: this.getWeigthProduct(item.index),
        min_quantity: this.productPriceByQuantity[0].from_quantity || 1,
      }
      this.listProductOrderModel.push(itemProductOder)

    })
    this.checkProductFlashSale();
  }

  public getGetPriceProduct(quantity: number, quantification_index: number, product?: ItemOderCart) {
    let price: number = 0;
    let breakForEach = false;
    this.productPriceByQuantity.forEach((prodQuantity: any, indexProdQuantity: number) => {
      if (breakForEach) { return; }
      if ((quantity >= prodQuantity.from_quantity && quantity <= prodQuantity.to_quantity) || (quantity >= prodQuantity.from_quantity && prodQuantity.to_quantity === 0)) {
        prodQuantity.productPriceRangeQuantities.forEach((quantification: ProductPriceRangeQuantities) => {
          if (quantification_index == quantification.index_quantitative) {
            price = quantification.price;
            product && (product.index_quantitative = quantification.index_quantitative)
            breakForEach = true;
          }
        })
      } else {
        if (indexProdQuantity == this.productPriceByQuantity.length - 1 && quantity > prodQuantity.from_quantity) {
          prodQuantity.productPriceRangeQuantities.forEach((quantification: ProductPriceRangeQuantities) => {
            if (quantification_index == quantification.index_quantitative) {
              price = quantification.price;
              product && (product.index_quantitative = quantification.index_quantitative)
            }
          })
        }else{
          prodQuantity.productPriceRangeQuantities.forEach((quantification: ProductPriceRangeQuantities) => {
            if (quantification_index == quantification.index_quantitative) {
              product && (product.index_quantitative = quantification.index_quantitative)
            }
          })
        }
      }
    })
    return price;
  }

  public getWeigthProduct(quantification_index: number) {
    let weigth = 0;
    const prodWeigth = this.productShippingInformations.find(x => x.index_quantitative === quantification_index);
    // @ts-ignore
    weigth = prodWeigth?.weight;
    return weigth;
  }

  addToCart() {
    const listAddToCart: ItemCart[] = this.listProductOrderModel.filter(item => item.quantity >= 1);
    if (listAddToCart.length > 0) {
      listAddToCart.forEach(item => {
        item.saleInfo = this.productFlashSale;
        item.category_product_id = this.productInfo.category_product_id;
      })
    }
    this.cartService.addToCart(listAddToCart, undefined, this.productPriceByQuantity);
  }

  buyNow() {
    const listAddToCart: ItemCart[] = this.listProductOrderModel.filter(item => item.quantity >= 1);
    listAddToCart.forEach(item => {
      item.selected = true;
      item.category_product_id = this.productInfo.category_product_id;
    });
    this.cartService.addToCart(listAddToCart, true, this.productPriceByQuantity);
  }

  minusProduct(item: ItemCart) {
    if (item.quantity === 0) {
      return;
    }
    item.quantity--;
    this.productQuantityChanged.next(item);
  }

  addProduct(item: ItemCart) {
    if (item.quantity === item.quantity_stock) {
      return;
    }
    item.quantity++;
    this.productQuantityChanged.next(item);
  }

  public routeToShop() {
    this.router.navigate([`${RouterConstants.shops}/${this.shopInfo.id}`]);
  }

  followShop() {
    if (this.userId) {
      this.isFollowShop = !this.isFollowShop;
      if (this.isFollowShop) {
        this.shopInfo.count_follow++
      } else {
        this.shopInfo.count_follow--
      }
      this.shopInfoChanged.next(this.shopInfo)
    }else{
      this.notifyMessageService.warning("Bạn phải đăng nhập để sử dụng chức năng này")
    }
  }

  // @ts-ignore
  changeQuantity(event, item: ItemCart) {
    if (event.target.value) {
      if (!isInteger(event.target.valueAsNumber) || event.target.valueAsNumber < 0) {
        event.target.value = item.quantity
      }
      if (event.target.value > item.quantity_stock) {
        event.target.value = item.quantity_stock
      }
      item.quantity = event.target.valueAsNumber
    } else {
      item.quantity = 0;
    }
    this.productQuantityChanged.next(item);
  }

  public getProductProcess() {
    this.productFacadeService.getProductService().getProductProcess({ product_id: this.productId }).subscribe((res: any) => {
      this.productProcess = res.data;
      if (this.productProcess) {
        this.productProcess = this.productProcess.map(obj => {
          let isActive = new Date(obj.end_date).getTime() >= this.currentDate.getTime();
          if (isActive) {
            return {
              ...obj,
              is_active: true
            }
          } else {
            return {
              ...obj,
              is_active: false
            }
          }
        });
      }
    });

  }

  public getProductCertificate() {
    const param = {
      shop_id: this.shopID,
      keywork: "",
      product_id: this.productId,
      page_number: 0
    }
    return this.productFacadeService.getProductService().getProductCertificate(param)
  }

  public getProductMaterial() {
    return this.productFacadeService.getProductService().getProductMeterial({ shop_id: this.shopID, product_id: this.productId })
  }

  public getProductTechnicalProcess() {
    return this.productFacadeService.getProductService().getProductProcessEngineeringList({ shop_id: this.shopID, product_id: this.productId })

  }

  public getProductSeedMaterial() {
    const param = {
      product_id: this.productId
    }
    return this.productFacadeService.getProductService().getProductSeedMaterialList(param)
  }

  public viewMap(item: FactoryModel | MaterialAreaModel) {
    let dataModel: any = {
      addressIO: false
    };
    if (item && item.map) {
      const latlng = item.map.split(';');
      item.lat = latlng[1];
      item.lng = latlng[0];
      dataModel.coordinate = {
        lng: item.lng,
        lat: item.lat
      }
    } else {
      dataModel.coordinate = undefined
    }
    this.dialogService.openDialogComponent(MapViewComponent, dataModel).then(() => {
    })

  }

  public showMoreProcess() {
    if (this.productProductionLogList.length === this.productProductionLogListOrigin.length) {
      this.productProductionLogList = this.productProductionLogListOrigin.slice(0, 3);
      this.collapse = false
    } else {
      this.productProductionLogList = this.productProductionLogListOrigin;
      this.collapse = true
    }
  }

  processName = "";
  public showHirory(process: ProductProcessModel) {
    this.processName = process.name;
    this.selectedProductProcess = process;
    this.isDetailHistory = false;
  }

  public showDetailHistory(process: ProductProcessModel) {
    this.processName = process.name;
    this.productFacadeService.getProductService().getProductProcessLogList({ product_production_process_id: process.id }).subscribe((res: any) => {
      this.productProductionLogListOrigin = res.data;
      this.productProductionLogList = this.productProductionLogListOrigin.slice(0, 3);
      this.selectedProductProcess = null;
      this.isDetailHistory = true;
    })
  }

  returnFirstImage(list: any) {
    if (list.length - (this.usefulSwiper.swiper.activeIndex + 1) == 0) {
      setTimeout(() => this.usefulSwiper.swiper.slideTo(0))
    }
  }

  @HostListener("touchmove", ["$event"])
  onTouchMove(event: Event) {   
    if (this.swiperdetail.swiper.isEnd) {      
      setTimeout(() => this.swiperdetail.swiper.loopCreate())
    }
    if(this.swiperdetail.swiper.activeIndex>this.galleryImages.length){
      setTimeout(() => this.swiperdetail.swiper.loopDestroy())
    }
  }

  public getListProduct() {
    const param = {
      shop_id: this.shopID,
      list_category_product_id: [],
      category_province_id: [],
      category_area_id: [],
      category_standard_id: [],
      is_smart_mall: SmartMall.isNotSmartMall,
      language_code: this.translate.currentLang,
      page_number: this.pagingConstant.page_number,// this.paging.page,
      page_size: this.pagingConstant.page_size_small,// this.paging.itemsPerPage,
      order: OrderConstans.New,
      from_price: 0,
      to_price: 0,
      shipping_type: [],
      ratio: 0,
      keyword: "",
    }
    return this.categoryProductFacadeService.getCategoryProductService().getCategoryProduct(param)
  }

  public getListProductBestSaler() {
    const param = {
      shop_id: this.shopID,
      list_category_product_id: [],
      category_standard_id: [],
      category_province_id: [],
      category_area_id: [],
      is_smart_mall: SmartMall.isNotSmartMall,
      language_code: this.translate.currentLang,
      page_number: this.pagingConstant.page_number,// this.paging.page,
      page_size: this.pagingConstant.page_size_small,// this.paging.itemsPerPage,
      order: OrderConstans.BestSaler,
      from_price: 0,
      to_price: 0,
      shipping_type: [],
      ratio: 0,
      keyword: ""
    }
    return this.categoryProductFacadeService.getCategoryProductService().getCategoryProduct(param)
  }

  public onScroll() {
    if (this.totalItems > this.pagingConstant.page_number * this.pagingConstant.page_size_small) {
      this.spinnerLoader.show();
      this.pagingConstant.page_number = this.pagingConstant.page_number + 1;
      this.getListProduct().subscribe(res => {
        this.processListShopProduct(res);
      });
      this.spinnerLoader.hide();
    }
  }

  public getProductFactoryList() {
    this.productFacadeService.getProductService().getProductFactoryList({ prduct_id: this.productId }).subscribe((res: any) => {
      this.productFactory = res.data;
    })
  }

  public getProductMaterialAreaList() {
    this.productFacadeService.getProductService().getProductMaterialAreaList({ product_id: this.productId }).subscribe((res: any) => {
      this.productMaterialArea = res.data;
    })
  }

  // public navigateItem(item: ProductModel) {
  //   const url = this.routerConstant.product;
  //   this.router.navigate([`${url}/${item.product_id}`]);
  // }
  public navigateItem(item: ProductModel) {
    const productUrl = this.seoUrlPipe.transform(item.name, item.product_id);
    window.location.href = `/${productUrl}`;
  }

  activeTab() {
    const listTab = document.querySelectorAll(".tab-items");
    listTab.forEach(element => {
      element.className = element.className.replace("active", "");
      if (element.id && element.id == "tabshopsaddress") {
        element.className = element.className + " active";
      }
    })
    const listTabContent = document.querySelectorAll(".tab-pane");
    listTabContent.forEach(element => {
      element.className = element.className.replace("active", "");
      if (element.id && element.id == "shopsaddress") {
        element.className = element.className + " active";
      }
    })
  }

  public followProduct() {
    if (this.userId) {
      this.isFollowProduct = !this.isFollowProduct;
      if (this.isFollowProduct) {
        this.productInfo.count_like++;
      } else {
        this.productInfo.count_like--;
      }
      this.productInfoChanged.next(this.productInfo)
    } else[
      this.notifyMessageService.warning("Bạn phải đăng nhập để sử dụng chức năng này")
    ]
  }

  public checkFollowShop() {
    if (this.authService.getToken(TokenEnum.ACCESS_TOKEN)) {
      return this.customerFacadeService.getCustomerUserService().customerCheckFollowShop({ shop_id: this.shopID });
    } else {
      return of({ data: false })
    }
  }

  public checkFollowProduct() {
    if (this.authService.getToken(TokenEnum.ACCESS_TOKEN)) {
      this.customerFacadeService.getCustomerUserService().customerCheckFollowProduct({ product_id: this.productId }).subscribe((res: any) => {
        this.isFollowProduct = res.data;
        this.isFollowProductPrevious = this.isFollowProduct;
      });
    } else {
      this.isFollowProduct = false;
      this.isFollowProductPrevious = this.isFollowProduct;
    }
  }

  public checkProductFlashSale() {
    return this.productFacadeService.getProductService().checkProductFlashsale({ id: this.productId }).subscribe((res: any) => {
      this.productFlashSale = res.data;
      if (this.productFlashSale) {
        this.upDateProductSaleInfo();
        this.countdownConfig.leftTime = (new Date(this.productFlashSale.end_time).getTime() - new Date().getTime()) / 1000;
      }
    });
  }

  public upDateProductSaleInfo() {
    this.productInfo.quantity_stock = this.productFlashSale.allow_buy_quantity;
    const prodPriceQuantity = this.productPriceByQuantity.find(x => x.index_price_range == this.productFlashSale.quantiy_index);
    // @ts-ignore
    const productPriceQuantification = prodPriceQuantity.productPriceRangeQuantities.find(x => x.index_quantitative = this.productFlashSale.quantification_index);
    if (this.productFlashSale.sale_price) {
      // @ts-ignore
      productPriceQuantification.base_price = productPriceQuantification.price;
      // @ts-ignore
      productPriceQuantification.price = this.productFlashSale.sale_price;
      this.listProductOrderModel[this.productFlashSale.quantification_index - 1].base_price = this.listProductOrderModel[this.productFlashSale.quantification_index - 1].price;
      this.listProductOrderModel[this.productFlashSale.quantification_index - 1].price = this.productFlashSale.sale_price;
    } else if (this.productFlashSale.percent_discount) {
      // @ts-ignore
      productPriceQuantification.base_price = productPriceQuantification.price;
      // @ts-ignore
      productPriceQuantification.price = productPriceQuantification.price - Number(((productPriceQuantification.price * this.productFlashSale.percent_discount) / 100).toFixed(2));
      this.listProductOrderModel[this.productFlashSale.quantification_index - 1].base_price = this.listProductOrderModel[this.productFlashSale.quantification_index - 1].price;
      // @ts-ignore
      productPriceQuantification.percent_discount = this.productFlashSale.percent_discount;
      this.listProductOrderModel[this.productFlashSale.quantification_index - 1].price = this.listProductOrderModel[this.productFlashSale.quantification_index - 1].price - Number(((this.listProductOrderModel[this.productFlashSale.quantification_index - 1].price * this.productFlashSale.percent_discount) / 100).toFixed(2));
    }
  }

  public handleEvent($event: CountdownEvent) {
    if ($event.action === "done") {
      window.location.reload();
    }
  }

  ngAfterViewInit(): void {
  }
}
