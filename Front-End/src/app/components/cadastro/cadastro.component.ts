import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    if (!this.usuario.email || !this.usuario.senha || !this.usuario.telefone  ) {
      this.cadastroError = 'Preencha todos os campos!';
      return;
    }

    this.usuarioService.createUsuario(this.usuario).subscribe(
      (res) => {
        console.log('Usuário cadastrado com sucesso:', res);
        alert('Usuário cadastrado com sucesso!');
        this.usuario = { email: '', senha: '',telefone:'' };
        this.cadastroError = null;
      },
      (err) => {
        console.error('Erro ao cadastrar usuário:', err);
        this.cadastroError = 'Erro ao cadastrar usuário. Tente novamente.';
      }
    );
  }
}
