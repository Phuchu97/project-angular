export interface FileModel {
  id?: number,
  idtable?: number,
  tablename?: string,
  name_guid?: string,
  name?: string,
  ipserver?: string,
  type?: number,
  path: string,
  file_type?: string,
  category_standard_code?: string
  category_standard_id?: number ;
}

export interface ProductModel {
  name: string,
  from_price?: number,
  to_price?: number,
  shop_id: number,
  product_id?: number,
  shipping_type?: number,
  code?: number,
  quantity_sold?: number,
  quantity_stock?: number,
  product_nation_id?: number,
  category_product_id?: number,
  category_product_name?: string,
  category_area_id?: number,
  ratio: number,
  amount?: number,
  count_search?: number,
  count_view?: number,
  count_like: number,
  file?: FileModel
  listCategoryStandard: FileModel[],
  listProvinceOfSales: ProvinceOfSales[],
  id?: number,
  note?: string,
  language_code?: string,
  type?: number,
  status_id?: number,
  certification?: FileModel[],
  video?: FileModel[],
  files?: FileModel[],
  is_lock_order: boolean
  url_live_video?: any,
}

export interface ProductQuantificationModel {
  id: number,
  shop_id: number,
  product_id: number,
  category_unit_id: number,
  index: number,
  quantity_stock: number,
  category_packing_id: number,
  quantitative: number,
  price: number,
  category_packing_name: string
  category_unit_name: string
}

export interface ProductOrderModel {
  name: string,
  product_id: number,
  quantitative_id: number,
  quantitative: number
  quantity: number,
  price: number
  quantity_stock: number
  files: FileModel[]
}

export interface ProductPriceRangeQuantities {
  id: number,
  product_id: number,
  index_quantitative: number,
  price: number,
  product_price_by_quantity_id: number,
  product_sku: number,
  base_price?: number,
  percent_discount?: number
}

export interface ProductQuantity {
  id: number,
  product_id: number,
  index_price_range: number,
  from_quantity: number,
  to_quantity: number,
  productPriceRangeQuantities: ProductPriceRangeQuantities[]
}

export interface ProductStandard {
  product_id: number,
  category_standard_id: number,
  category_standard_code: string,
  order: number,
  path: string,
  id: number,
  category_standard_name: string,
  category_standard_quality?: string,
}

export interface ProvinceOfSales {
  province_id: number,
  province_name: string,
  product_id: number,
  shop_id: number,
  id: number,
  category_standard_code?: string
  category_standard_id?: number
}

export interface ProductShippingInformations {
  id: number,
  product_id: number,
  shop_id: number,
  length: number,
  height: number,
  width: number,
  weight: number,
  index_quantitative: number,
  quantitative: number,
}

export interface Shop_Address {
  phone: string
  province_name: string
  district_name: string
  wards_name: string
  address: string
  default_address: boolean
  warehouse_address: boolean
  headquarters: boolean
  lat: string
  lng: string
}

export interface ProductFlashSale {
  allow_buy_quantity: number
  base_price: number
  end_time: string
  percent_discount: number
  product_id: number
  sale_price: number
  sale_quantity: number
  sold_quantity: number
  start_time: string
  quantification_index: number
  quantiy_index: number
}
