import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinancasService {
  private apiUrl = 'http://localhost:4400/api'; // URL base do backend

  constructor(private http: HttpClient) {}

  // Métodos para Vendas
  getVendas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendas`);
  }

  createVenda(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vendas`, data);
  }

  deleteVenda(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vendas/${id}`);
  }

  // Métodos para Itens de Venda
  getItensVenda(): Observable<any> {
    return this.http.get(`${this.apiUrl}/item-venda`);
  }

  createItemVenda(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/item-venda`, data);
  }

  deleteItemVenda(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/item-venda/${id}`);
  }
}
