import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css'],
})
export class RedefinirSenhaComponent {
  token: string = '';
  novaSenha: string = '';

  constructor(private usuarioService: UsuarioService) {}

  redefinirSenha(): void {
    this.usuarioService.redefinirSenha({ token: this.token, novaSenha: this.novaSenha }).subscribe(
      (res) => {
        console.log('Senha redefinida:', res);
        alert('Senha redefinida com sucesso.');
      },
      (err) => {
        console.error('Erro ao redefinir senha:', err);
        alert('Erro ao redefinir senha. Verifique o token informado.');
      }
    );
  }
}
