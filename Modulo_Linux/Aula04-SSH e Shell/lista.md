# Lista de exercícios da Aula 04 - SSH e Shell do Módulo de Linux

## Q1
Para todas as questões, indique os comandos utilizados e mostre a saída obtida.
Inicie o servidor SSH na VM e mostre que você consegue se conectar a ele a partir da sua máquina cliente (pode ser login SSH com senha mesmo). Depois ative o firewall da VM (com sudo ufw enable) e nele bloqueie a porta 22 (pesquise). Mostre que agora não funciona mais o login com SSH. Finalmente, explique por que o login não funciona mais (ou seja, o que o firewall está fazendo ?). Depois reabilite a porta 22.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio01/BloqueioSSH.docx)

---
## Q2
O que faz o comando ssh-keygen -t rsa -b 2048, ou seja, o que realmente são os dois arquivos que ele cria ? O que significa o -t rsa ? O que significa o -b 2048 ?

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio02/Chaves.docx)

---
## Q3
Se já é possível fazer login no SSH com senha, então por que usar um par de chaves pública-privada ? Qual a vantagem ?

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio03/VantagemChavePublicaPrivada.docx)

---
## Q4
Faça a criação e instalação de um par de chaves pública-privada para conseguir fazer login na VM a partir da sua máquina cliente. Mostre todos os passos, e no final mostre que o login SSH funciona (e que não usa mais senhas).

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio04/ProvaTeste.docx)

---
## Q5
Vamos praticar o comando scp. Para isso, cumpra os passos seguintes mostrando o passo-a-passo:
* Crie um arquivo index.html na sua máquina cliente. Aplique CSS interno (style no mesmo arquivo). O conteúdo da página é livre.
* Conecte-se ao servidor via SSH pelo terminal da sua máquina cliente.
* Transfira o arquivo index.html utilizando o comando scp. Verifique se o arquivo foi transferido com sucesso
* Substitua a página web que o Apache está servindo pelo arquivo que vocẽ acabou de transferir.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio05/ComandoScp.docx)

---
## Q6
Com um editor de texto de sua escolha, crie scripts que resolvam cada uma das questões a seguir. Envie um “relatorio” contendo os scripts sendo executados, bem como os scripts criados (arquivos .sh). Em todas as questões, utilize funções na organização/separação de responsabilidades.
Crie um script que exiba a mensagem  “Olá, mundo!”.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio06/RodandoScript.docx)

---
## Q7
Crie um script que receba o nome do usuário como entrada e imprima uma saudação apropriada de acordo com a hora do dia

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio07/ScriptDate.docx)

---
## Q8
Crie uma minicalculadora. Para isso, crie duas variáveis que receberão um valor cada, e retorne a soma, subtração, divisão e multiplicação dos números informados. Caso o segundo número seja zero (0), não deve calcular divisão.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio08/MiniCalc.docx)

---
## Q9
Crie uma calculadora de IMC, onde dois valores deverão ser informados no momento da execução no terminal, sendo PESO e ALTURA. A execução deve retornar o índice de massa corporal (IMC).

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio09/CalcIMC.docx)

---
## Q10
Faça um script que recebe como entrada dois números inteiros positivos (NUM1 e NUM2). Você deve exibir mensagens de aviso ao usuário, caso o script seja executado com parâmetros inválidos. Caso os parâmetros informados sejam válidos, mostre na saída todos os números que são múltiplos de 3 entre os dois números informados (incluindo NUM1 e NUM2). Por exemplo, se os números forem 3 e 10, deve imprimir: 3, 6 e 9.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio10/EncontraMultiplos.docx)

---