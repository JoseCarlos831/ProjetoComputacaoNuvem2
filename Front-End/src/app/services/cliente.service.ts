import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:4400/api/clientes'; 

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createCliente(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateCliente(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteCliente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
