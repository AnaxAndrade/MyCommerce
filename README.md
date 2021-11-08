## Sobre o projeto
O faz parte de um teste para desenvolvedor Fullstack. Objetivo é utilizar os conhecimentos de desenvolvimento para implementar uma e-commerce, obtendo dados de produtos, a partir da APi de fornecedores e disponibilizar os produtos para venda. Deverá ser possível, pesquisar produtos, adicionar itens ao carrinho e simular compras que deverão ficar registadas em um Banco de Dados.
<br/>
**DEMO:** https://my-commerce-chi.vercel.app/

## Funcionalidades
- Carregar dados de APIs diferentes
- Armazenar produtos em um Banco de Dados
- Pesquisar por produtos
- Ver detalhes de um produto
- Cadastro e autenticação de usuário
- Carrinho de Compras
- Simular Compra de Produtos
- Lista de compras do usuário
- Boa boa experiência de usuário com feedbacks visuais (progress e mensagens de feedback)
- Arquitetura para alta performance
- SEO

## Análise & Execução
### Tech Stack ###
- **MongoDB** - Ser schema free ajuda na iteração do modelo de dados ao longo do projeto (principalmente em projetos de prova de conceito, MVP ou um teste como este). Para use case de ecommerce em especial, encaixa muito bem.
- **NodeJS** - Já integrado no NextJS para rápida criação de APIs Backend utilizando a mesma codebase que frontend (para projetos menores funciona é um caminho muito eficiente)
- **NextJS/React** - Criação de UI simmples dinâmica e moderna

### Arquitetura ###
![MyShop Architecture drawio](https://user-images.githubusercontent.com/5482552/140827719-b2f592b4-e9a0-43a6-968d-9b24063ffdf5.png)

### Implementação ###
1. *Criação do modelo de dados*
Criação de um modelo de dados comum para armazenamento e api de comunicação entre backend e frontend.
```json 
    {
        "nome": "",
        "descricao": "",
        "categoria": "",
        "imagem": "http://placeimg.com/640/480/business",
        "preco": "127.00",
        "material": "",
        "departamento": "",
        "id": "1"
    },
```
2. *Criação de módulo repositório para abstrair comunicação com APIs de fornecedores e com o Banco de dados*
Devido ao fato de cada fornecedor possuir uma api direfente foi criada uma camada de abstração que trata de obter os dados de cada api e transformar em uma estrutura comum. Após carregar os dados da API esses dados de produtos são armazenados na base de dados, permitindo a consulta mesmo serviço fornecedor estando indisponível (em cenário real poderia ter de implementar um serviço de sincronização periódica para obter novos produtos ou atualizar as informações dos produtos existentes)

3. *Criação da API para nosso frontend*
As APIs para o frontend são criadas utilizando recurso de criação de APIs backend do NextJS. Essa API serve de ponte entre o frontend e os dados. Incluindo endpoints para autenticação

4. *Criação do Frontend*
Implementação de Frontend com React/NextJS, utilizando a geração estática de páginas dos produtos, para permitir maior performance no carregamento dessas páginas a implementação das demais lógicas descritas na secção [Funcionalidades](#funcionalidades)

5. *Deploy Contínuo*
Hospedagem do código no github e integração para deployment contínuo (no caso utilizado Vercel) para permitir maior agilidade no teste da aplicação em ambiente produtivo

## Como usar

Pode utilizar a aplicação de duas formas:
1. Demo Online
    - Acedendo ao link [App Demo](https://my-commerce-chi.vercel.app/)
2. Execuntando em seu ambiente
    - Instalar Node.js
    - Clonar este projeto
    - Obter uma instância MongoDB, exemplo utilizando Serviço [Mongo Atlas](https://www.mongodb.com/atlas/database)
    - Definir variáveis de ambiente - em ficheiro .env
    ```env
    BASE_URL=
    NEXTAUTH_URL=$BASE_URL
    MONGO_USER=
    MONGO_PASSWORD=
    MONGO_DATABASE=
    MONGO_CONNECTION=
    ```
    - Executar projeto em modo de desenvolvimento
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    - Alternativamente pode efetuar build e depois executar para execução parecida com ambiente final
    ```bash
    npm run build
    # ou
    yarn build
    
    npm run start
    # ou
    yarn start
    
    ```

Abrir [http://localhost:3000](http://localhost:3000) no browser para ver a aplicação em execução
