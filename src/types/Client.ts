export interface Client {
  id: number;
  fio: string;
  passport_number: string;
  passport_date: string;
  phone: string;
}

export interface ClientResponse {
  success: boolean;
  data: Client[];
  totalPages: number;
}

export interface SingleClientResponse {
  success: boolean;
  data: Client;
}

export interface ClientSelect {
  id: number;
  fio: string;
}