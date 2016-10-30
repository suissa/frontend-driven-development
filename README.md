# frontend-driven-development

Vamos do front até o banco e vice-versa

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
var validate = require('atom-cpf-validate')
var atom = document.querySelector('.atom-cpf')
atom.addEventListener('blur', validate)
```
