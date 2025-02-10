# 🍲 CookApp

Este é o meu segundo projeto de React Native utilizando Expo. O objetivo do CookApp é fornecer uma plataforma onde os usuários possam encontrar e compartilhar receitas de culinária.

## 📚 Bibliotecas Utilizadas

Para desenvolver este projeto, utilizei as seguintes bibliotecas:

- [API de Receitas](https://api-receitas-pi.vercel.app/receitas/todas): Para buscar uma variedade de receitas.
- [React Navigation](https://reactnavigation.org/): Para navegação entre telas.
- [Axios](https://axios-http.com/): Para realizar requisições HTTP.
- [Redux](https://redux.js.org/): Para gerenciamento de estado.
- [Styled Components](https://styled-components.com/): Para estilização dos componentes.

## ✨ Funcionalidades

- **📂 Divisão de Tipos de Receitas**: As receitas são organizadas por categorias, facilitando a navegação.
- **🌟 Visualização Suave dos Cards**: Interface amigável com animações suaves para visualização dos cards de receitas.
- **📝 Descrições Simples das Receitas**: Cada receita possui uma descrição clara e simples, facilitando o entendimento do modo de preparo.

## 📂 Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
/CookApp
   ├── /assets
   ├── /components
   ├── /screens
   ├── /redux
   ├── App.js
   └── README.md
```

- **/assets**: Contém imagens e outros recursos estáticos.
- **/components**: Contém componentes reutilizáveis.
- **/screens**: Contém as telas do aplicativo.
- **/redux**: Contém as configurações e arquivos relacionados ao Redux.
- **App.js**: Arquivo principal do aplicativo.

## 🚀 Como Executar

Para executar o projeto, siga os passos abaixo:

1. Instale as dependências

    ```bash
    npm install
    ```

2. Inicie o aplicativo

    ```bash
    npx expo start
    ```