# ChefKiss — API

API REST para o ChefKiss, aplicação de gerenciamento pessoal de receitas culinárias.

## Tecnologias

- Node.js + Express
- TypeScript
- PostgreSQL + Prisma ORM
- Autenticação via JWT (cookies httpOnly)
- Validação com Zod
- Envio de e-mail via Resend

## Funcionalidades

- Registro e login de usuários
- Recuperação de senha por e-mail
- CRUD completo de receitas (ingredientes, passos e dicas)
- Paginação, busca por nome e filtro por categoria
- Isolamento de dados por usuário

## Rodando localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL (local via Docker, ou um serviço na nuvem)

### Instalação

\`\`\`bash
git clone https://github.com/Elielltn/chefkiss.git
cd chefkiss-backend
npm install
\`\`\`

### Variáveis de ambiente

Crie um arquivo \`.env\` na raiz:

\`\`\`
DATABASE_URL="postgresql://usuario:senha@localhost:5432/chefkiss"
JWT_SECRET="sua-chave-secreta"
RESEND_API_KEY="sua-chave-do-resend"
FRONTEND_URL="http://localhost:5173"
\`\`\`

### Banco de dados

\`\`\`bash
npx prisma migrate deploy
npx prisma generate
\`\`\`

### Rodando o servidor

\`\`\`bash
npm run dev
\`\`\`

O servidor sobe em \`http://localhost:3000\`.

## Estrutura do projeto

\`\`\`
src/
├── controllers/    # Lógica de negócio de cada rota
├── middlewares/    # Autenticação e validações intermediárias
├── routes/         # Definição de endpoints
├── schemas/        # Validação de dados com Zod
├── lib/            # Configurações (Prisma e e-mail)
└── server.ts       # Ponto de entrada da aplicação
prisma/
├── schema.prisma   # Modelagem do banco de dados
└── migrations/     # Histórico de migrations
\`\`\`