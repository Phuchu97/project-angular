import {ItemCart} from "../../../viewModels/products/product-cart";
import {VoucherModel} from "./voucher.model";
import {Shop_Address} from "../../shared/model/product.model";

export interface ItemOderCart extends ItemCart {
  totalPrice?: number,
  selected?: boolean,
}

export interface OrderModel {
  shopId: number,
  products: ItemOderCart[],
  selected: boolean,
  shop_name?: string,
  description?: string,
  total_order_price: number,
  shipping_company?: string,
  shipping_method?: number,
  shipping_cost: number,
  estimated_pickup_date?: string,
  insurance_fee: number,
  shop_voucher?: VoucherModel,
  smartgap_voucher?: VoucherModel,
  shipAddressInfo?: Shop_Address,
  shipInfo: ShipFeeModel,
  listShipInfo: ShipFeeModel[]
  category_product_id?: number,
  estimated_delivery_date?: string,
}


export interface ShipFeeModel {
  fee: number,
  shipping_method: number,
  stt: number,
  shop_id: number,
  name: string,
  pick_up_date: string,
  selected?: boolean,
  address?:  string,
  pick_district?:  string,
  pick_latitude?:  number,
  pick_longitude?:  number,
  pick_province?:  string,
  pick_wards?: string,
  pick_province_id?: number,
  pick_district_id?: number,
  pick_wards_id?: number,
  phone?: string,
  estimated_delivery_date?: string,
  }
