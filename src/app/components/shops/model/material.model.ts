import {FileModel} from "../../shared/model/product.model";

export interface MaterialModel {
  code: string
  file: FileModel
  id: number
  name: string
  note: string
  product_id: number
  shop_id: number
  supplier: string
  supplier_address: string
  supplier_user: string
}
