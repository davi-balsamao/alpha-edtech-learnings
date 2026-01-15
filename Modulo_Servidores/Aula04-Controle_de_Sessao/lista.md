# Lista de exercícios da Aula 04 - Controle de Sessão do Módulo de Servidores

## Q1
Para a aplicação de API criada até o momento para ‘product’, ‘order’, ‘customer’, desenvolva uma página de login que não permita que as requisições de API para ‘product’, ‘order’ e ‘customer’ sejam realizadas sem uma sessão válida, isto é, o usuário ao efetuar login e tiver as permissões poderá utilizar a API. Caso contrário, a API não deve ser possível ser utilizada por falta de permissões. 

**Resposta**



---
## Q2
Crie agora um ‘endpoint’ para ‘login’ que permita adicionar novos usuários pelo usuário com permissão de ‘admin’ considerando os tipos de usuário ‘admin’ com poderes totais e ‘user’ com poderes apenas para acesso à aplicação: 

GET /api/login/
Obtém os dado do usuário que fez a chamada caso tenha uma sessão válida 
(usuários: ‘admin’ e ‘user’)
GET /api/login/all
Obtém os dados de todos os logins 
(somente usuário do tipo ‘admin’)
GET /api/login/:username
Obtém os dados de login do usuário com username = ‘:username’ 
(somente usuário do tipo ‘admin’)
POST /api/login
Recebe ‘username’ e ‘password’ e retorna o cookie de sessão registrado. 
(usuários: ‘todos’, não há necessidade de sessão)
PUT /api/login/:username
Atualiza os dados do usuário = ‘:username’ 
(somente usuário do tipo ‘admin’)
DELETE /api/login/:username
Apaga os dados do usuário = ‘:username’ 
(somente usuário do tipo ‘admin’)


**Resposta**



---
## Q3
Ajuste a API desenvolvida até a aula passada para agora realizar a autenticação e receber um Token JWT: 
Crie restrições de uso de rotas conforme tipo de usuários; 
Crie um middleware que fará a verificação do recebimento (ou não) do cookie de sessão JWT; 
Demonstre a sua utilização exibindo o cookie de sessão recebida.

**Resposta**



---
## Q4
Demonstre o valor do cookie de sessão ‘colando-o’ no site ‘jwt.io’.

**Resposta**



---
## Q5
Por que o uso de ‘JWT’ tem sido a escolha preferida para microsserviços? Explique.

**Resposta**



---
## Q6
Apesar do ‘JWT’ ser muito bom, quando devemos utilizar o controle de sessão como aprendemos na aula ?

**Resposta**



---