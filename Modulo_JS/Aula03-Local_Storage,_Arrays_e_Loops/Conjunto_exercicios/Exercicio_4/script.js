const EntradaNomes = document.getElementById("entrada-nomes");
const BtnListar = document.getElementById("btn-listar");
const ContainerTabela = document.getElementById("container-tabela");

BtnListar.addEventListener("click", function () {
    const Nome = EntradaNomes.value;
    if (Nome === "") return;

    const listaNomes = Nome.split(',');

    ContainerTabela.innerHTML = "";

    const tabela = document.createElement("table");
    const linhaHeader = document.createElement("tr");
    
    const thIndice = document.createElement("th");
    thIndice.textContent = "Índice";

    const thNome = document.createElement("th");
    thNome.textContent = "Nome";

    linhaHeader.appendChild(thIndice);
    linhaHeader.appendChild(thNome);
    tabela.appendChild(linhaHeader)

    listaNomes.forEach(function(nome, i){
        let nomeLimpo = nome.trim();

        if (nomeLimpo === "") return

        const linhaNome = document.createElement("tr");
        const colunaIndice = document.createElement("td");
        colunaIndice.textContent = i;

        const colunaNome = document.createElement("td");
        colunaNome.textContent = nomeLimpo;

        linhaNome.appendChild(colunaIndice);
        linhaNome.appendChild(colunaNome);

        tabela.appendChild(linhaNome);
    });

    ContainerTabela.appendChild(tabela);



});