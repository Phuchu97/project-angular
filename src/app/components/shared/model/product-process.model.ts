import { FileModel } from "./product.model";

export interface ProductProcessModel {
  id: number
  shop_id: number
  product_id: number
  raw_material_area_id: number
  factory_id: number
  name: string
  code: string
  person_in_charge_id: number
  material: string
  start_date: string
  end_date: string
  estimated_date: string
  estimated_quantity: number
  quantity: number
  standard: string
  note: string
  phone: string
  person_in_charge_name: string
  factory_address: string
  status_id: number
  files: FileModel
  factory_code: string
  raw_material_area_code: string
  is_active: boolean
}

export interface ProductProductLog {
  id: number
  note: string
  processing_date: string
  product_id: number
  product_production_log_id: number
  product_production_log_name: string
  product_production_process_id: number
  quantity: number
  shop_id: number
  type: number
  type_purchase: number
  type_work: string
  unit: string
  unit_transaction: string
  unit_transaction_address: string
  user_processing_id: number
  vehicle_identification: string
  phone: string
  file: FileModel
  user_processing_name: string
  factory_name: string
  path: string
  url_video?: string
  listImage?: any
  paths: string[]
  raw_material_area_name:string
}
