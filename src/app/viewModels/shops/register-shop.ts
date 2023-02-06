export class RegisterShop  {
  code: string;
  username: string;
  password: string;
  email?: string;
  phone_number?: string;
  landline_number: string;
  company_name: string;
  website: string;
  surrogate: string;
  address: string;
  birtday: Date;
  province_id: number;
  district_id: number;
  ward_id: number;
  sex: number;
  is_active: boolean;
  type: number;
  userAdded: number;
}
export class ForgotPasswordShop  {
  username: string;
  password: string;
}
