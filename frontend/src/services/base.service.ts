import { api } from '../lib/axios';



export class BaseService {
  protected async get<T>(url: string): Promise<T> {
    const response = await api.get(url);
    return response.data;
  }

  protected async post<T>(url: string, data?: any): Promise<T> {
    const response = await api.post(url, data);
    return response.data;
  }

  protected async put<T>(url: string, data?: any): Promise<T> {
    const response = await api.put(url, data);
    return response.data;
  }

  protected async delete<T>(url: string): Promise<T> {
    const response = await api.delete(url);
    return response.data;
  }
}