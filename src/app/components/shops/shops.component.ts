import { ShopProductComponent } from './shop-product/shop-product.component';
import {AppComponentBase} from 'src/app/shared/common/app-base-component';
import {Component, Injector, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShopTypeConstant, TokenEnum} from 'src/app/shared/common/app.constants';
import {ShopModel} from './model/shop.model';
import {ShopFacadeService} from './service/shop-facade.service';
import { CustomerFacadeService } from '../customer/service/customer-facade.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImageUrlDetailPipe } from 'src/app/shared/pipes/image-url-detail.pipe';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopsComponent extends AppComponentBase implements OnInit {
  public shopId: number;
  public shopInfo: ShopModel;
  public checkproduct:boolean
  shopType: number;
  public keywordSearch: string = "";
  shopTypeConstant: typeof ShopTypeConstant = ShopTypeConstant;
  public showMap: boolean;
  public isFollowShop = false;
  lengthareAsales:number = 0;
  lengthShopParner: number = 0;

  @ViewChild(ShopProductComponent) childShopProduct:ShopProductComponent;
  public galleryImages: NgxGalleryImage[] = [];
  public safeURL:any= "";
  public shop_intro_url:string ="";
  currentImg: any;
  constructor(
    private injector: Injector,
    private activatedRoute: ActivatedRoute,
    public shopFacadeService: ShopFacadeService,
    private customerFacadeService: CustomerFacadeService,
    private authService: AuthService,
    private _sanitizer: DomSanitizer,
    private imageUrlDetailPipe: ImageUrlDetailPipe
  ) {
    super(injector)
  }

  override ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.shopId = param['shopId'];
      this.getShopInfo();
      this.checkFollowShop();


    })
  }



  public getShopInfo() {
    this.shopFacadeService.getShopService().get({id: this.shopId}).subscribe((res: any) => {
      this.shopInfo = res.data;
      this.shop_intro_url = this.shopInfo?.url_introduce ?? "";
      this.shop_intro_url = this.shop_intro_url.replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/");
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl( this.shop_intro_url);
      this.shopType = res.data.type;
      let img = this.shopInfo.file;
      this.currentImg = this.imageUrlDetailPipe.transform(img);
      
    })
  }

  public chatNow() {

  }
 productCount =false;

  setProductCount($event: any){

    if(!!$event){

      this.productCount = true;
    }
  }

  shopPartnerExist = false;
  checkLength($event: any){

    if(!!$event){
      this.shopPartnerExist = true;
    }
  }
  areasalesoutput(e:any){
    this.lengthareAsales = e;
  }
  shopPartnersOutput(e:any){
    this.lengthShopParner = e;
  }
  areasalesCountExist = false;
  checkareasalesCount($event: any)
  {
    if(!!$event){
      this.areasalesCountExist = true;
    }
  }
  checkmapgoole=false
  checkmapshop($event:any)
  {
    if(!!$event){
      debugger;
      this.checkmapgoole = true;
    }
  }
  followShop() {
    if (this.isFollowShop) {
      this.unfollowShop();
    } else {
      this.customerFacadeService.getCustomerUserService().customerFollowShop({shop_id: this.shopId}).subscribe( res => {
        this.isFollowShop = true;
        this.shopInfo.count_follow++;
      });
    }
  }
  public unfollowShop() {
    this.customerFacadeService.getCustomerUserService().customerUnfollowShop({shop_id: this.shopId}).subscribe( res => {
      this.isFollowShop = false;
      this.shopInfo.count_follow--;
    });
  }

  public checkFollowShop() {
    if (this.authService.getToken(TokenEnum.ACCESS_TOKEN)) {
      this.customerFacadeService.getCustomerUserService().customerCheckFollowShop({shop_id: this.shopId}).subscribe((res: any) => {
        this.isFollowShop = res.data;
      });
    }
  }
  public searchShopProduct() {
  }

  public viewMap() {
    this.showMap = true;
  }

}
