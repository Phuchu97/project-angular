import {FileModel} from "../../shared/model/product.model";

export interface MaterialAreaModel {
  acreage: string
  address: string
  code: string
  files: FileModel[]
  id: number
  map: string
  name: string
  shop_id: number
  quantity: string
  note: string
  listimage?: any;
  lat?: string
  lng?: string
}
