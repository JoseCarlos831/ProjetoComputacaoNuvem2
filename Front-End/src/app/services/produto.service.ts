import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'http://localhost:4400/api/produtos';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createProduto(data: any): Observable<any> {
    console.log('Dados enviados para o backend:',data);
    return this.http.post(this.apiUrl, data);
  }


  updateProduto(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteProduto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
