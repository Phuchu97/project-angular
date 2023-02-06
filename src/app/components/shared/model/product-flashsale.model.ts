export interface ProductFlashsaleModel {
  id:	number
  product_id: number
  product_quantification: number
  flashsale_id: number
  flashsales_time_slot_id: number
  shop_id: number
  base_price: number
  sale_price: number
  allow_buy_quantity: number
  quantification_index: number
  quantiy_index: number
  sold_quantity: number
  sale_quantity: number
  percent_discount: number
  status_id: number
  buy_limit: boolean
  category_standard_id: number
  category_standard_name: string
}
