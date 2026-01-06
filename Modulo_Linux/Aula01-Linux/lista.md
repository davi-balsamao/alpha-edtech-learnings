# Lista de exercício da Aula 01 - Linux

## Q1
Descreva de forma sucinta sobre o criador e a evolução do Linux.

**Resposta**

O criador do Linux é Linus Torvalds, que iniciou o projeto em 1991 enquanto era estudante de Ciências da Computação na Universidade de Helsinki, na Finlândia. Ele desejava desenvolver um sistema operacional mais robusto do que o MINIX. O nome do sistema surgiu da combinação de seu nome com o sistema Unix (LINUS + UNIX). 

Sobre a evolução do Linux, ela pode ser descrita com os seguintes marcos:
* Desenvolvimento Inicial: A versão 0.02 do Kernel foi lançada em 1991 após Linus buscar colaboradores na Usenet, chegando à versão 1.0 em 1994
* União com o Projeto GNU: O Linux é, tecnicamente, um kernel (o núcleo que gerencia o hardware). Para se tornar um sistema operacional completo, ele foi combinado às ferramentas do Projeto GNU, de Richard Stallman, formando o que muitos chamam de GNU/Linux
* Licenciamento e Liberdade: O kernel opera sob a licença GNU GPL, que garante as liberdades de executar, estudar, modificar e redistribuir o software
* Distribuições (Distros): O sistema evoluiu para diversas variantes, como Ubuntu, Debian e Fedora, que compartilham o mesmo kernel, mas possuem diferentes conjuntos de software e configurações.

--- 
## Q2
Com suas palavras explique o que é o kernel e seu papel.

**Resposta**

O kernel atua como a medula espinhal atua no nosso corpo, estabelecendo conexões físicas e a comunicação de sinais entre o cérebro (software) com o resto do corpo (hardware). Dessa forma, o kernel garante que diferentes partes do software tenham acesso aos recursos de maneira ordenada e funcional. 
Os principais papéis do kernel são:
* Gestão de Recursos: Ele decide como e quando o processador, a memória e os dispositivos de entrada/saída serão usados pelos programas.
* Interface de Comunicação: Traduz as instruções dos aplicativos para que o hardware as entenda, fornecendo abstrações que simplificam essa interação.
* Execução e Segurança: Gerencia a inicialização do sistema, o agendamento de tarefas e garante que um processo não interfira indevidamente em outro.
* Drivers de Dispositivos: Inclui módulos que permitem ao sistema conversar com peças específicas, como placas de vídeo e impressoras.

--- 
## Q3
Linux é um sistema operacional? Justifique.

**Resposta**

Não, o Linux é um kernel por si só. Para se tornar um sistema operacional completo, o Linux precisou ser combinado com os componentes do projeto GNU. Porém por questões de popularidade, o nome do sistema operacional GNU/Linux foi abreviado para somente "Linux".

--- 
## Q4
Quais são as principais distros utilizadas em servidores? Quais as principais diferenças entre uma distro voltada para desktop e uma voltada para servidor?

**Resposta**

As principais diferenças entre uma distro voltada para desktop e uma voltada para servidor são que as voltadas para desktop são projetadas para uma experiência de usuário melhor, sendo mais rica, amigável e visualmente atraente. Enquanto isso, as voltadas para servidores são projetadas para oferecer estabilidade, otimização, segurança e desempenho em ambientes de servidor. Por conta disso, elas podem não ser tão agradáveis quanto as distros voltadas para desktop, uma vez que muitos servidores são gerenciados somente pela linha de comando. 

As principais distros utilizadas em servidores são:
* Red Hat Enterprise Linux (RHEL)
* Ubuntu Server
* SUSE Linux Enterprise Server (SLES)
* Debian
* CentOS
* Fedora Server
* Oracle Linux
* Arch Linux

--- 
## Q5
Aponte algumas vantagens de usar uma distribuição Linux como servidor web.

**Resposta**

Usar uma distribuição Linux como servidores web pode ser vantajoso porque oferece na maioria das vezes um código aberto e gratuito, ela garante uma estabilidade e confiabilidade maior, sendo essencial para servidores que precisam estar disponíveis continuamente. Além disso, uma distribuição Linux pode ser adaptado e ajustado para atender a demanda daquele tipo de servidor, por conta disso são altamente eficientes em termos de desempenho. Outro fator que torna vantajoso o uso do Linux é sua grande comunidade ativa de desenvolvedores, que contribuem ativamente para a segurança dos servidores, tornando-os menos suscetíveis a ameaças de segurança. Essa comunidade também é responsável pelos softwares open source que são utilizados pelos servidores web.

--- 
## Q6
Cite e comente sobre as principais formas de instalação do Ubuntu em uma máquina?

