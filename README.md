# My Contact Book
## Sobre o projeto
### Introdução e Requerimentos
O My Contact Book é um projeto simples que eu fiz durante meu aprendizado de Javascript e desenvolvimento web, utiliza os frameworks [webpack](https://webpack.js.org), [ejs](https://ejs.co), [express](https://expressjs.com), mongoose ([mongodb](https://www.mongodb.com/)) e [bootstrap](https://getbootstrap.com). Requer [node.js](https://nodejs.org) >= 16.0.0 instalado. Tem o conceito de ser uma agenda para salvar seus contatos em um banco de dados online, onde é necessário criar uma conta para gerenciar-los. 

### Aviso
Como dito acima, foi um projeto de aprendizagem e testes (Você pode observar que eu peguei os exemplos do site do bootstrap) então peço porfavor que **utilize somente em host local** e **não hospede o projeto publicamente na internet** pois existem diversas vulnerabilidades de segurança que não foram corrigidas.

## Como executar

### Preparação
Antes de iniciar o projeto, crie um cluster mongodb e copie a url de conexão deste.

Clone o projeto para uma pasta especifica do seu computador, ou baixe o zip e realize a extração nessa pasta.

Em seguida utilize o comando `npm install` no terminal para instalar os pacotes.

Após a instalação, utilize `npm run dev` para que o webpack compile o frontend do projeto.
(AVISO: Na versão 17 do nodejs o webpack gera problemas na compilação, use a versão 16 de preferência).

Crie um arquivo .env na matriz do projeto com o seguinte conteudo:

```env
PORT= // Escolha um numero de porta do seu localhost, como por exemplo: 5000
MONGOURL= // Seu url de conexão mongodb
```

### Execução
Após a compilação do projeto, encerre o webpack e rode `npm start`. Espere até que seja exibido no console o sinal de que o express já abriu uma porta no localhost, agora é só entrar em um navegador e inserir o url: `http://127.0.0.101/<portaQueVocêInseriuAcima>`. Se tudo deu certo, você já vai estar vizualizando a agenda!