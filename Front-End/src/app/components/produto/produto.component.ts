import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe(
      (data) => {
        this.produtos = data;
        console.log(this.produtos);
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  deleteProduto(id: string): void {
    this.produtoService.deleteProduto(id).subscribe(() => {
      console.log('Produto removido');
      this.produtos = this.produtos.filter(produto => produto.id !== id);
    });
  }
}
