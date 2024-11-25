import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css'],
})
export class EsqueciSenhaComponent implements OnInit {
  esqueciSenhaForm!: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.esqueciSenhaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    });
  }

  onSubmit(): void {
    if (this.esqueciSenhaForm.valid) {
      const { email, telefone } = this.esqueciSenhaForm.value;

      this.usuarioService.esqueciSenha({ email, telefone }).subscribe(
        (res) => {
          console.log('Token enviado com sucesso:', res);

          // Redirecionar para a página de redefinição de senha
          this.router.navigate(['/redefinir-senha'], { queryParams: { email } });
      },
        (err) => {
          console.error('Erro ao enviar token:', err);
          this.error = 'Erro ao enviar o link. Tente novamente.';
        }
      );
    } else {
      this.error = 'Por favor, preencha todos os campos corretamente.';
    }
  }
}
