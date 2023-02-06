import {TranformModel} from "../../category-product/model/tranform.model";

export interface DetailCaculateShip {
  shop_id: number
  shiping_cost: number
  estimated_pickup_date: string
}

export interface ShipModel extends TranformModel {
  shipping_method: number
  shipping_company: string
  list_caculate: DetailCaculateShip[]
}

export interface ShippingMethod extends TranformModel {
  fee: number
  pick_up_date: string
  selected?: boolean
  insurance_fee: number
  shipping_method: number
  estimated_delivery_date?: string
}
