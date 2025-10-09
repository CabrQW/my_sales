# 🏆 My Sales — API de Gestão Comercial

**My Sales** é uma API RESTful desenvolvida em **Node.js** com **TypeScript** e **TypeORM**, projetada para gerenciar **usuários, clientes, produtos e pedidos**.  
O projeto segue os princípios de **Clean Architecture**, **Injeção de Dependência (Tsyringe)** e **Boas práticas de SOLID**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **Express** — Framework para criação de rotas e middlewares
- **TypeScript** — Tipagem estática e maior segurança no código
- **TypeORM** — ORM para interação com o banco de dados
- **PostgreSQL** — Banco de dados relacional
- **Tsyringe** — Injeção de dependências
- **Redis** — Controle de requisições (Rate Limiter)
- **Jest** — Testes automatizados
- **Multer** — Upload de arquivos
- **JWT (jsonwebtoken)** — Autenticação segura
- **Celebrate/Joi** — Validação de dados
- **Nodemailer** — Envio de e-mails
- **ESLint + Prettier** — Padronização de código

---

## 📁 Estrutura de Pastas

```
src/
│
├── modules/
│   ├── Users/
│   ├── Customers/
│   ├── Products/
│   └── Orders/
│
├── shared/
│   ├── container/          # Injeção de dependência
│   ├── errors/             # Classes de erro personalizadas
│   ├── infra/
│   │   ├── http/           # Servidor Express
│   │   └── typeorm/        # Conexão e migrations
│   └── middlewares/        # Middlewares globais
│
├── config/                 # Configurações (JWT, upload, email, etc)
└── tests/                  # Testes automatizados
```

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18+)
- **PostgreSQL**
- **Redis** ou **Docker Desktop**
- **npm** ou **yarn**

---

## 🧩 Instalação e Configuração

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/codethi/my_sales.git

cd my_sales
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Subir o Redis com Docker

  Se você ainda não tem o Redis rodando, basta executar:
```bash
docker run --name redis-my-sales -p 6379:6379 -d redis:alpine
```
  Ou, se quiser persistência e senha:
```bash
docker run --name redis-my-sales -p 6379:6379 -d \
  -v redis_data:/data \
  redis:alpine redis-server --appendonly yes --requirepass "sua_senha"
```
### 4️⃣ Configure as variáveis de ambiente

Crie um arquivo **.env** na raiz do projeto:

```env
## Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=my_sales

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASS=

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

---

## 🧱 Banco de Dados

### Criar as tabelas
```bash
npm run migration:run
```

### Reverter última migration
```bash
npm run migration:revert
```

### Criar nova migration
```bash
npm run migration:create src/shared/infra/typeorm/migrations/NomeDaMigration
```

---

## 🧠 Scripts Disponíveis

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Inicia o servidor em modo de desenvolvimento |
| `npm run migration:run` | Executa todas as migrations pendentes |
| `npm run migration:revert` | Reverte a última migration executada |
| `npm run test` | Executa todos os testes com Jest |
| `npm run lint` | Analisa o código com ESLint |

---

## 🔐 Rotas Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| **POST** | `/users` | Cria um novo usuário |
| **POST** | `/sessions` | Faz login e gera token JWT |
| **GET** | `/customers` | Lista todos os clientes |
| **POST** | `/customers` | Cadastra um cliente |
| **GET** | `/products` | Lista produtos |
| **POST** | `/orders` | Cria um novo pedido |

---

## 🧪 Testes

Para executar os testes unitários e de integração:

```bash
npm run test
```

Os testes são escritos com **Jest** e cobrem os principais serviços da aplicação.

---

## 🧰 Qualidade do Código

O projeto utiliza **ESLint** e **Prettier** para manter um código limpo e padronizado.

Para verificar o código:
```bash
npm run lint
```

---

## 🧑‍💻 Autor

**Carlos Eduardo da Costa Viana**  
📧 Email: carlosbom64@gmail.com <br>
💼 LinkedIn: www.linkedin.com/in/carlos-eduardo-a971501a5

---

## 📝 Licença

Este projeto é licenciado sob a **MIT License**.
