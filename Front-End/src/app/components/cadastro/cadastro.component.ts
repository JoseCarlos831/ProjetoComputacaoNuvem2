import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  usuario = {
    email: '',
    senha: '',
    telefone: '',
  };

  cadastroError: string | null = null; // Para exibir erros, se necessário

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  cadastrar(): void {
    console.log('Dados enviados:', this.usuario);

    // Verifica se todos os campos foram preenchidos
    if (!this.usuario.email || !this.usuario.senha || !this.usuario.telefone) {
      this.cadastroError = 'Preencha todos os campos!';
      return;
    }

    // Chamada ao serviço para criar o usuário
    this.usuarioService.createUsuario(this.usuario).subscribe(
      (res) => {
        console.log('Usuário cadastrado com sucesso:', res);
        alert('Usuário cadastrado com sucesso!');

        // Limpa o formulário
        this.usuario = { email: '', senha: '', telefone: '' };
        this.cadastroError = null;

        // Redireciona para a página de login
        this.router.navigate(['/login']);
      },
      (err) => {
        console.error('Erro ao cadastrar usuário:', err);
        this.cadastroError = 'Erro ao cadastrar usuário. Tente novamente.';
      }
    );
  }
}
