import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css'],
})
export class RedefinirSenhaComponent implements OnInit {
  redefinirSenhaForm!: FormGroup;
  error: string | null = null;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Criação do formulário com validação
    this.redefinirSenhaForm = this.fb.group({
      codigo: ['', Validators.required],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.route.queryParams.subscribe((params) => {
      console.log('Email recebido:', params['email']);
    });
  }

  onSubmit(): void {
    if (this.redefinirSenhaForm.valid) {
      const { codigo, novaSenha } = this.redefinirSenhaForm.value;

      this.usuarioService.redefinirSenha({ codigo, novaSenha }).subscribe(
        (res) => {
          console.log('Senha redefinida com sucesso:', res);
          this.message = 'Senha redefinida com sucesso! Você será redirecionado para o login.';

          // Redirecionar após 3 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        (err) => {
          console.error('Erro ao redefinir senha:', err);
          this.error = 'Erro ao redefinir senha. Tente novamente.';
        }
      );
    }
  }
}
