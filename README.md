# Find a Friend API

Nesse desafio será desenvolvido uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

## Contexto da aplicação
É comum ao estar desenvolvedor uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.
Segue abaixo o link para acessar o Layout da aplicação que utilizaria essa API.

- [Layout da aplicação](https://www.figma.com/file/sIjvM84tYyv0NyJzdyvEbJ/Find-A-Friend-(APP)?node-id=1%3A2&t=gjTm3ka3Uj7FXTFV-1)

## Regras da aplicação
- [x] Deve ser possível cadastrar um pet;
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [x] Deve ser possível filtrar pets por suas características;
- [x] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível realizar login como uma ORG;

## Regras de negócio
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [x] Um pet deve estar ligado a uma ORG;
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [x] Todos os filtros, além da cidade, são opcionais;
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;

## Propriedades dos registros
- ORG:
  - ID;
  - nome do responsável;
  - email;
  - CEP;
  - Endereço;
  - Whatsapp;
  - Senha;

- Pets:
  - ID;
  - nome do pet;
  - sobre;
  - cidade;
  - idade: filhote, adolescente, adulto
  - porte: pequeno, médio, grande
  - independência; baixo, médio, alto
  - tipo: gato, cachorro
  - org_id;

## Testes Unitários
- [x] Testar UseCases com Vitest;

## API IBGE
- [x] Buscar os estados e cidades;
