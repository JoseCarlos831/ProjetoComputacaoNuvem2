import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.usuarioService.login(credentials).subscribe(
        (res: any) => {
          console.log('Login bem-sucedido:', res);

          // Armazena o token no localStorage (se fornecido pelo backend)
          localStorage.setItem('token', res.token);

          // Redireciona para a página de clientes ou qualquer outra rota
          this.router.navigate(['/clientes']);
          this.loginError = null;
        },
        (err) => {
          console.error('Erro no login:', err);
          this.loginError = 'Erro ao realizar login. Verifique suas credenciais.';
        }
      );
    } else {
      this.loginError = 'Preencha os campos corretamente.';
    }
  }
}
