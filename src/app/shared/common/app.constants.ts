import { environment } from "src/environments/environment";

export enum TokenEnum {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export class StorageOption {
  public static Cookie = 'Cookie';
  public static LocalStorage = 'LocalStorage';
}

export class Constant {
  public static SessionId = 'SessionId';
  public static AppResource = {
    //#region Common
    ACTION_SUCCESS: 'Success!',
    NOT_FIND_DATA: 'No data! Please retry again.',
    ADD_SUCCESS: 'Create successfully!',
    UPDATE_SUCCESS: 'Update successfully!',
    EXCEPTION_UNKNOWN: 'Unknown exception!',
    NOT_FOUND: 'Not found in System!',
    UNAUTHORIZE: 'Unthorize! No right.',
    WARNING_UPDATING: 'Warning! This function is updating.',
    //#endregion
  };

  public static DateFormat = 'DD/MM/YYYY';
}

export class AppStatusCode {
  public static StatusCode200 = 200;
  public static StatusCode201 = 201;
  public static StatusCode400 = 400;
  public static StatusCode401 = 401;
  public static StatusCode422 = 422;
  public static StatusCode500 = 500;
}

export class PagingConstant{
  public static page_number=1;
  public static page_size=20;
  public static page_size_sugget_home=18;
  public static page_size_small = 5;
}

export class StatusConstant{
  public static Active=1;
  public static DeActive=0;
}

export class CategoryStatus{
  public static Category_Bank = 1;
  public static Category_Certificates = 2;
  public static Category_Language = 3;
  public static Category_Packing = 4;
  public static Category_Product = 5;
  public static Category_Province = 6;
  public static Category_Standard = 7;
  public static Category_District = 8;
  public static Category_Unit = 9;
  public static Category_Ward = 1;
  public static Shop_Product=11;
  public static Category_Area = 12;
  public static Category_Nation = 13;
  public static Category_Link = 13;
  public static RequestShop =5;
}

export class PositionBannerSlide{
  public static LogoTop=1;
  public static SlideTop=2;
  public static SlideSmartMall=3;
  public static SlideTopRightUp=3;
  public static BannerCenterHome=5;
  public static SlideTopRightDown=4;
  public static BannerCenterHomeX2=6;
  public static BannerHome2Left=7;
  public static BannerHome2Right=8;

}

export class ShopTypeConstant{
  public static Smartmall=2;
  public static TruyXuat=1;
  public static Thuong=0;
}

export class ProductTypeConstant {
  public static TruyXuat = 1;
  public static Thuong = 0;
}

export class StatusIdConstant {
  public static Active = 0;
  public static Complete = 1;
}
export class PrefixPhone {
  public static PrefixPhone =["086","096","097","098","032","033","034","035","036","037","038","039"
  ,"088","091","094","083","084","085","081","082",
  "089","090","093","070","079","077","076","078","092","056","058","099","059"
];
}
export class SmartMall{
  public static isSmartMall=2;//chỉ sản phẩm smartmall
  public static isNotSmartMall=0;//tất cả
}
