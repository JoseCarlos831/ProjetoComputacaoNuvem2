Projeto Integrado - Sistema de Gestão Barbini
<!-- Substitua pelo link do logo, caso queira adicionar -->

📜 Descrição do Projeto
O Sistema de Gestão Barbini é uma aplicação completa desenvolvida para auxiliar na gestão de uma construtora fictícia, Barbini Construções, oferecendo recursos para controle de estoque, cadastro de clientes, gestão financeira, autenticação de usuários e redefinição de senhas. O projeto foi desenvolvido como parte de um trabalho acadêmico para consolidar os conceitos de desenvolvimento full-stack.

📂 Estrutura do Projeto
O projeto é dividido em duas partes principais:

Back-End: API desenvolvida em Node.js com o framework Express e Sequelize ORM para conexão com o banco de dados MySQL.
Front-End: Aplicação Angular com design responsivo, utilizando Reactive Forms para validações e autenticação.
🛠️ Tecnologias Utilizadas
Back-End:
Node.js: Ambiente de execução JavaScript.
Express: Framework para criação da API.
Sequelize: ORM para comunicação com o banco de dados.
MySQL: Banco de dados relacional.
JWT (JSON Web Token): Autenticação e autorização.
Bcrypt: Hashing de senhas para maior segurança.
Twilio: Integração para redefinição de senha via SMS.
Front-End:
Angular: Framework para desenvolvimento front-end.
Reactive Forms: Para validações e gerenciamento de formulários.
Bootstrap: Para estilização responsiva.
HTTPClient: Comunicação com a API.
📋 Funcionalidades
Back-End:
Autenticação:
Cadastro de novos usuários.
Login com validação de credenciais.
Redefinição de senha com envio de token via SMS.
Gestão de Estoque:
Listagem de produtos em estoque.
Registro de entrada e saída de produtos.
Atualização de quantidades.
Gestão de Clientes:
Cadastro e listagem de clientes.
Gestão Financeira:
Registro de vendas.
Histórico financeiro.
Front-End:
Tela de Login e Cadastro:
Formulários validados em tempo real.
Dashboard:
Navegação entre os módulos de estoque, clientes e finanças.
Gestão de Estoque:
Adição e atualização de produtos.
Gestão de Clientes:
Cadastro e listagem de clientes.
Gestão Financeira:
Registro de vendas e visualização de histórico.
🚀 Como Rodar o Projeto
Pré-requisitos:
Node.js e npm instalados.
Banco de dados MySQL configurado.
Angular CLI instalado globalmente.
Back-End:
Acesse o diretório do back-end:
bash
Copiar código
cd Back-End
Instale as dependências:
bash
Copiar código
npm install
Configure o arquivo .env:
Crie o arquivo .env na raiz do projeto com as seguintes variáveis:
env
Copiar código
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
TWILIO_SID=sua_twilio_sid
TWILIO_AUTH_TOKEN=seu_auth_token
TWILIO_PHONE_NUMBER=+5511999999999
Execute as migrations:
bash
Copiar código
npx sequelize db:migrate
Inicie o servidor:
bash
Copiar código
npm start
Front-End:
Acesse o diretório do front-end:
bash
Copiar código
cd Front-End
Instale as dependências:
bash
Copiar código
npm install
Inicie o servidor Angular:
bash
Copiar código
ng serve
Acesse no navegador: http://localhost:4200.
📂 Estrutura de Pastas
Back-End:
mathematica
Copiar código
Back-End/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── middlewares/
└── .env
Front-End:
mathematica
Copiar código
Front-End/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── auth.guard.ts
│   │   ├── interceptors/
│   └── assets/
└── angular.json
🌟 Principais Desafios
Configurar autenticação segura utilizando JWT.
Implementar a funcionalidade de redefinição de senha via Twilio.
Criar um front-end intuitivo e responsivo.
Realizar a integração entre o front-end e o back-end.
🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

📝 Licença
Este projeto é desenvolvido apenas para fins educacionais e não possui fins comerciais.

