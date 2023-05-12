# AgroTech projeto CRUD
## back (express mongoose) e front html, css, js
- Requisitos
    - Node.js: https://nodejs.org/
    - MySQL: https://www.mysql.com/
    - Expo CLI: https://docs.expo.io/get-started/installation/
- Executar
    - Clonar este repositório
    - Abrir com VsCode **code .**
    - Na pasta /back:
        - Criar um arquivo **.env** com o conteúdo a seguir
        ```env
        DATABASE_URL="mysql://root:@localhost:3306/agroNegocio"
        KEY="desenvolvedor"
        ```
    - Abrir o terminal **CTRL + "**
        ```cmd
        cd back
        npm i
        nodemon
        ```
    - Abra a pasta /front
        - Execute o index.html com o Live Server (Extensão do VsCode)
