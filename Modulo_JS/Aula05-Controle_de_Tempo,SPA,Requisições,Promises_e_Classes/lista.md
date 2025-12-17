# Lista de exercícios da Aula 05 - Controle de Tempo, SPA, Requisições, Promises e Classes do Módulo de JS

## Q1
Crie uma página web para consulta de CEP e localidade de forma que:
Possua um campo para que o usuário digite o CEP.
deve haver um campo “Consultar” que será utilizado para fazer uma requisição à API CEP, se o valor informado num input for válido.
Caso o valor seja inválido, a requisição não deve ser realizada e uma mensagem de erro deve ser mostrada ao usuário. Após requisição à API CEP, deve ser mostrado na página as seguintes informações do CEP consultado:
- endereço
- bairro
- cidade
- estado
- latitude
- longitude

Ao retornar os dados, deve ser exibido um botão com o título ‘Exibir mapa’ ao clicar no botão ‘Exibir mapa’, deve ser feita uma consulta à API Google Maps com os parâmetros de latitude e longitude obtidos na consulta a API CEP:

Utilize a seguinte url para obter os dados do mapa: <https://maps.google.com/maps?q=LAT,LNG&hl=pt&z=14&output=embed>, substituindo LAT e LNG com os valores de latitude e longitude obtidos. Um iframe deve ser preenchido na mesma página com o mapa obtido. Utilize o cursor wait e o pointer para sinalizar consulta sendo realizada:
Não permita ao usuário realizar operações enquanto o cursor não retornar ao default
Caso a consulta de CEP retorne **status de erro**:
- não exiba os resultados da consulta
- exiba um erro de consulta de CEP do tipo ‘CEP inválido!’
- não exiba o botão ‘Exibir mapa’ e o ‘iframe’

**Resposta**



---
## Q2
Crie uma página web para exibir a previsão do tempo de uma cidade. Essa página deve conter:

