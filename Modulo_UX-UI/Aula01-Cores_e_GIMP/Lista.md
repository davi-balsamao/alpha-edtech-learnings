# Lista de exercícios da Aula 01 - Cores e GIMP do Módulo de UX-UI

## Q1: 
a) O que é UX/UI? Explique e cite diferenças caso exista. 
b) É importante um profissional de TI/desenvolvedor web saber sobre UX/UI? Explique sua resposta.

**Resposta**: 

a) Definições: UX (User Experience) foca na experiência do usuário como um todo. Envolve entender pessoas, sentimentos, emoções e a jornada completa ao interagir com um produto ou serviço. Já UI (User Interface) é responsável pela criação da aparência visual e da interação. Foca no layout, cores, tipografia e elementos visuais. Enquanto o UX projeta a "sensação" e a usabilidade (o esqueleto e o cérebro), o UI projeta a "cara" (a pele e a maquiagem). Apesar de diferentes, eles se complementam e são essenciais juntos.

b) Importância para Desenvolvedores (TI) Sim, é crucial. Um desenvolvedor que entende UX/UI cria produtos não apenas funcionais (código que funciona), mas usáveis e agradáveis. Uma vez que com o avanço da tecnologia, os usuários exigem facilidade de uso e qualidade visual. Um código robusto com uma interface ruim falha no mercado. Além disso, uma boa experiência (UX) aliada a uma boa interface (UI) mantém o usuário na plataforma (ex: loja online).

---
## Q2: 
a) Cite no mínimo cinco estratégias que podem ser usadas para facilitar a escolha de cores para um projeto. 
b) Explique com suas palavras o que é a regra do 60 30 10 e fale sobre sua importância. 
c) Discorra o que é matiz, saturação e brilho. 
d) Fale sobre a importância de gerar uma paleta de cores adequada para um projeto e cite pelo menos uma ferramenta que ajuda na geração da paleta.

**Resposta**:

a) 5 Estratégias de escolhas de cores:
- Psicologia das Cores: Entender que cada cor desperta um sentimento (ex: Azul = Confiança/Tecnologia; Laranja = Energia/Fome).
- Círculo Cromático: Usar a roda de cores para encontrar harmonias (análogas, complementares, triádicas).
- Benchmarking: Analisar paletas usadas por outros profissionais ou concorrentes.
- Geradores de Paletas: Utilizar ferramentas automatizadas que sugerem combinações matemáticas agradáveis.
- Regra de Proporção: Definir a hierarquia de uso das cores (Principal, Secundária, Destaque).

b) É uma técnica de distribuição equilibrada de cores para evitar caos visual.
- 60% (Cor Dominante): Geralmente a cor de fundo ou neutra. Cria a base.
- 30% (Cor Secundária): Geralmente usada em textos ou blocos de conteúdo. Cria contraste com o fundo.
- 10% (Cor de Destaque): Cor chamativa usada estrategicamente para CTAs (Call to Action), como botões "Comprar" ou "Inscrever-se".

c) Definições:
- Matiz (Hue): É a "família" da cor escolhida no círculo cromático (ex: vermelho, violeta). É a cor pura.
- Saturação: A intensidade ou pureza da cor. Alta saturação = cor viva; Baixa saturação = cor acinzentada/lavada.
- Brilho (Value): A quantidade de luz. Varia do preto (0% brilho) ao branco (100% brilho), definindo se a cor é clara ou escura.

d) A importância reside na consistência visual e na transmissão correta da mensagem da marca. Uma ferramenta essencial citada no material é o Coolors.co, que permite gerar, explorar e testar contraste de paletas

---
## Q3: 
Crie uma imagem com cor sólida no fundo de tamanho 10x10cm mantendo a resolução em 300px/in e salve em um diretório (exportar) depois crie outra com o mesmo tamanho e mesma cor mas com resolução 70px/in e salve no mesmo diretório. Depois verifique o tamanho de cada um arquivo gerado, envie o print da comparação de tamanho entre os mesmos e dos principais passos realizados assim como a respectiva descrição de cada passo. Explique o motivo para a diferença de tamanho.

**Resposta**:

As imagens foram criadas com o GIMP, e esses foram os passos:
- Ctrl+N: criar uma nova imagem
- Nas opções de criação da imagem, foi alterado o tamanho pra cm e igual a 10
- Em opções avançadas, foi colocado 300px/in para a primeira imagem
- Depois de ter gerado a imagem, ela foi pintada com shift+B 
- O mesmo processo foi feito para a segunda imagem, apenas alterando a sua resolução

Motivo para a diferença de tamanho: ao verificar o tamanho dos arquivos gerados no explorador de arquivos, a imagem de 300ppi será significativamente maior (em KB/MB) que a de 70ppi. Isso se explica porque em 10cm a 300ppi, o computador armazena muito mais "pontos" (pixels) de informação do que em 10cm a 70ppi. Mais pontos = Mais dados = Arquivo maior.

Link do print: [Comparação das Imagens](./Conjunto_de_exercicios/Exercicio_3/Exercicio_3-Comparacao.jpg)

---
## Q4: 
Com as ferramentas como por exemplo de seleção retangular e preenchimento construa um modelo básico da estrutura de um site, salve e anexe a imagem.

**Resposta**:

Link da imagem: [Imagem do exercicício 4](./Conjunto_de_exercicios/Exercicio_4.png)

---
## Q5: 
Semelhante ao exercício anterior desenhe uma paleta de cores para a construção de um site de sua preferência, salve e anexe o arquivo explicando junto o motivo de cada cor escolhida.

**Resposta**:

