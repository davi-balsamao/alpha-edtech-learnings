# Lista de exercícios da Aula 02 - Figma do Módulo de UX-UI

## Q1
Entre com sua conta no figma e inicie um novo arquivo design. Renomeie sua primeira página para “Ideias / Especificações” e crie uma nova página chamada “protótipo”. Anexe o print de como seu projeto ficou. Adicione um nome (livre escolha) ao seu projeto. Ao longo dos próximos exercícios, nesse projeto faremos um pequeno protótipo para treinar o uso do figma, conterá nesse protótipo uma tela de login, tela para o usuário se cadastrar e uma tela home. Por enquanto, só pense numa possível aplicação contendo pelo menos essas três telas. Descreva que aplicação você pretende fazer e qual nome escolheu (pode ser mobile ou desktop), não precisa montar a aplicação no figma ainda (faremos isso ao longo dos próximos exercícios).

**Resposta** 
Definição do projeto:
- **Nome**: DevFocus
- **Plataforma**: Mobile
- **Objetivo**: App para devs organizarem sprints pessoais
- **Telas**: Login, Cadastro (Sign Up), Home (Dashboard)

Link do print: [Imagem exercicio 1](./Conjunto_de_exercicios/Exercicio_1/Print.png)

---
## Q2
Na página de ideias e especificações reserve uma área para inserir a paleta de cores e fontes utilizadas. Defina uma paleta de cores e a fonte a ser utilizada (usando apenas formas no figma) e explique o motivo da escolha. Anexe junto o print do resultado final.

**Resposta**

Primary: #6366F1 Cor vibrante para Call-to-Action (Botões), remete a tecnologia
Background: #0F172A Fundo escuro reduz cansaço visual (preferência de devs).
Surface: #1E293B Para cartões e inputs, cria contraste suave com o fundo.
Text Main: #F8FAFC Leitura clara em fundo escuro (acessibilidade AAA).
Error: #EF4444 Feedback de erro padrão universal.

link do print: [Imagem exercicio 2 ](./Conjunto_de_exercicios/Exercicio_2/Print.png)

---
## Q3
No seu ponto de vista, utilizar cores padrão usando a parte de estilos no figma é importante e ajuda em alguma coisa? Explique sua resposta.

**Resposta**

Sim, é crítico para a escalabilidade, uma que colabora para:
- Consistência (Consistency): Garante que o "Azul do Botão" seja exatamente o mesmo hexadecimal em 50 telas diferentes.
- Manutenibilidade (Maintainability): Se o cliente ou a marca decidir mudar do Azul para o Verde, você altera apenas no Estilo e a mudança se propaga automaticamente para todo o projeto. Sem estilos, você teria que alterar item por item manualmente.
- Desenvolvimento: Facilita a vida do desenvolvedor frontend, que criará variáveis CSS (ex: var(--primary-color)) correspondentes aos estilos do Figma.


---
## Q4
Agora transforme cada cor escolhida em um padrão de cores (Style) no figma para ficar mais fácil de usar e alterar as cores futuramente. Anexe o print do resultado final.

**Resposta**

Print do resultado final: [Imagem exercicio 4](./Conjunto_de_exercicios/Exercicio_4/img_final.png)

---
## Q5
Construa um local na página de Ideias e especificações, seja usando frames ou não, para inserir seus componentes. Anexe o print e explique por que fez dessa forma.

**Resposta**

Eu separei os componentes das telas finais para evitar edições acidentais no componente original. Em projetos grandes, os componentes ficam até em um arquivo separado. Manter uma "Single Source of Truth" (Fonte Única da Verdade) organiza o fluxo de trabalho.

Link do print: [Imagem exercicio 5](./Conjunto_de_exercicios/Exercicio_5/print.png)

---
## Q6
Explique a importância de criar componentes no desenvolvimento de um protótipo.

**Resposta**

Componentes aplicam o conceito de DRY (Don't Repeat Yourself) do desenvolvimento ao design, colaborando para:
- Reutilização: cria-se um botão uma vez e o replica infinitamente.
- Edição em Massa: alterar o tamanho da fonte ou o arredondamento da borda no "Main Component" atualiza instantaneamente todas as cópias (instâncias) no protótipo.
- Interatividade: pode-se embutir estados (Hover, Pressed, Disabled) dentro do componente, tornando o protótipo muito mais rico sem esforço extra nas telas finais.

---
## Q7
Idealize e construa  todos componentes do seu protótipo, anexe o print do resultado e descreva de forma breve se utilizou alguma ordem para criação e o motivo.

**Resposta**

Ordem de Criação:
- Botões (Ação): Elemento base de interação.
- Inputs (Entrada de Dados): Necessários para as telas de Login.
- Cards (Conteúdo): Elementos compostos para a tela principal.

Motivo: Criar os componentes básicos primeiro garante consistência visual e facilita a montagem das telas complexas (Login e Home) posteriormente, permitindo replicar os elementos sem reescrever o design.

Link do print: [Imagem exercicio 7](./Conjunto_de_exercicios/Exercicio_7/print.png)

---
## Q8
Na página de protótipo crie frames para representar cada página, adicione setas do fluxo das sua telas (exemplo: seta de login para home) e anexe o print desse “molde” inicial das telas.

**Resposta**

Link do print: [Imagem exercicio 8](./Conjunto_de_exercicios/Exercicio_8/print.png)

---
## Q9
Crie todas as suas páginas utilizando seu componentes criados anteriormente. Anexe o print do resultado.

**Resposta**

Link do print: [Imagem exercicio 9](./Conjunto_de_exercicios/Exercicio_9/print.png)

---
## Q10
Crie interação entre as páginas utilizando o menu de protótipo e salve seu projeto em PDF (Clicando no “F” > Files > Export frames to PDF) para anexar incluindo também o link do seu projeto.

**Resposta**

Link do projeto: <https://www.figma.com/proto/YE0jqLuYvpfdSnyY3qzDMW/DevFocus?node-id=1-2&t=6Isr0Ga8IJz4nXjC-1>

Arquivo do projeto: [Projeto exercicio 10](./Conjunto_de_exercicios/Exercicio_10/DevFocus.pdf)

---