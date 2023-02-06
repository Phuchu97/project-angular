export interface OderPayItemModel {
  id?: number
  order_id?: number
  product_id?: number
  quantity: number
  product_name: string
  price: number
  into_money?: number
  shop_id?: number
  product_quantification_id?: number
  product_quantification_name?: string
  avatar?: string
  product_img?: string,
  category_unit_name: string,
  category_packing_name: string
  selected?: boolean
}

export interface OrderPayModel {
  id?: number
  code?: string
  description?: string
  shop_id: number
  shop_name?: string
  customer_id?: number
  payment_method_id?: number
  payment_status_id?: number
  payment_method_name?: string
  status_id: number
  recipient_name?: string
  recipient_adress?: string
  recipient_phone?: string
  recipient_email?: string
  recipient_lat?: string
  recipient_lng?: string
  pickup_phone?: string
  pickup_adress?: string
  pickup_lat?: string
  pickup_lng?: string
  pick_province?: string,
  pick_district?: string,
  pick_ward?: string,
  pickup_provice_id?: number,
  pickup_dictrics_id?: number,
  pickup_wards_id?: number,


  recipient_province?: string,
  recipient_district?: string,
  ward?: string,

  provice_id?: number
  dictrics_id?: number
  wards_id?: number
  warehouse_cost?: number
  insurance_fees?: number
  product_total_cost: number
  voucher_id?: number
  flashsale_id?: number
  voucher_cost?: number
  flashsale_cost?: number
  total_amount?: number
  is_shop_payed?: true
  shipping_method?: number
  shipping_company?: number
  weight: number
  shipping_cost: number
  estimated_pickup_date?: string
  estimated_delivery_date?: string
  details: OderPayItemModel[],
  shop_voucher_id?: number
  shop_voucher_cost?: number
}

export const OrderStatus = {
  All: 0,
  DonHuy: -1,
  ChuaXacNhan: 1,
  DaXacNhan: 2,
  DaLayHang: 3,
  DaDieuPhoiGiaoHang: 4,
  DaGiaoHang: 5,
  DaDoiSoat: 6,
  KhongLayDuocHang: 7,
  HoanLayHang: 8,
  KhongGiaoDuocHang: 9,
  DelayGiaoHang: 10,
  DaDoiSoatCongNoTraHang: 11,
  DaDieuPhoiLayHang: 12,
  DonHangBoiHoan: 13,
  DangTraHang: 20,
  DaTraHang: 21
}

export const OrderStatusName = {
  [OrderStatus.ChuaXacNhan]: "Chờ duyệt",
  [OrderStatus.DaXacNhan]: "Đã duyệt",
  [OrderStatus.DaDieuPhoiGiaoHang]: "Đang giao hàng",
  [OrderStatus.DaGiaoHang]: "Đã giao",
  [OrderStatus.DonHuy]: "Đơn hủy",
  [OrderStatus.DaTraHang]: "Trả hàng/Hoàn tiền",
}
