- Nome do arquivo: README.md
- Data de criação: 20/05/2024
- Autor: Graziele Oliveira
- Matrícula: 01632441
- Descrição:
- Arquivo de instrução para reproduzir o projeto.
- Este script é parte o curso de ADS.

# Projeto Panda

Este é o repositório do projeto Panda, construído com Next.js e Firebase.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (v12 ou superior)
- npm (geralmente vem com o Node.js)
- Firebase CLI (para configurar o Firebase)
- Visual Studio Code (ou qualquer outro editor de código de sua preferência)

## Instalação

1. Clone o repositório para sua máquina local:

```bash
https://github.com/owgrazy/Panda
```

2. Acesse o diretório do projeto:

```bash
cd panda
```

3. Instale o Next.js globalmente (se ainda não tiver instalado):

```bash
npm install next@latest react@latest react-dom@latest
```

4. Instale as dependências do projeto utilizando npm:

```bash
npm install
```

5. Configure o Firebase:

- Se você ainda não tiver uma conta Firebase, [crie uma](https://console.firebase.google.com/).
- Instale a Firebase CLI globalmente, se ainda não tiver feito isso:

```bash
npm install -g firebase-tools
```

## Configuração do Firebase

O projeto já está configurado para se conectar ao banco de dados Firebase. Não é necessário configurar suas próprias credenciais a menos que deseje fazer alterações na configuração do Firebase.

Se você precisar fazer alterações na configuração do Firebase, siga estas etapas:

1. Faça login na [console do Firebase](https://console.firebase.google.com/).
2. Acesse o projeto Panda.
3. Copie as credenciais do Firebase para o arquivo de configuração do projeto, se necessário.

## Rodando o projeto

Após a instalação das dependências e configuração do Firebase, você pode rodar o projeto localmente. Utilize o seguinte comando:

```bash
npm run dev
```

Isso iniciará o servidor de desenvolvimento do Next.js. Você pode acessar o projeto em seu navegador em [http://localhost:3000](http://localhost:3000).

## Utilizando o Visual Studio Code

Se você estiver utilizando o Visual Studio Code como seu editor de código, siga estes passos para iniciar o projeto:

1. Abra o Visual Studio Code.
2. No menu, selecione "File" > "Open Folder" e escolha a pasta do projeto Panda.
3. Para acessar o terminal, pressione `Ctrl + `` ou vá para "Terminal" > "New Terminal" no menu.
4. No terminal, você pode executar os comandos do projeto, como `npm run dev` para iniciar o servidor de desenvolvimento.

## Contribuindo

Sinta-se à vontade para contribuir com o projeto. Se você encontrar problemas ou tiver sugestões de melhorias, por favor, abra uma issue ou envie um pull request.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
