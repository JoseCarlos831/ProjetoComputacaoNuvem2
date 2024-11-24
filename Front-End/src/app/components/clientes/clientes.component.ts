import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClienteComponent implements OnInit {
  clientesForm!: FormGroup;
  clientes: any[] = [];
  clienteError: string | null = null;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {}

  ngOnInit(): void {
    // Inicializa o formulário reactivo
    this.clientesForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      cpf: ['', Validators.required],
    });

    // Carregar clientes ao iniciar o componente
    this.carregarClientes();
  }

  onSubmit(): void {
    if (this.clientesForm.valid) {
      const cliente = this.clientesForm.value; // Obter dados do formulário
      this.clienteService.createCliente(cliente).subscribe(
        (res) => {
          console.log('Cliente cadastrado:', res);
          alert('Cliente cadastrado com sucesso!');
          this.clientes.push(res); // Adicionar o cliente à lista
          this.clientesForm.reset(); // Limpar o formulário
          this.clienteError = null;
        },
        (err) => {
          console.error('Erro ao cadastrar cliente:', err);
          this.clienteError = 'Erro ao cadastrar cliente. Tente novamente.';
        }
      );
    } else {
      this.clienteError = 'Preencha todos os campos corretamente!';
    }
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe(
      (data) => {
        this.clientes = data;
      },
      (err) => {
        console.error('Erro ao carregar clientes:', err);
      }
    );
  }
}
