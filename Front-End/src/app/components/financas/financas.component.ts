import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-financas',
  templateUrl: './financas.component.html',
  styleUrls: ['./financas.component.css'],
})
export class FinancasComponent implements OnInit {
  vendaForm!: FormGroup;
  vendaError: string | null = null;
  historicoVendas: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vendaForm = this.fb.group({
      cliente: ['', Validators.required],
      produto: ['', Validators.required],
      quantidade: ['', Validators.required],
      valor: ['', Validators.required],
    });

    this.carregarHistorico();
  }

  carregarHistorico(): void {
    // Exemplo de carregamento de histórico de vendas:
    this.historicoVendas = [
      { id: 1, cliente: 'Cliente A', produto: 'Produto A', quantidade: 2, valor: 100 },
      { id: 2, cliente: 'Cliente B', produto: 'Produto B', quantidade: 1, valor: 50 },
    ];
  }

  onSubmit(): void {
    if (this.vendaForm.valid) {
      console.log('Venda registrada:', this.vendaForm.value);
      this.vendaError = null;
    } else {
      this.vendaError = 'Preencha todos os campos corretamente.';
    }
  }
}
