import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private apiUrl = 'http://localhost:4400/api/estoque';

  constructor(private http: HttpClient) {}

  getEstoque(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getProdutos(): Observable<any> {
    return this.http.get('http://localhost:4400/api/produtos');
  }

  registrarEntrada(produto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/entrada`, produto);
  }

  registrarSaida(produtoId: number, quantidade: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/saida`, { produtoIdProduto: produtoId, quantidade });
  }

  atualizarQuantidade(produtoId: number, quantidade: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/atualizar/${produtoId}`, { quantidade });
  }
}
