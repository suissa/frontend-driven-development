# Átomo Requests for Comments (RFC)

Estrutura básica, que compõe uma [molécula](Molécula.md).

### Semântica
A sintaxe deve ser consistente com o conhecimento prévio, de modo que os programadores não familiarizados com Eve podem ler um programa Eve e descobrir o que está acontecendo em um nível elevado sem conhecer explicitamente a sintaxe.

### A estrutura do átomo deve seguir a seguinte forma:

```
type [String|Array|Boolean|Number]
validate [Function|Array]
default [String|Array|Boolean|Number]
required Boolean,
value String
```
