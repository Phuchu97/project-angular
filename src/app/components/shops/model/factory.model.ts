import {FileModel} from "../../shared/model/product.model";

export interface FactoryModel {
  acreage: string
  address: string
  code: string
  id: number
  map: string
  name: string
  shop_id: number
  note: string
  wattage: string
  file: FileModel[]
  listimage?: any;
  lat?: string
  lng?: string
}
