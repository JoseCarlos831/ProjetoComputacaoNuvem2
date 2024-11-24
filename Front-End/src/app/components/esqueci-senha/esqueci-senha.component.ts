import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css'],
})
export class EsqueciSenhaComponent {
  email: string = '';

  constructor(private usuarioService: UsuarioService) {}

  enviarToken(): void {
    this.usuarioService.esqueciSenha({ email: this.email }).subscribe(
      (res) => {
        console.log('Token enviado:', res);
        alert('Um token de recuperação foi enviado para seu e-mail.');
      },
      (err) => {
        console.error('Erro ao enviar token:', err);
        alert('Erro ao enviar token. Verifique o e-mail informado.');
      }
    );
  }
}
