export interface PaymentModel {
  id: number,
  name: string,
  price: number
}

export const PaymentMethod = {
  COD: 0,
  VNPay: 1,
  VDT: 2
}

export const PaymentMothodName = {
  [PaymentMethod.COD]: "Thanh toán khi nhận hàng",
  [PaymentMethod.VNPay]: "Thanh toán qua VNPay",
  [PaymentMethod.VDT]: "Ví điện tử"
}

export const PaymentStatus = {
  ChuaThanhToan: 0,
  ChoThanhToan: 1,
  ThanhToanLoi: 5,
  DaThanhToanChuaXacNhan: 10,
  DaXacNhan: 20,
  DoiXoat: 30,
  HoanThanh: 50
}

export const PaymentStatusName = {
  [PaymentStatus.ChuaThanhToan]: "Chưa thanh toán",
  [PaymentStatus.ChoThanhToan]: "Chờ thanh toán",
  [PaymentStatus.ThanhToanLoi]: "Thanh toán lỗi",
  [PaymentStatus.DaThanhToanChuaXacNhan]: "Đã thanh toán chưa xác nhận",
  [PaymentStatus.DaXacNhan]: "Đã xác nhận",
  [PaymentStatus.DoiXoat]: "Đối xoát",
  [PaymentStatus.HoanThanh]: "Đã thanh toán",
}