- um select para seleção de um estado brasileiro
ao selecionar um estado, uma requisição à API de localidades do IBGE (<https://servicodados.ibge.gov.br/api/docs/localidades>) deve ser feita, e um segundo select deverá ser preenchido com as cidades do estado selecionado
- ao selecionar uma cidade, devem ser mostradas ao usuário as previsões do tempo para os períodos manhã, tarde e noite do dia atual e dos próximos três dias (dados obtidos a partir de uma requisição à API de previsão do tempo do Instituto Nacional de Meteorologia - <https://portal.inmet.gov.br/manual>), com as seguintes informações:
  * data
  * dia da semana
  * ícone que represente o tempo
  * resumo da previsão
  * temperatura mínima
  * temperatura máxima
- cada requisição às APIs deve ser feita por uma função que retorne uma Promise, que deve devolver apenas os dados necessários para a operação seguinte
- a requisição à API de localidades retorna um array para ser renderizado como options no select
- a requisição à API de previsão do tempo retorna um array com os dados de previsão para cada dia, para a cidade selecionada
- caso o retorno de qualquer consulta não contenha status 200, isto é, os dados não forem devidamente recebidos, a função deverá rejeitar (reject) o retorno, que deverá ser devidamente tratado exibindo uma mensagem de erro ao usuário
- as funções async/await não devem ser utilizadas nessa questão

**Resposta**



---
## Q3
Utilize a API deck de cartas (<https://deckofcardsapi.com/>) para criar uma função, utilizando async/await, que:
- embaralhe um deck e logo em seguida faça 5 consultas, buscando 1 carta no mesmo deck a cada consulta, de forma sequencial
- caso o retorno de qualquer consulta não contenha status 200, isto é, os dados não forem devidamente recebidos, a sua função deverá rejeitar (reject) o retorno

**Resposta**



---
## Q4
Reescreva a função da questão anterior utilizando o método Promise.all.

**Resposta**



---
## Q5
Crie uma página web que simule um sorteio, considerando os seguintes pontos:
- utilizando o conceito de closures, crie uma função que instancie cartelas para o sorteio, cada uma com 10 números, seleccionados de 1 a 75
a cartela deve conter closures que realizem as seguintes ações:
  * listar os números da cartela
  * marcar um número como sorteado
  * verificar se todos os números da cartela foram marcados
- da mesma forma, crie uma função que instancie um “sorteador” (tal como um globo de bingo), responsável por armazenar e sortear os números do sorteio, considerando que:
  * a função do sorteador deverá receber dois parâmetros, max e min, a serem utilizados para construir um array de números que podem ser sorteados pelo sorteador
- o sorteador deve conter closures que realizem as seguintes ações:
  * sortear um número que ainda não foi sorteado
  * verificar se um número já foi sorteado
- a página deve mostrar, além de um sorteador, duas ou mais cartelas de sorteio, ambos instanciados com as funções criadas nos itens anteriores
um botão “INICIAR” deve ser utilizado para iniciar o sorteio, sendo que, após o início, um número seja sorteado a cada 5 segundos, até que não sobrem mais números no sorteador
os números das cartelas devem ser clicáveis, sendo marcados caso o número já tenha sido sorteado
quando uma cartela tiver sido totalmente marcada, uma mensagem deve indicar o ganhador do sorteio, e o sorteio de novos números deve ser interrompido.
 

**Resposta**



---
## Q6
Crie uma classe que represente um Avatar num jogo de plataforma, considerando os seguintes critérios:
- a classe deve ser iniciada com atributos que representem as posições x e y do avatar no jogo, e com um atributo que represente uma bolsa de moedas
- os métodos get devem retornar as coordenadas x e y, e a quantidade de moedas na bolsa do avatar
quatro métodos de movimentação devem ser criados:
  * forward: indicando que o avatar se movimente para frente
  * back: indicando que o avatar se movimente para trás
  * right: indicando que o avatar se movimente para a direita
  * left: indicando que o avatar de movimente para a esquerda
  * as coordenadas do avatar não podem ser menores do zero
  * um método de adição de moedas à bolsa deve ser adicionado, simulando que o avatar encontrou uma moeda durante sua movimentação pelo jogo
  * um atributo que represente pontos de vida deve ser adicionado, com valor inicial igual a 10
  * um atributo que represente pontos de dano deve ser adicionado, com valor inicial igual a 1
  * um método chamado attack, que representará um ataque do avatar em seus adversários deve ser adicionado, sendo retornado pelo mesmo os pontos de dano especificados no atributo de pontos de danos
  * um método que represente um ataque recebido por um adversário, recebendo como parâmetro um valor de dano, que deve ser descontado dos pontos de vida do Avatar deve ser adicionado
  * caso os pontos de vida do avatar sejam zerados, todos os métodos da classe devem ser bloqueados

**Resposta**



---
## Q7
Utilizando a classe Avatar criada na questão 6, crie as seguintes subclasses:
- Cowboy: que herdará todos os atributos e métodos de Avatar, e conterá os seguintes atributos e métodos:
  * um atributo que represente a munição disponível com o Cowboy, com valor inicial igual a 10
  *  um atributo que represente pontos de dano, com valor inicial igual a 2
  *  um método chamado attack, que represente a ação de atirar, sendo que ao atirar, a munição seja decrementada, e o valor de dano seja retornado
  *  um método que adicione munição ao Cowboy, simulando que o mesmo encontrou munição na sua movimentação pelo jogo
- Mago: que herdará todos os atributos e métodos de Avatar, e conterá os seguintes atributos e métodos:
  * um atributo que indique a quantidade de feitiços que o mesmo tem para lançar, com valor inicial igual a 10
  * um atributo que represente pontos de dano, com valor inicial igual a 3
  * um método chamado attack, que represente a ação de atacar com um feitiço, sendo que ao atacar, a quantidade de feitiços seja decrementada, e o valor de dano seja retornado
quando os feitiços se esgotarem, depois de 10 segundos, devem ser restaurados com a quantidade inicial

**Resposta**



---