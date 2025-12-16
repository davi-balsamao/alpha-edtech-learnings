const InputNome = document.getElementById("input-nome");
const InputDescricao = document.getElementById("input-descricao");
const InputValor = document.getElementById("input-valor");
const BtnIncluir = document.getElementById("btn-incluir");
const MsgFeedback = document.getElementById("msg-feedback");
const TabelaProdutos = document.getElementById("tabela-produtos");
const ViewId = document.getElementById("view-id");
const ViewNome = document.getElementById("view-nome");
const ViewDescricao = document.getElementById("view-descricao");
const ViewValor = document.getElementById("view-valor");
const BtnFecharView = document.getElementById("btn-fechar-view");
const ModalEditar = document.getElementById("modal-editar");
const EditId = document.getElementById("edit-id");
const EditNome = document.getElementById("edit-nome");
const EditDescricao = document.getElementById("edit-descricao");
const EditValor = document.getElementById("edit-valor");
const BtnSalvarEdit = document.getElementById("btn-salvar-edit");
const BtnCancelarEdit = document.getElementById("btn-cancelar-edit");
const BtnBuscar = document.getElementById("btn-buscar");
const InputBusca = document.getElementById("input-busca");

let produtos = [];

function lerDados() {
    const strDados = localStorage.getItem('estoque-produtos');
    if (strDados !== null) {
        produtos = JSON.parse(strDados);
    }
    atualizarTabela();
};

function salvarDados() {
    localStorage.setItem('estoque-produtos', JSON.stringify(produtos));
};

lerDados(); 

BtnIncluir.addEventListener("click", function () {
    const Nome = InputNome.value;
    const Valor = InputValor.value;
    const Descricao = InputDescricao.value;

    MsgFeedback.innerText = "";
    MsgFeedback.classList.remove("error", "sucess");

    if (Nome === ""){
        MsgFeedback.innerText = "Falha no cadastro do produto! Nome não pode ser vazio";
        MsgFeedback.classList.add("error");
        return;
    }
    if (Valor === ""){
        MsgFeedback.innerText= "Falha no cadastro do produto! Valor não pode ser vazio";
        MsgFeedback.classList.add("error");
        return;
    }
    if (Valor < 0){
        MsgFeedback.innerText = "Falha no cadastro do produto! Valor não pode ser menor que 0";
        MsgFeedback.classList.add("error");
        return;
    }

    let produto = {
        id: Date.now(),
        nome: Nome,
        valor: parseFloat(Valor),
        descricao: Descricao
    }

    produtos.push(produto);
    salvarDados();
    atualizarTabela();

    MsgFeedback.innerText = `Produto ${produto.nome} incluído com sucesso!`;
    MsgFeedback.classList.add("sucess");

    InputNome.value = "";
    InputValor.value = "";
    InputDescricao.value = "";
});

function atualizarTabela(listaProdutos = produtos)  {
    TabelaProdutos.innerHTML = ""; 
    
    for (let i = 0; i < listaProdutos.length; i++) {
        let produto = listaProdutos[i];

        let valorNumerico = Number(produto.valor); 

        let linha = `
            <tr>
                <td class="clickable-name" onclick="mostrarDetalhes(${produto.id})">${produto.nome}</td>
                <td>R$ ${valorNumerico.toFixed(2)}</td> 
                <td class="text-center">
                    <button class="action-btn" onclick="editarProduto(${produto.id})">✏️</button>
                </td>
                <td class="text-center">
                    <button class="action-btn" onclick="apagarProduto(${produto.id})">🗑️</button>
                </td>
            </tr>
        `;

        TabelaProdutos.innerHTML += linha;
    }
}

BtnBuscar.addEventListener("click", function() {
    let termoBusca = InputBusca.value.trim().toLowerCase();

    if (termoBusca === ""){ 
        atualizarTabela(produtos);
        return;
    }
    
    const resultadoBusca = produtos.filter( p => {
        const nomeMinusculo = p.nome.toLowerCase();
        const descMinusculo = p.descricao.toLowerCase();

        return nomeMinusculo.includes(termoBusca) || descMinusculo.includes(termoBusca);
    });

    atualizarTabela(resultadoBusca);

});

function apagarProduto(id) {
    produtos = produtos.filter( p => p.id !== id );
    salvarDados();
    atualizarTabela();    
}
function mostrarDetalhes(id) {
    const produto = produtos.find( p => p.id === id );

    if (produto) { 
        ViewId.innerText = produto.id;
        ViewNome.innerText = produto.nome;
        ViewDescricao.innerText = produto.descricao;
        ViewValor.innerText = `R$ ${Number(produto.valor).toFixed(2)}`;
        
        const modal = document.getElementById("modal-visualizar");
        modal.classList.remove("hidden");
    }
}
BtnFecharView.addEventListener("click", function() {
    const modal = document.getElementById("modal-visualizar");
    modal.classList.add("hidden"); 
});
function editarProduto(id) {
    const produto = produtos.find( p => p.id === id );

    if (produto) {
        EditId.value = produto.id; // Guarda o ID aqui
        EditNome.value = produto.nome;
        EditDescricao.value = produto.descricao;
        EditValor.value = produto.valor;

        ModalEditar.classList.remove("hidden");
    }
}
BtnCancelarEdit.addEventListener("click", function() {
    ModalEditar.classList.add("hidden");
});
BtnSalvarEdit.addEventListener("click", function() {
    const idParaEditar = Number(EditId.value);

    const novoNome = EditNome.value;
    const novaDescricao = EditDescricao.value;
    const novoValor = parseFloat(EditValor.value);

    if (novoNome === "" || novoValor < 0) {
        alert("Dados inválidos para edição!");
        return;
    }

    // Encontrar o índice (posição) do produto no array
    const index = produtos.findIndex( p => p.id === idParaEditar );

    if (index !== -1) { 
        produtos[index].nome = novoNome;
        produtos[index].descricao = novaDescricao;
        produtos[index].valor = novoValor;

        salvarDados();
        atualizarTabela();
        
    }
});

