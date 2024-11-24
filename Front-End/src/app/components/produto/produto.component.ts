import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
})
export class ProdutoComponent implements OnInit {
  produtoForm!: FormGroup;
  produtos: any[] = []; // Lista de produtos
  selectedProduto: any = null; // Produto selecionado para edição
  produtoError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      codigo: [null],
      nomeProduto: ['', Validators.required],
      marca: ['', Validators.required],
      categoria: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0)]],
    });

    this.carregarProdutos();
  }
  onSubmit(): void {
    if (this.produtoForm.valid) {
      const cliente = this.produtoForm.value; // Obter dados do formulário
      this.produtoService.createProduto(cliente).subscribe(
        (res) => {
          console.log('Produto cadastrado:', res);
          alert('Produto cadastrado com sucesso!');
          this.produtos.push(res); // Adicionar o cliente à lista
          this.produtoForm.reset(); // Limpar o formulário
          this.produtoError = null;
        },
        (err) => {
          console.error('Erro ao cadastrar Produto:', err);
          this.produtoError = 'Erro ao cadastrar Produto. Tente novamente.';
        }
      );
    } else {
      this.produtoError = 'Preencha todos os campos corretamente!';
    }
  }


  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (data) => {
        this.produtos = data;
      },
      (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.produtoError = 'Erro ao carregar produtos. Tente novamente.';
      }
    );
  }
}
