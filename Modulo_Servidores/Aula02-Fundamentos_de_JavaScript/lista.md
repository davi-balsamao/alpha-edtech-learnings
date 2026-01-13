# Lista de exercícios da Aula 02 - Fundamentos do Node JS do Módulo Servidores

## Q1
Escreva uma função que receba como parâmetro o nome de um arquivo e retorne o seu conteúdo. Agora em outro arquivo chamado ‘app.js’, importe a função utilizando commonJS, passe endereço do arquivo e o seu nome e depois exiba o seu conteúdo.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio1/Exercicio1.docx)

---
## Q2
Refaça a questão anterior (1) utilizando o ESM.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio2/Exercicio2.docx)

---
## Q3
Crie um projeto de servidor web que utilize o ‘express’ e sirva arquivos estáticos. Demonstre o resultado colocando uma página HTML com CSS e Javascript criadas por você e que esteja funcionando. 

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio3/Exercicio3.docx)

---
## Q4
Crie um projeto em nodejs que capture os processos que estão rodando na sua máquina (ps –auxw) e exiba apenas os dados do processo que contenha o PID do node que está sendo executado. 

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio4/Exercicio4.docx)

---
## Q5
Crie um projeto em nodejs que exiba o horário atual no formato “HH:MM:SS” e a data no formato “DD/MM/AAAA” a cada intervalo de 1 segundo. Explique a opção de uso de obtenção de dados de hora e data bem como as bibliotecas usadas se houver. 

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio5/Exercicio5.docx)

---
## Q6
Elabore um projeto em nodejs com ‘express’ e que tenha rotas do tipo ‘GET’ que, ao serem acessadas, exiba o conteúdo de uma função que esteja em outro arquivo. 

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio6/Exercicio6.docx)

---
## Q7
Crie uma página web que ao clicar em determinados botões faça com que o servidor nodejs execute funções do sistema operacional sem utilizar AJAX. Demonstre o seu funcionamento e para que serve.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio7/Exercicio7.docx)

---
## Q8
Crie uma API RESTful que faça o cadastro de produtos que contenham os atributos ‘id’, ‘name’, ‘value’ no qual ‘id’ será um número inteiro único (não repetido), o ‘name’ conterá uma string, e o ‘value’ será numérico com duas casas com as seguintes rotas: 
GET /api/product 
retorna todos os produtos no formato JSON 
GET /api/product/:id 
retorna o produto com ‘id’ no formato JSON 
POST /api/product 
adiciona produto 
UPDATE /api/product/:id 
atualiza o produto com o ‘id’ passado 
DELETE /api/product/:id 
remove o produto com o ‘id’ passado 

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio8/Exercicio8.docx)

---
## Q9
Agora adicione mais um controlador para a rota de ‘order’ que possibilite ao usuário fazer um pedido. O pedido deve conter um ‘id’ numérico inteiro único, ‘items’ que contém um array de objetos (com atributos ‘id’ que representa o id do produto, ‘quantity’ que representa a quantidade pedida):
GET /api/order 
retorna todos os pedidos no formato JSON 
GET /api/order/:id 
retorna o pedido de ‘id’ no formato JSON 
POST /api/order 
adiciona um pedido
UPDATE /api/order/:id 
atualiza o pedido com o ‘id’ passado
DELETE /api/order/:id 
remove o pedido com o ‘id’ passado

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio9/Exercicio9.docx)

---
## Q10
Faça uma página HTML com CSS e Javascript que permita usar a API criada nas questões anteriores (1 e 2). 
Demonstre o funcionamento. 
Observação: o intuito desta aula é a criação de API e, portanto, a página criada precisa ser funcional não necessitando de uma UI/UX avançada. Porém, faça o seu melhor!

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio10/Exercicio10.docx)

---