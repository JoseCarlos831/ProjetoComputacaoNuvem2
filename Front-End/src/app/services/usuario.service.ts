import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:4400/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateUsuario(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  createUsuario(data: any): Observable<any> {
    console.log('Enviando para a API:', this.apiUrl + '/usuarios');
    return this.http.post('http://localhost:4400/api/register', data);
  }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:4400/api/login', data);
  }

  esqueciSenha(data: any): Observable<any> {
    return this.http.post('http://localhost:4400/api/esqueci-senha', data);
  }

  redefinirSenha(data: { codigo: string; novaSenha: string }): Observable<any> {
    return this.http.post('http://localhost:4400/api/redefinir-senha', data);
  }

}
