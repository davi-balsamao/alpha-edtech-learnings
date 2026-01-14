# Lista de exercícios da Aula 03 - APIs do Módulo de Servidores

## Q1
Considerando a API RESTful criada anteriormente (aula 02), adicione um ‘endpoint’ para ‘customer’ que contenham os atributos ‘id’, ‘name’, ‘email’ no qual ‘id’ será um número inteiro único (não repetido), o ‘name’ conterá uma string, e o ‘email’ será uma string que representa o e-mail do cliente com as seguintes rotas: 

GET /api/customer 
retorna todos os clientes no formato JSON
GET /api/customer/:id 
retorna o cliente com ‘id’ no formato JSON
POST /api/customer 
adiciona cliente
UPDATE /api/customer/:id 
atualiza o cliente com o ‘id’ passado
DELETE /api/customer/:id 
remove o cliente com o ‘id’ passado

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio1/Exercicio1.docx)

---

## Q2
Ajuste a API para que seja necessário o id do cliente associado na inclusão de um pedido (order).

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio2/Exercicio2.docx)

---

## Q3
Agora adicione uma requisição que retorne todos os pedidos (orders) que possuem um determinado produto: 

GET /api/order/search?product_id= 
onde é o id do produto. 
o retorno deve ser um array de objetos de pedidos que contenham o produto a ser pesquisado. 
GET /api/order/search?customer_id= 
onde é o id do cliente. 
o retorno deve ser um array de objetos de pedidos que contenham o cliente a ser pesquisado.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio3/Exercicio3.docx)

---

## Q4
Adicione validação de dados em todas as requisições para melhoria de experiência de uso do cliente no qual: 

‘id’ deve ser sempre um número inteiro; 
‘name’ deve ser sempre do tipo string não nulo; 
Um pedido deve ter sempre um cliente associado; 
Um pedido deve ter no mínimo 1 produto; 
‘value’ deve ser numérico com duas casas de precisão; 
‘email’ deve ser um e-mail com formatação válida; 

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio4/Exercicio4.docx)

---

## Q5
Adicione a proibição de que a página do cliente seja aberta em um ‘iframe’. 

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio5/Exercicio5.docx)

---

## Q6
Bloqueie o acesso de requisições de outras fontes além da origem do cliente da aplicação.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio6/Exercicio6.docx)

---

## Q7
Adicione códigos de status HTTP para todas as respostas às requisições HTTP, incluindo em casos de erro e sucesso.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio7/Exercicio7.docx)

---

## Q8
Demonstre a utilização da ferramenta do ‘Postman’ para as rotas até agora criadas: 

GET /api/product 
GET /api/product/:id 
POST /api/product 
UPDATE /api/product/:id 
DELETE /api/product/:id 
GET /api/order 
GET /api/order/:id 
GET /api/order/search?product_id= 
GET /api/order/search?customer_id= 
POST /api/order 
UPDATE /api/order/:id 
DELETE /api/order/:id 
GET /api/customer 
GET /api/customer/:id 
POST /api/customer 
UPDATE /api/customer/:id 
DELETE /api/customer/:id

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio8/Exercicio8.docx)

---

## Q9
Demonstre a utilização da ferramenta do ‘curl’ para as rotas até agora criadas: 

GET /api/product 
GET /api/product/:id 
POST /api/product 
UPDATE /api/product/:id 
DELETE /api/product/:id 
GET /api/order 
GET /api/order/:id 
GET /api/order/search?product_id= 
GET /api/order/search?customer_id= 
POST /api/order 
UPDATE /api/order/:id 
DELETE /api/order/:id 
GET /api/customer 
GET /api/customer/:id 
POST /api/customer 
UPDATE /api/customer/:id 
DELETE /api/customer/:id

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio9/Exercicio9.docx)

---