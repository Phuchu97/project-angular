import {FileModel} from "../../shared/model/product.model";

export interface VoucherModel {
  shop_id?: number
  id: number
  name: string
  code: string
  description: string
  reduction_rate: number
  reduction_price: number
  maxium_reduction: number
  limited: boolean
  quantity: number
  min_apply_value: number
  used_quantity: number
  type: number // 0: ship : 1 sản phẩm
  active_date: string
  end_date: string
  avatar: FileModel
  selected?: boolean
  discount: number
  discount_value: number,
  limited_discount?: number,
  valid: boolean,
  disable?: boolean,
  checked: boolean,
}

export const VoucherType = {
  ship: 0,
  price: 1
}
