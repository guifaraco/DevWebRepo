# project1

Meu repositório contem acesso à uma API externa [Link da API](https://www.themoviedb.org/).
É necessário criar uma conta, quando logar devem ir nas configurações do perfil, em seguida clicar em API e clicar no botão create e em seguida developer, preencha as informações pedidas e gere a chave, voce precisará do token que será exibido na tela, copie ele e crie um arquivo .env dentro da src do projeto contendo o seguinte código:

Dentro do arquivo .env:
```
VITE_API_TOKEN="seu token aqui"
```
pronto, seu projeto está pronto pra uso.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

