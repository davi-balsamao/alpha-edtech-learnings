# Lista de exercícios da Aula 02 - Ferramentas do Linux

## Q1
Para todas as questões abaixo é necessário demonstrar salvando os comandos e saídas obtidas.
1. Instale o VIM usando o comando “apt”.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio01/InstalaçãoVim.docx)

---
## Q2
Trabalhe com comandos básicos:
* Crie um diretório “alpha”;
* Crie um arquivo “compactei.txt” dentro de “alpha”;
* Escreva um texto dentro de “compactei.txt”;
* Exiba o que está escrito dentro de “compactei.txt”;
* Faça a compactação do diretório “alpha”;
* Mova o arquivo compactado para sua área de trabalho;
* Descompacte o arquivo em sua área de trabalho.
* Exclua todos os diretórios e arquivos criados.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio02/Compactando_Descompactando.docx)

--- 
## Q3
Buscando arquivos ou diretórios.
* Crie na raiz do sistema, um diretório “alpha”, e nele, crie um arquivo “meudb.txt”.
* No arquivo escreva: “Estou testando comandos de busca”;
* Vá para o diretório do seu usuário.
* Procure o arquivo “meudb.txt” usando o find e locate;
* Procure o conteúdo escrito dentro do arquivo a partir do seu diretório de usuário.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio03/FindLocate.docx)

--- 
## Q4
Usando piping, crie um arquivo “meutexto.txt”, escreva seu nome nele e logo em sequência, exiba o conteúdo no terminal.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio04/Piping.docx)

--- 
## Q5
Uso do Apache.
* Instale o apache com o “apt”
* Use o systemctl para verificar se o Apache está rodando
* Acesse no navegador web do seu computador host (i.e. fora da VM) a URL principal do servidor para confirmar que aparece a página index.html do * Apache
* Dentro do Linux, crie outro arquivo “teste.html” no mesmo diretório onde fica o “index.html” do Apache. Insira nele (com nano ou vim) um pequeno HTML e um javascript que mostra um alerta ao abrir.
* Acesse no navegador web a URL desse arquivo para demonstrar que ele está sendo servido com sucesso.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio05/InstalandoApache.docx)

--- 
## Q6
Qual a diferença entre arquivo .tar e arquivo .tar.gz ? Que comandos do Linux permitem criar o primeiro tipo de arquivo e o segundo tipo ?

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio06/Tar.docx)

--- 
## Q7
Um arquivo .tar.gz é um arquivo compactado. Mas um arquivo .zip ou um arquivo .rar também são ! Então qual a diferença ?

**Resposta**

Embora todos sejam arquivos compactados, a principal diferença técnica está na preservação de permissões e na arquitetura de compressão. O formato .tar.gz é o padrão absoluto em ambientes Linux/Servidores porque ele preserva os metadados do sistema (quem é o dono do arquivo e se ele é executável) e utiliza "compressão sólida" (agrupa tudo antes de comprimir), o que gera arquivos menores e mais eficientes para armazenamento.
Por outro lado, o .zip comprime arquivos individualmente (menos eficiente, mas permite extrair um arquivo só rapidamente) e não foi desenhado para manter as permissões complexas do Linux, sendo ideal apenas para troca de documentos entre sistemas diferentes (como Windows e Mac). Já o .rar é tecnicamente eficiente, mas é evitado em infraestrutura profissional e DevOps por ser um formato proprietário (fechado/pago), enquanto .tar.gz e .zip são padrões abertos universais.


--- 
