# Lista de exercícios da Aula 03 - User e FTP do Módulo de Linux

## Q1
Considere o seguinte cenário de grupos e usuários. Faça os comandos correspondentes para que este cenário seja verdadeiro no seu servidor. Não esqueça de atribuir senhas a cada um dos usuários. Registre todos os comandos e as saídas obtidas.
| Grupos | Usuários |
| :-- | :-- |
| alphalumen | nuricel |
| alpha | kenji samir |
| aluno | joão maria josé |
* Exibir o arquivo que contém os usuários do sistema.
* Exibir o arquivo que contém os grupos do sistema.
* Exibir o arquivo que contém as senhas criptografadas dos usuários do sistema.
* Exibir o arquivo que contém as senhas criptografadas dos grupos do sistema.
* Mudar o nome de login do usuário aluno “maria” para “fernanda”.
* Mudar o nome do grupo “alpha” para “alphaedtech”
* Atribuir uma senha para o grupo “alphaedtech”
* Inclua no grupo “alphaedtech”, o usuário “vitor”.

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio01/AddUserGroups.docx)

---
## Q2
Execute os comandos a seguir, coloque num pdf a execução dos comandos:
* Retire do grupo “alphaedtech”, o usuário “samir”.
* Apague o “alphalumen”.
* Quantos usuários tem no servidor?
* Grave no arquivo user_ordenado.txt o nome de todos os usuários que você criou em ordem alfabética.
* Grave no arquivo group_ordenado.txt o nome de todos os grupos que você criou em ordem alfabética.
* Crie um usuário chamado “intruso” que não loga no sistema.
* Apague os grupos “alphaedtech” e “aluno”.
* Crie um diretório chamado “Exercicios” e atribua a ele a permissão padrão 744.
* Crie dois arquivos “aula06.txt” e “aula07.txt” e um novo diretório chamado “aulas” dentro de ”Exercicios”.
* Verifique se receberam a permissão padrão.
* Altere a permissão de um dos arquivos para rwxr-x--- .
* O que significa a permissão rwxr-x--- .

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio02/ManipulacaoGroup.docx)

---
## Q3
Para todas as questões a seguir, registre o passo a passo, os comandos e saídas obtidas.
* Faça a instalação e configuração do servidor FTP, vsftpd.
* Instale o Filezilla.
* Crie um arquivo index.html. Aplique estilização CSS do tipo interno (internal). O conteúdo da página fica a seu critério. (obs: Ao submeter a resposta na plataforma adicione também o arquivo index.html).
Transfira o arquivo index.html usando o Filezilla e substitua a página web que o Apache está servindo.
Configure o vsftpd para usar o modo passivo com um intervalo de portas específico (ex: 50000-51000). Teste a conexão usando o FileZilla e verifique se as portas utilizadas estão dentro do intervalo definido.
* Faça um “chroot jail” no vsftpd. Tente acessar diretórios fora do seu "chroot jail" usando o FileZilla. Você consegue? Por quê?
* No servidor, crie um novo arquivo dentro de uma pasta acessível por FTP. Use o comando ls -l para verificar as permissões desse arquivo. Tente modificar o arquivo usando o FileZilla. Em seguida, altere as permissões do arquivo no servidor (usando chmod) para impedir a escrita. Tente novamente modificar o arquivo pelo FileZilla. O que acontece?
* Acesse os logs do vsftpd e procure por entradas relacionadas às suas tentativas de conexão (sucessos e falhas).

**Resposta**

[Resolução](./Conjunto_exercicios/Exercicio03/VsftpFileZilla.docx)

---