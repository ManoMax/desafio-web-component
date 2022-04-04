# Especificação página criação de usuário

> Importante: leia esta especificação inteira, antes de começar a
> implementá-la. A ideia é que você tenha uma ideia completa do
> que deve construir antes de começar, para facilitar a
> decomposição da tarefa. Veja que aqui está descrito tanto a
> funcionalidade (**o quê** o app deve fazer) como parte do
> _design_ do aplicativo (ou **como** o app deve ser construído).

## Requisitos gerais

1. Os elementos que compõem o formulário devem ser parte de um
   elemento `form` (sugestão: use o atributo `autocomplete="off"`
   para evitar que o browser tente autocompletar os campos.
2. São 3 campos de entradas de dados (use elementos `input`):
   email, username e senha.
3. Cada elemento `input` do formulário deve ser colocado em um
   elemento parágrafo `p`.
4. Abaixo dos 3 parágrafos, coloque um botão para o envio dos
   dados; use o `type="button"` (isso evita que o formulário seja
   automaticamente enviado pelo browser se o botão for clicado,
   permitindo que o código controle o processo).
5. Abaixo do botão de envio coloque uma listagem de mensagens que
   indicarão as condições que os dados ainda não atendem, à
   medida que o usuário digita os dados; você deve usar um
   elemento `ul` como _container_ dessas mensagens e um `li` para
   cada mensagem.
6. Naturalmente, os campos para o username e o email devem ser
   visíveis/legíveis, mas o campo de senha deve esconder a senha
   enquanto ele a digita.
7. À medida que o usuário digita os dados nos inputs, a lógica de
   validação deve ser executada e todas as mensagens cabíveis
   devem ser exibidas.
8. O botão de criação só deve ser habilitado quando os 3 campos
   contiverem algum valor digitado e se esses dados forem
   válidos.
9. Quando o botão de criação for clicado, todos os campos de
   entrada devem ser desabilitados e a função `criar_usuario()`
   deve ser invocada.

## As funções `cria_usuario()` e `post_user()`

1. As funções `cria_usuario()` e `post_usuario()` dividem a lógica
   necessária para concluir o processo de criação do usuário
   junto ao backend.

2. Crie o módulo `rest.js`. Esse módulo servirá como camada de
   serviço e proverá acesso à API REST do servidor. Obviamente,
   como estamos fazendo um _mock_ apenas, nossa implementação
   apenas simulará o acesso. Ela exportará uma única função:
   `post_usuario()` (que deve ser importada pela camada de
   interface com o usuário: a que manipula o DOM e eventos do
   usuário).

3. A função `post_usuario()` é assíncrona e simula um acesso à
   API REST do serviço web.  Por ser apenas um mock, a função a
   ser implementada deve apenas usar um `setTimeout()` com um
   tempo aleatório. Quando o tempo transcorrer a promise deve ser
   aleatoriamente: i) resolvida com uma mensagem de sucesso; ou
   ii) rejeitada com a mensagem `username <USERNAME> já está
   sendo usado`. O dado efetivo a ser _retornado_ pela promessa
   (tanto para o resolve, como para o reject) deve ter duas
   properties: `msg`, contendo a mensagem e `ok`, contendo um
   boolean indicando se a criação teve sucesso ou não).

4. A função `cria_usuario()` é a contrapartida frontend do
   processo e deve ser invocada quando o usuário clicar no botão
   do formulário (não esqueça de importar a função do módulo de
   interface). A função deve "montar" o objeto com as credenciais
   a partir dos dados nos inputs e deve invocar a função
   `post_usuario()`. Naturalmente, também é ela que deve tratar o
   resultado retornado. Se o resultado for positivo (o usuário
   foi criado), a função deve trocar o conteúdo do `form` para um
   único parágrafo contendo o texto `"Usuário criado com
   sucesso"`, finalizando todo o processo. Se o resultado for
   negativo, a mensagem de erro recebida do backend deve ser
   publicada para o usuário no mesmo espaço de mensagens usado
   para a validação dos campos; além disso, os campos do
   formulário devem ser novamente habilitados para que o usuário
   possa corrigir o que for necessário.

## Instrumentação para facilitar o teste manual

1. Crie também um módulo que facilitará o teste manual e a
   demonstração de funcionamento do mock. O módulo deve ser
   nomeado `cheat.js` e não deve exportar nada. Ele deve apenas
   "instrumentar" o DOM para facilitar o teste manual da
   interface. Para importar um módulo dessa natureza (que não
   exporta nada), basta usar `import './cheat.js` no código do
   módulo principal ou até mesmo usar um elemento `<script>`
   adicional no html.

2. O módulo `cheat` deve apenas definir a função `cheat()` que
   preenche automaticamente (substitui os valores) os campos da
   interface, quando o campo de email for igual a `==`. A função
   deve _popular_ os campos com dados que devem ser válidos de
   acordo com os critérios definidos: por exemplo, o email pode
   ser `username@company.com`, o username pode ser `username` e a
   senha pode ser `aa1!...`. Mas é **importante**: a função deve
   fazer essas mudanças somente se o valor do campo email for
   exatamente igual à string `==`.  A função não deve afetar em
   absolutamente nada o código real em qualquer outra situação.

## critérios para o email

1. Se o campo estiver vazio, nenhuma mensagem deve ser mostrada.
2. O email deve ser válido de acordo com o padrão implementado
   pelos browsers. Para isso, use um `input` de tipo `email` e
   verifique se o `value` é válido, consultando a _property_
   `$input.validity.valid` (é um objeto da classe ValidityState,
   caso queira consultar a API).
3. Se o email não for válido, a mensagem `email inválido` deve ser exibida.

## critérios para o username

1. Se o campo estiver vazio, nenhuma mensagem deve ser mostrada.
2. Para validar o username, use as expressões regulares nativas de
   JavaScript (caso precise, consulte a página de [expressões
   regulares no MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
3. Se o username contiver qualquer caractere diferente de letras
   e dígitos, a mensagem `username deve ter só letras e
   dígitos` deve ser exibida.
4. Se o username tiver mais que 16 caracteres a mensagem 
   `username muito longo` deve ser exibida.
5. Se o username tiver menos que 6 caracteres a mensagem 
   `username muito curto` deve ser exibida.

## critérios para a senha

1. Se o campo estiver vazio, nenhuma mensagem deve ser mostrada.
2. Para validar a senha, use as expressões regulares nativas
   de JavaScript (caso precise, consulte a página de [expressões
   regulares no
   MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
3. Se a senha não tiver letras minúsculas, a mensagem
   `a senha deve conter letras minúsculas` deve ser exibida.
4. Se a senha não tiver letras maiúsculas, a mensagem
   `a senha deve conter letras maiúsculas` deve ser exibida.
5. Se a senha não tiver dígitos, a mensagem `a senha deve
   conter dígitos` deve ser exibida.
6. Se a senha não tiver caracteres diferentes de letras e
   dígitos, a mensagem `a senha deve conter caracteres não
   alfanuméricos` deve ser exibida.
