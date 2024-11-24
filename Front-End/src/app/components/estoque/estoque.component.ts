import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService } from '../../services/estoque.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
})
export class EstoqueComponent implements OnInit {
  estoqueForm!: FormGroup;
  produtos: any[] = [];
  estoqueError: string | null = null;

  constructor(private fb: FormBuilder, private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.estoqueForm = this.fb.group({
      nome: ['', Validators.required],
      marca: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      preco: [0, [Validators.required, Validators.min(0)]],
    });
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.estoqueService.getProdutos().subscribe(
      (data) => {
        this.produtos = data;
      },
      (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.estoqueError = 'Erro ao carregar produtos. Tente novamente.';
      }
    );
  }

  onSubmit(): void {
    if (this.estoqueForm.valid) {
      const novoProduto = this.estoqueForm.value;
      this.estoqueService.registrarEntrada(novoProduto).subscribe(
        (res) => {
          console.log('Produto adicionado com sucesso:', res);
          alert('Produto adicionado com sucesso!');
          this.produtos.push(res); // Atualiza a lista de produtos
          this.estoqueForm.reset({ quantidade: 1, preco: 0 }); // Reseta o formulário com valores padrão
          this.estoqueError = null;
        },
        (err) => {
          console.error('Erro ao adicionar produto:', err);
          this.estoqueError = 'Erro ao adicionar produto. Tente novamente.';
        }
      );
    } else {
      this.estoqueError = 'Preencha todos os campos corretamente!';
    }
  }

  atualizarQuantidade(produtoId: number, novaQuantidade: number): void {
    if (novaQuantidade < 0) {
      this.estoqueError = 'A quantidade não pode ser negativa!';
      return;
    }

    this.estoqueService.atualizarQuantidade(produtoId, novaQuantidade).subscribe(
      (res) => {
        console.log('Quantidade atualizada com sucesso:', res);
        alert('Quantidade atualizada com sucesso!');
        this.carregarProdutos();
        this.estoqueError = null;
      },
      (err) => {
        console.error('Erro ao atualizar quantidade:', err);
        this.estoqueError = 'Erro ao atualizar quantidade. Tente novamente.';
      }
    );
  }
}
