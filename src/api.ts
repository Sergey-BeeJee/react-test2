import axios from 'axios';
import { Cargo, CargoResponse, SingleCargoResponse } from './types/Cargo';
import { Client, ClientResponse, SingleClientResponse, ClientSelect } from './types/Client';

const api = axios.create({
  baseURL: '/',
});

// Функция для получения CSRF-токена из мета-тега
export const getCsrfToken = (): string => {
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (!metaTag) {
    throw new Error('CSRF token meta tag not found');
  }
  const token = metaTag.getAttribute('content');
  if (!token) {
    throw new Error('CSRF token is empty');
  }
  return token;
};

// Интерцептор для добавления CSRF-токена и преобразования данных в FormData
api.interceptors.request.use((config) => {
  const csrf = getCsrfToken();
  const formData = new FormData();

  // Для POST-запросов переносим данные в FormData
  if (config.data && typeof config.data === 'object') {
    for (const [key, value] of Object.entries(config.data)) {
      formData.append(key, String(value));
    }
  }
  formData.append('csrf', csrf);

  config.data = formData;
  delete config.headers['Content-Type']; // Axios установит multipart/form-data

  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getCargoes = async (page: number, pageSize: number, search: string) => {
  const response = await api.post('/root_api.php', {
    action: 'get_cargoes',
    page,
    pageSize,
    search,
  });
  return response.data as CargoResponse;
};

export const createCargo = async (
  data: Omit<Cargo, 'id' | 'customer_fio' | 'customer_passport' | 'customer_passport_date' | 'customer_phone'>
) => {
  const response = await api.post('/root_api.php', { action: 'create_cargo', ...data });
  return response.data as SingleCargoResponse;
};

export const updateCargo = async (
  id: number,
  data: Omit<Cargo, 'id' | 'customer_fio' | 'customer_passport' | 'customer_passport_date' | 'customer_phone'>
) => {
  const response = await api.post('/root_api.php', { action: 'update_cargo', id, ...data });
  return response.data as SingleCargoResponse;
};

export const getClients = async (page: number, pageSize: number, search: string) => {
  const response = await api.post('/root_api.php', {
    action: 'get_clients',
    page,
    pageSize,
    search,
  });
  return response.data as ClientResponse;
};

export const createClient = async (data: Omit<Client, 'id'>) => {
  const response = await api.post('/root_api.php', { action: 'create_client', ...data });
  return response.data as SingleClientResponse;
};

export const updateClient = async (id: number, data: Omit<Client, 'id'>) => {
  const response = await api.post('/root_api.php', { action: 'update_client', id, ...data });
  return response.data as SingleClientResponse;
};

export const getClientsForSelect = async () => {
  const response = await api.post('/root_api.php', {
    action: 'get_clients_for_select',
  });
  return response.data as { success: boolean; data: ClientSelect[] };
};