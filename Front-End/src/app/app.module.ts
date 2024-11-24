import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ClienteComponent } from './components/clientes/clientes.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { FinancasComponent } from './components/financas/financas.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';

// Guards
import { AuthGuard } from './auth.guard';

// Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    ClienteComponent,
    ProdutoComponent,
    EstoqueComponent,
    FinancasComponent,
    EsqueciSenhaComponent,
    RedefinirSenhaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Permite múltiplos interceptors se necessário
    },
  ],
  bootstrap: [AppComponent], // Componente inicial da aplicação
})
export class AppModule {}
