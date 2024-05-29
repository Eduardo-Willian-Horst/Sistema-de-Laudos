# Sistema de Gerenciamento de Laudos Médicos

Este projeto é um sistema de gerenciamento de laudos médicos, desenvolvido com Node.js no backend e React no frontend. O sistema permite a criação e gerenciamento de pacientes e laudos médicos. As doenças precisam ser criadas utilizando o Postman.

## Funcionalidades

- Criação de pacientes
- Criação de laudos médicos
- Gerenciamento de pacientes
- Gerenciamento de laudos médicos

## Tecnologias Utilizadas

- Node.js
- Express
- React
- MySQL
- pgAdmin
- Postman (para criação de doenças)

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js, npm (Node Package Manager), MySQL e pgAdmin instalados na sua máquina.

## Instalação

### Backend

1. Clone o repositório para sua máquina local:

   ```bash
   https://github.com/Eduardo-Willian-Horst/Sistema-de-Laudos.git
   ```

2. Navegue até o diretório do servidor:

   ```bash
   cd Sistema-de-Laudos/server
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure o MySQL:

   - Crie um banco de dados no MySQL para o projeto.
   - Configure as variáveis de ambiente para a conexão com o banco de dados MySQL. Modifique o arquivo `.env` para o backend se comunicar com o Banco de Dados, como no exemplo:

     ```plaintext
     DB_HOST=localhost
     DB_USER=seu-usuario
     DB_PASSWORD=sua-senha
     DB_NAME=nome-do-banco
     ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

### Frontend

1. Navegue até o diretório do cliente:

   ```bash
   cd Sistema-de-Laudos/client
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o aplicativo React:

   ```bash
   npm run dev
   ```

## Uso

1. Acesse o aplicativo no navegador através do endereço:

   ```plaintext
   http://localhost:3000
   ```

2. Utilize a interface para criar e gerenciar pacientes e laudos médicos.

## Criação de Usuario

Para logar no sistema, você deve ter um usuário cadastrado no banco de dados. Siga os passos abaixo para criar um usuário:

1. Abra o Postman e crie uma nova requisição POST.

2. Defina a URL da requisição para o endpoint de criação de doenças:

   ```plaintext
   http://localhost:3001/usuarios/registrar
   ```

3. No corpo da requisição, selecione o formato `JSON` e forneça os dados da doença. Exemplo:

   ```json
   {
     "nome": "Nome do Usuário",
     "username": "Username",
     "email": "example@email.com",
     "password": "12345senha"
   }
   ```

4. Envie a requisição. Se tudo estiver correto, a doença será criada e armazenada no banco de dados.


## Criação de Doenças

A criação de doenças precisa ser feita utilizando o Postman ou outra ferramenta de API. Siga os passos abaixo para criar uma doença:

1. Abra o Postman e crie uma nova requisição POST.

2. Defina a URL da requisição para o endpoint de criação de doenças:

   ```plaintext
   http://localhost:3001/doenca/inserir
   ```

3. No corpo da requisição, selecione o formato `JSON` e forneça os dados da doença. Exemplo:

   ```json
   {
     "descricao": "Nome da Doença"
   }
   ```

4. Envie a requisição. Se tudo estiver correto, a doença será criada e armazenada no banco de dados.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