**Resposta**

Existem três formas principais de instalar ou utilizar o Ubuntu em sua máquina:
* Máquina Virtual (VM): Cria-se um ambiente isolado dentro do seu sistema operacional atual usando softwares como o VirtualBox. A grande vantagem é a facilidade de instalação e remoção sem afetar o sistema principal, embora possa haver uma pequena perda de desempenho pela virtualização.
* WSL (Windows Subsystem for Linux): Uma funcionalidade do Windows que permite rodar o Linux diretamente no ambiente Windows. O WSL 2 utiliza um kernel real e consome menos recursos (CPU e memória) do que uma máquina virtual completa.
* Dual Boot: O computador é configurado para ter dois sistemas instalados em partições diferentes do disco. Ao ligar a máquina, você escolhe qual sistema deseja iniciar, o que permite usar todo o potencial do hardware sem as limitações da virtualização


--- 
## Q7
Instale em sua máquina o virtualbox, configure-o e em seguida instale a versão Ubuntu Server 24.04 LTS. Demonstre, salvando todos os passos realizados durante a instalação.

**Resposta**

[Pasta dos prints](./Conjunto_exercicios/Exercicio_7/)

--- 
## Q8
Para todos os itens abaixo é necessário demonstrar salvando os comandos e saídas.
* Mostre o caminho absoluto até o diretório atual;
* Liste arquivos e diretórios do diretório atual, incluindo os ocultos;
* Crie um diretório chamado “alpha”, e dentro dele crie mais dois diretórios “linux” e “servidores”;
* Verificar o atual diretório de trabalho.
* Dentro de “servidores” crie dois arquivos, “ubuntu.txt” e “distros.txt”;
* Liste os arquivos e confirme se estão como descrito;
* Escreva dentro de “distros.txt” o nome de quatro distros linux desktop e quatro distros usadas em servidores;
* Exiba o conteúdo de “distros.txt”;
* Faça uma cópia de “ubuntu.txt” para “alpha”;
* No diretório “alpha” crie um arquivo “history.txt”;
* Escreva “Hello world!” dentro de “history.txt”;
* Mova “history.txt” para “linux”;
* Liste todos arquivos e subdiretórios de  “alpha”;
* Exclua o diretório “servidores”;
* Remova “alpha”.

**Resposta**

[Pasta dos prints](./Conjunto_exercicios/Exercicio_8/)

--- 
## Q9
Para todos os itens abaixo é necessário demonstrar salvando os comandos e saídas. Navegando e conhecendo diretórios padrões.
* Vá até o diretório raiz do seu Linux;
* Liste todos os arquivos;
* Liste o que está dentro de “/bin” , identifique algo que você conhece;
* Explique o que fica dentro de “bin”;
* Liste o que está dentro de “/etc”;
* Explique o que fica dentro de “/etc”;
* Liste o que está dentro de “/tmp”;
* Explique o que fica dentro de “/tmp”;
* Liste o que está dentro de “/home”;
* Explique o que fica dentro de “/home”.

**Resposta**

* /bin: Contém os binários executáveis essenciais acessíveis a todos os usuários, como comandos fundamentais (cp, mv, ping).
* /etc: Armazena arquivos de configuração do sistema e scripts de inicialização usados por diversos softwares.
* /tmp: Diretório destinado a arquivos temporários criados pelo sistema ou usuários. Muitos itens aqui são excluídos ao reiniciar o computador.
* /home: Local onde ficam os arquivos pessoais dos usuários (documentos, fotos), organizados em pastas com o nome de cada usuário.

[Pasta dos prints](./Conjunto_exercicios/Exercicio_9/)

--- 
## Q10
Execute o comando htop. Explique tudo que aparece na tela, nos mínimos detalhes.

**Resposta**

* Cabeçalho: Mostra o uso atual de cada núcleo da CPU e o consumo de Memória RAM e Swap (memória virtual).
* Dados Gerais:
  * Tasks: Total de processos e threads (ativos e dormindo).
  * Load average: Média de carga do sistema.
  * Uptime: Tempo que o computador está ligado.
* Lista de Processos (Colunas):
  * PID: Identificador único do processo.
  * USER: O usuário dono do processo (ex: aluno, root).
  * PRI/NI: Prioridade do processo.
  * VIRT/RES/SHR: Informações sobre consumo de memória (Virtual, Residente e Compartilhada).
  * S (State): Estado do processo (S = Sleeping/Dormindo, R = Running/Rodando).
  * CPU% e MEM%: Porcentagem de processador e memória que o processo está usando.
  * TIME+: Tempo total de CPU que o processo já consumiu.
  * Command: O nome do comando ou programa que está rodando.

--- 