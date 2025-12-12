// O "Banco de Dados" (Objeto Único pedido no enunciado)
const bancoDeProdutos = {}; 

const inputNome = document.getElementById('input-nome');
const inputUrl = document.getElementById('input-url');
const btnCadastrar = document.getElementById('btn-cadastrar');
const selectProdutos = document.getElementById('select-produtos');
const btnExibir = document.getElementById('btn-exibir');
const displayArea = document.getElementById('display-area');
const displayNome = document.getElementById('display-nome');
const displayImg = document.getElementById('display-img');

btnCadastrar.addEventListener('click', function() {
    const nome = inputNome.value.trim();
    const url = inputUrl.value.trim();

    if (nome === "" || url === "") {
        alert("Preencha todos os campos!");
        return;
    }

    bancoDeProdutos[nome] = url;

    const novaOpcao = document.createElement('option');
    novaOpcao.innerText = nome; 
    novaOpcao.value = nome;     
    
    selectProdutos.appendChild(novaOpcao);

    inputNome.value = "";
    inputUrl.value = "";
    
    alert("Produto cadastrado com sucesso!");
});

btnExibir.addEventListener('click', function() {
    const nomeSelecionado = selectProdutos.value;

    if (nomeSelecionado === "") {
        alert("Selecione um produto primeiro!");
        return;
    }

    const urlImagem = bancoDeProdutos[nomeSelecionado];

    displayNome.innerText = nomeSelecionado;
    displayImg.src = urlImagem;

    displayArea.classList.remove('hidden');
});