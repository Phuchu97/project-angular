import {FileModel, Shop_Address} from "../../shared/model/product.model";

export interface ShopModel {
  address?: string
  business?: string
  code?: string,
  name?:string,
  company_name?: string
  count_are_follow: number
  count_follow: number
  count_view?: number
  count_product: number
  district_id?: number
  email?: string
  file?: FileModel
  avatar: FileModel
  founding_date?: number
  id?: number
  landline_number?: string
  phone_number?: string
  province_id?: number
  ratio?: number
  surrogate?: string
  taxcode?: string
  type?: number
  ward_id?: number
  website?: string,
  ward_name?: string
  province_name?: string
  district_name?: string
  introduce?:string,
  is_active?:boolean,
  file_introduce?:string,
  url_introduce?:string,
  shop_address:Shop_Address[]
}
