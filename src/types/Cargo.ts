export interface Cargo {
  id: number;
  brand: string;
  model: string;
  vin: string;
  cost: string;
  route: string;
  customer_id: number;
  customer_fio: string;
  customer_passport: string;
  customer_passport_date: string;
  customer_phone: string;
}

export interface CargoResponse {
  success: boolean;
  data: Cargo[];
  totalPages: number;
}

export interface SingleCargoResponse {
  success: boolean;
  data: Cargo;
}