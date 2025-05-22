First, intall npm

```
npm i
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Mind NerdApp (Frontend)

---

## 🚀 Sobre o Projeto

Mind NerdApp é uma aplicação frontend construída com Next.js para gerenciamento e compartilhamento de artigos na área de tecnologia da informação, com funcionalidades sociais como curtidas entre usuários. O projeto visa facilitar o cadastro, listagem, interação e engajamento com conteúdos técnicos em uma plataforma moderna, responsiva e escalável.

---

## 🛠 Tecnologias Utilizadas

### Frameworks e Bibliotecas

- **Next.js 13**  
  Framework React com suporte a rotas, SSR, e ótimas práticas para performance.

- **React 18**  
  Base para construção de UI reativa e moderna.

- **TypeScript**  
  Tipagem estática para aumentar segurança e qualidade do código.

- **Tailwind CSS** + **@tailwindcss/line-clamp** + **tailwindcss-animate**  
  Framework CSS utilitário para estilização rápida, responsiva e elegante.

- **Radix UI**  
  Componentes acessíveis e não estilizados para modais, dropdowns, avatars, labels e mais.

- **React Icons**  
  Biblioteca para uso de ícones SVG, como o `FaHeart` para likes.

- **Axios**  
  Cliente HTTP para chamadas à API backend para operações CRUD e autenticação.

- **JWT Decode**  
  Para decodificar tokens JWT e manter o estado do usuário.

- **React Resizable Panels**  
  Para layouts flexíveis e painéis redimensionáveis.

- **TanStack React Table**  
  Para exibir tabelas dinâmicas e configuráveis (se houver listagens complexas).

---

## ⚙️ Funcionalidades Principais

- **Cadastro e listagem de artigos**  
  Com título, conteúdo, autor, imagem e datas de criação e edição.

- **Interação social**  
  Likes e deslikes em artigos com atualização instantânea na UI.

- **Autenticação e controle de sessão**  
  Via contexto React e tokens JWT.

- **Uploads de imagens**  
  Integração com AWS S3 (via backend) para armazenar fotos de artigos e autores.

- **Design responsivo e acessível**  
  Uso de Tailwind e Radix UI para garantir uma boa experiência em dispositivos móveis e desktops.

- **Navegação fluida**  
  Utilizando o roteamento do Next.js e navegação programática.
