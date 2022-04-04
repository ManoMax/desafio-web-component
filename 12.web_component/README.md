# CreateUserComponent

Crie um web component `CreateUserComponent` que irá encapsular
parte da funcionalidade do app da atividade anterior e adicionar
algumas características. A ideia é fazer um _componente de
prateleira_ que possa ser usado em outros contextos.

> Você não precisa usar Shadow DOM nesta atividade, dado que
> ainda não vimos o assunto em sala de aula. Na prática, contudo,
> seria, de fato, necessário, para isolar a árvore DOM do
> componente da árvore do aplicativo e evitar que o CSS de um
> contamine o outro de formas indesejadas. Assim, se você quiser,
> pode tentar adiantar a matéria e fazer esta atividade já usando
> o Shadow DOM. Saiba, de qualque forma, que a diferença do JS
> entre usar e não usar é mínima. Contudo, você precisará separar
> o CSS do componente do CSS do aplicativo.

## Especificação funcional

O web component será usado com a tag `create-user`. Para usar o
componente é necessário usar a tag `create-user` e adicionar um
listener para o evento `cria-usuario` que será lançado pelo
componente quando o usuário fornecer dados válidos e pedir a
criação do usuário (especificado abaixo).

## Evento `cria-usuario`

Como o componente não acessa diretamente nenhuma API REST, por
não ter dados suficientes para fazê-lo de forma adequada, o
componente emite o evento `cria-usuario` para permitir que o
aplicativo cliente faça a requisição para o servidor. O evento
deve incluir um objeto `detail` contendo três properties com os
dados digitados pelo usuário: `email`, `username` e `senha`.
Quando o evento é emitido, todos os _inputs_ do formulário são
desabilitados até que um dos métodos `done()` ou `error()` seja
invocado (ver abaixo).

### métodos `done()` e `error()`

Web components devem ser programados para que sua interação se dê
prioritariamente por eventos e _atributos_. Esses dois
mecanismos são a forma original de interação com elementos html.
Na prática, contudo, é comum preferirmos usar _properties_ e
_métodos_ (elementos mais da OO que de HTML). A principal
vantagem é que ambos permitem dados complexos e
não apenas strings, como ocorre com atributos. Por esse motivo, o
componente `create-user` deverá ter dois métodos: `done()` e
`error()` para que sejam invocados depois que os dados coletados
pelo componente sejam enviados para o backend.

Se a gravação dos
dados for feita com sucesso, o método `done(msg)` deve ser invocado
com a mensagem `msg` de sucesso que se deseja que o componente use para
a finalização de seu funcionamento. E se a gravação falhar, o
método `error(msg)` pode ser usado para comunicar ao componente
que a gravação falhou, indicando a mensagem que deve ser exibida
para o usuário.

O método `error()`, além de mostrar a mensagem, libera os campos
do componente para que sejam usados novamente pelo usuário, para
corrigir a situação. Já o método `done()` deve trocar o conteúdo
do `form` pela mensagem final apenas, permitindo informar o
usuário do fim do processo.

## Exemplo de uso

Os arquivos `index.html` e `app.js` mostram como o componente
poderá ser usado no HTML e também em JS. Observe, contudo, que o
código está incompleto, já que a função `cria_usuario()` precisa
ser criada.


## Adicione atributos de configuração

Pense em como o componente poderia ser melhorado com
possibilidades de customização. Adicione atributos que permitam
configurar o componente. Algumas ideias seguem abaixo.

1. `username-comp-min` para que o cliente possa configurar o
   tamanho mínimo a ser exigido do username.
2. `username-com-max` para que o cliente possa configurar o
   tamanho máximo a ser exigido do username.
3. `senha-comp-min` para que o cliente possa configurar o
   tamanho mínimo a ser exigido da senha.
4. `senha-com-digitos` para que o cliente possa exigir que 
   o usuário inclua dígitos na senha.
5. `senha-com-nao-alfanum` para que o cliente possa exigir que 
   o usuário inclua caracteres não alfanuméricos na senha.
6. `reset-em` para que todos os dados sejam apagados, depois de
   certo número de segundos, para evitar expor dados
   desnecessariamente quando o usuário não está mais usando o
   componente.

Esses são apenas exemplos do que se pode fazer a partir de um
componente e como ele pode ser customizável para que mais usos
possam ser feitos do mesmo. Você mesmo pode pensar em outros
tipos de atributos.
