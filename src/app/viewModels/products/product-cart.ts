import {FileModel, ProductFlashSale} from "../../components/shared/model/product.model";
import {ProductFlashsaleModel} from "../../components/shared/model/product-flashsale.model";

export class ProductItemCart {
  product_id?: number;
  name?: string;
  file?: FileModel;

}

export class ItemCart {
  category_packing_name: string
  category_unit_name: string
  quantity: number;
  cart_id?: number;
  product_id?: number;
  index_quantitative?: number;
  product_quantification: number;
  quantity_stock: number;
  product_quantification_id?: number;
  product_name: string;
  price: number;
  shop_id?: number;
  shop_name?: string
  id: number;
  product_avatar: string;
  product_quantification_index: number
  files?: FileModel;
  shop_avatar: string;
  product_quantification_name: string;
  weigth: number
  selected?: boolean
  base_price?: number
  min_quantity: number
  saleInfo?: ProductFlashSale
  category_product_id?: number
  productpricebyquantity?: any
  is_lock?: boolean
  new_quantity?: number
  sale_quantity?: number
  sale_price?: number
}

export class CartModel {
  id: number;
  code: string
  customer_id: number;
  product_id: number;
  cart_Details: ItemCart[]
}
