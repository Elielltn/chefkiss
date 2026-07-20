# 🍳 ChefKiss API

API REST do **ChefKiss**, uma aplicação para gerenciamento pessoal de receitas culinárias.

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (autenticação via cookies HttpOnly)
- Zod
- Resend

---

## ✨ Funcionalidades

- ✅ Registro de usuários
- ✅ Login autenticado com JWT
- ✅ Recuperação de senha por e-mail
- ✅ CRUD completo de receitas
  - Ingredientes
  - Passos
  - Dicas
- ✅ Busca por nome
- ✅ Filtro por categoria
- ✅ Paginação
- ✅ Isolamento dos dados por usuário

---

# ⚙️ Rodando localmente

## Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL (local via Docker ou serviço em nuvem)

## Instalação

```bash
git clone https://github.com/Elielltn/chefkiss.git
cd chefkiss-backend
npm install
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/chefkiss"
JWT_SECRET="sua-chave-secreta"
RESEND_API_KEY="sua-chave-do-resend"
FRONTEND_URL="http://localhost:5173"
```

---

## Banco de dados

Execute as migrations e gere o cliente do Prisma.

```bash
npx prisma migrate deploy
npx prisma generate
```

---

## Iniciando o servidor

```bash
npm run dev
```

A API estará disponível em:

```
http://localhost:3000
```

---

# 📁 Estrutura do projeto

```text
src/
├── controllers/    # Lógica das rotas
├── middlewares/    # Autenticação e validações
├── routes/         # Endpoints
├── schemas/        # Validações com Zod
├── lib/            # Prisma e Resend
└── server.ts       # Entrada da aplicação

prisma/
├── schema.prisma   # Modelo do banco
└── migrations/     # Histórico das migrations
```