- Cor Dominante (60%): #0F172A (Azul Escuro Profundo). Motivo: Reduz cansaço visual, remete a IDEs de programação e seriedade.
- Cor Secundária (30%): #94A3B8 (Cinza Azulado). Motivo: Para textos e bordas, oferece bom contraste sem ser agressivo como o branco puro.
- Cor de Destaque (10%): #3B82F6 (Azul Neon/Elétrico). Motivo: Para botões de ação. O azul remete a tecnologia e confiança.
- Cor de Erro/Alerta (Extra): #EF4444 (Vermelho Suave). Motivo: Feedback de erros no código.

Link do arquivo: [Imagem do exercício 5](./Conjunto_de_exercicios/Exercicio_5.png)

---
## Q6: 
O que é a o Creative Commons? Fale sobre e discorra sobre cada uma de suas licenças

**Resposta**:

É uma organização mundial sem fins lucrativos que padroniza licenças de direito autoral para permitir o compartilhamento e uso criativo de obras.

| Sigla | Nome | O que permite? | 
| :--- | :--- | :--- | 
| CC BY | Atribuição | Pode tudo (comercial, remix), desde que dê crédito ao autor. É a mais flexível. |
| CC BY-SA | Compartilha Igual | Igual à anterior, mas a nova obra deve ter a mesma licença (estilo Wikipedia/Open Source). | 
| CC BY-ND | Sem Derivações | Pode redistribuir (comercial ou não), mas não pode alterar a obra original. | 
| CC BY-NC | Não Comercial | Pode remixar e alterar, mas não pode lucrar com isso. | 
| CC0 | Domínio Público | Livre para qualquer uso, sem necessidade de citar autor. |

---
## Q7: 
Escolha uma imagem de domínio público que não tenha a extensão de arquivo .png, faça uma seleção em uma parte da imagem e delete para remover o fundo depois adicione o canal alpha e faça o mesmo em outra parte da imagem. Caso a imagem já tenha canal alpha escolha outra e repita o processo. Anexe a imagem final e explique por que as duas remoções de fundo tiveram resultados diferentes.

**Resposta**:

A diferença ocorre porque a imagem original não possuía o Canal Alpha ativado. Sem esse canal, o GIMP substitui a área deletada pela cor de fundo padrão (cor sólida) pois a imagem não suporta transparência. Após adicionar manualmente o Canal Alpha à camada, o software passa a aceitar pixels transparentes, permitindo que a remoção do fundo resulte na transparência real (visualizada pelo padrão quadriculado), essencial para salvar arquivos em formato PNG sem fundo.

Link imagem sem transparência: [Imagem 1 exercício 7](./Conjunto_de_exercicios/Exercicio_7/Exercicio_7-imagem_normal.jpg)

Link imagem com transparência: [Imagem 2 exercício 7](./Conjunto_de_exercicios/Exercicio_7/Exercicio_7-imagem_com_alpha.png)

---
## Q8:
Planeje a criação de uma determinada arte (qualquer) onde utilize algum(s) dos filtros presente no GIMP, baixe/copie sua imagem base de um banco de imagens de domínio público, insira sua imagem no GIMP e insira o filtro desejado. Deve ser utilizado mais de uma camada com um propósito justificável e pelo menos uma ferramenta de seleção em alguma parte do processo. Tire e anexe prints das principais partes do processo que julgue importante e descreva os passos realizados explicando por que utilizou determinada ferramenta.

**Resposta**:

Tive bastante dificuldade nesse exercício em relação ao uso do GIMP. Primeiro eu baixei uma imagem de um repositorio online, abri ela no GIMP e em seguida em criei uma nova camada a fim de garantir a edição não-destrutiva. Depois disso, criei um círculo e pintei ele de branco (print 1), e depois eu adicionei o filtro de luz e sombra supernova e o coloquei no círculo criado antes (print 2).

Link print 1: [Imagem 1 exercicio 8](./Conjunto_de_exercicios/Exercicio_8/Exercicio_8-img1.jpg)

Link print 2: [Imagem 2 exercicio 8](./Conjunto_de_exercicios/Exercicio_8/Exercicio_8-img2.jpg)

---
## Q9:
Escolha uma foto qualquer (pode ser de algum banco de imagens de domínio publico u até mesmo sua imagem) e remova o fundo, salve com a extensão de arquivo .png e anexe como resposta. Utilize pelo menos uma ferramenta de seleção e tire prints das principais partes. Explique por que utilizou a ferramenta escolhida e não outra.

**Resposta**:

Escolhi uma imagem de domínio público contendo um personagem central com fundo complexo. Para realizar a remoção do fundo, primeiramente adicionei o Canal Alpha à camada para permitir a transparência. Depois utilizei a ferramenta de Seleção Livre (Laço) porque o objeto principal possuía cores variadas que se misturavam com o fundo, e suas bordas eram irregulares.

Link print 1: [Imagem 1 exercicio 9](./Conjunto_de_exercicios/Exercicio_9/Exercicio_9-img1.png)

Link print 2: [Imagem 2 exercicio 9](./Conjunto_de_exercicios/Exercicio_9/Exercicio_9-img2.png)

---
## Q10:
Realize pelo menos duas montagens qualquer que julgue fazer sentido, com pelo menos duas imagens. Utilize bancos de imagens com domínio público ou imagens própria, sempre priorizando utilizar camadas separadas para cada imagem e parte dela e ferramentas de seleção. Anexe os prints das principais partes e imagem do resultado final.

**Resposta**

Muita dificuldade nesse exercício

Link montagem 1: [Imagem 1 exercício 10](./Conjunto_de_exercicios/Exercicio_10/Exercicio_10-img1.png)

Link montagem 2: [Imagem 2 exercicio 10](./Conjunto_de_exercicios/Exercicio_10/Exercicio_10-img2.png)
