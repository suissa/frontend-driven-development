# frontend driven development

Vamos do front até o banco e vice-versa.

Irei mostrar como tirar um padrão a partir do frontend até o banco de dados implementando uma API REST de CRUD, ou seja, iremos gerar 
as 4 funções básicas para um módulo/molécula que será nosso `form` e seus `input`s serão nossos componentes/átomos.  

Para isso iremos mapear os tipos de dados entre as 2 partes e depois criar 1 JSON de configuração para esse módulo, para que o mesmo possa ser gerado para qualquer framework.

Por exemplo o mesmo componente de CPF poderá ser gerado tanto para os frameworks de frontend (ng1, ng2, vue, react, etc) como para os "ORMs" de banco (mongoose, sequelize, bookshelf).

E nesse meio de campo iremos gerar os *Services, Controllers e Componentes* que consumirão a API REST do backend, a qual terá todas as funcionalidades do CRUD chegando até o seu banco de dados escolhido.

![whaaat](https://media.giphy.com/media/3otPoUbZNPjqWefNgQ/giphy.gif)

## Tipos de dados

Como iremos criar um padrão da *View* até o banco e reutilizando o máximo possível de código precisaremos criar uma ponte entre os `inputs` e os campos no banco de dados, vamos pegar alguns átomos de base:

```js
const AtomName = 'CPF';

module.exports = {
  type: String
, validate: require('./../_hadrons/'+AtomName.toLowerCase()+'MongooseValidate')
, default: '04864713901'
, required: true
}
```

Nesse caso nós temos 4 informações:

- name: 'cpf';
- type: String;
- validate: { validator: function, message: String}
- default: '04864713901'

Então podemos converter elas da seguinte forma:

```html
<input type="text" placeholder="04864713901" class="atom-cpf" onBlur="validate" required >
```

```js
const validate = require('atom-cpf-validate')
const atom = document.querySelector('.atom-cpf')
atom.addEventListener('blur', validate)
```

Agora vamos pensar em como criar um JSON que contenha essas informações para ser a configuração do nosso átomo:

```js
const name = 'cpf'
const type = String
const event = 'blur'
const validate = require('atom-cpf-validate')

config = {
  name,
  type,
  validator: {
    validate,
    event
  }
}
```

Porém ele ainda está incompleto pois se quisermos que esse input inicie desabilitado não temos como definir isso, então podemos adicionar uma propriedade `state` a qual também será uma classe no componente no *Frontend*.

Na minha metodologia eu uso apenas **2 classes** por elemento, uma para identificar o componente e outra para o seu estado, a classe de estado é única que pode ser modificada mediante a mudança de estado do componente, por exemplo: `validate-success` e `validate-error`.

Então deixaremos nossa configuração assim:


```js
const name = 'cpf'
const type = String
const event = 'blur'
const validate = require('atom-cpf-validate')
const state = 'enable'

config = {
  name,
  type,
  state,
  validator: {
    validate,
    event
  }
}
```

Porém precisamos definir quais são os possíveis estados de um componente.
