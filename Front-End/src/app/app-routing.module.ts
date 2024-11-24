import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/clientes/clientes.component';
import { HomeComponent } from './components/home/home.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { FinancasComponent } from './components/financas/financas.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'clientes', component: ClienteComponent,canActivate: [AuthGuard]},
  { path: 'produtos', component: ProdutoComponent,canActivate: [AuthGuard] },
  { path: 'financas', component: FinancasComponent,canActivate: [AuthGuard] },
  { path: 'estoque', component: EstoqueComponent,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'esqueci-senha', component: EsqueciSenhaComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
