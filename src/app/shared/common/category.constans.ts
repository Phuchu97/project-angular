export const VoteConstans = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5
}

export const TranformConstans = {
  Nhanh: 0,
  Now: 1,
  HoaToc: 3,
  Gttk: 2,
}

export const ShipingMethod = {
  Now: 1,
  Gttk: 2
}

export const ShipingMethodName = {
  [ShipingMethod.Now]: "Vận chuyển siêu tốc",
  [ShipingMethod.Gttk]: "Vận chuyển nhanh"
}

export const ShippingCompany = {
  [TranformConstans.Gttk]: "Vận chuyển nhanh",
  [TranformConstans.Now]: "Vận chuyển siêu tốc",
}
// Shipping company : 1:Vận chuyển nhanh, 2 grap
// Shiping method: 1: ship thường, 2 ship hoả tốc
// Payment method: 1= cod

export const OrderConstans = {
  New: 1,
  MostView: 2,
  PriceAsc: 4,
  PriceDesc: 3,
  BestSaler: 5,
}
