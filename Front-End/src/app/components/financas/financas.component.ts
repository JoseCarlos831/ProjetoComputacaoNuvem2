import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinancasService } from '../../services/financas.service';

@Component({
  selector: 'app-financas',
  templateUrl: './financas.component.html',
  styleUrls: ['./financas.component.css'],
})
export class FinancasComponent implements OnInit {
  vendaForm!: FormGroup;
  vendaError: string | null = null;
  sucessoMensagem: string | null = null;
  historicoVendas: any[] = []; // Histórico de vendas carregado do backend

  constructor(private fb: FormBuilder, private financasService: FinancasService) {}

  ngOnInit(): void {
    // Inicializa o formulário de vendas
    this.vendaForm = this.fb.group({
      clienteId: ['', Validators.required],
      produtoId: ['', Validators.required],
      quantidade: ['', Validators.required],
      valorUnitario: ['', Validators.required],
    });

    // Carrega o histórico de vendas ao inicializar o componente
    this.carregarHistorico();
  }

  carregarHistorico(): void {
    this.historicoVendas = [
      { cliente: { nome: 'Cliente A' }, produto: { nomeProduto: 'Produto A' }, quantidade: 2, valor: 100 },
      { cliente: { nome: 'Cliente B' }, produto: { nomeProduto: 'Produto B' }, quantidade: 1, valor: 50 },
    ];
    
    this.financasService.getVendas().subscribe(
      (vendas) => {
        this.historicoVendas = vendas;
      },
      (err) => {
        console.error('Erro ao carregar histórico de vendas:', err);
      }
    );
  }

  onSubmit(): void {
    if (this.vendaForm.valid) {
      const venda = {
        dataVenda: new Date().toISOString(), // Define a data atual
        clienteIdCliente: this.vendaForm.value.clienteId,
      };

      // Registra a venda
      this.financasService.criarVenda(venda).subscribe(
        (resVenda) => {
          const itemVenda = {
            vendaIdVenda: resVenda.id, // ID da venda retornado pelo backend
            produtoIdProduto: this.vendaForm.value.produtoId,
            quantidade: this.vendaForm.value.quantidade,
            valorUnitario: this.vendaForm.value.valorUnitario,
          };

          // Registra o item da venda
          this.financasService.criarItemVenda(itemVenda).subscribe(
            (resItemVenda) => {
              console.log('Venda e item registrados com sucesso:', resItemVenda);
              this.sucessoMensagem = 'Venda registrada com sucesso!';
              this.vendaForm.reset(); // Limpa o formulário
              this.carregarHistorico(); // Atualiza o histórico
            },
            (err) => {
              console.error('Erro ao registrar item da venda:', err);
              this.vendaError = 'Erro ao registrar o item da venda. Tente novamente.';
            }
          );
        },
        (err) => {
          console.error('Erro ao registrar venda:', err);
          this.vendaError = 'Erro ao registrar a venda. Tente novamente.';
        }
      );
    } else {
      this.vendaError = 'Preencha todos os campos corretamente.';
    }
  }
}
