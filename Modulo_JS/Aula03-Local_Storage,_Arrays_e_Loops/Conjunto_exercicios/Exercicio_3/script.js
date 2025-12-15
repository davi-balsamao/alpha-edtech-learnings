const Inicio = document.getElementById("inicio");
const Fim = document.getElementById("fim");
const BtnListar = document.getElementById("btn-listar");
const Resultado = document.getElementById("resultado");

BtnListar.addEventListener("click", function () {
    Resultado.innerHTML = "";
    Resultado.className = "";

    const valorInicio = Inicio.value;
    const valorFim = Fim.value;

    if (valorInicio === "" || valorFim === "") {
        Resultado.innerHTML = '<p class="erro">Por favor, preencha os dois campos.</p>';
        return; 
    }

    let NumInicio = Number(valorInicio);
    let NumFim = Number(valorFim);

    if (!Number.isInteger(NumInicio) || !Number.isInteger(NumFim)) {
        Resultado.innerHTML = '<p class="erro">Por favor, digite apenas números inteiros.</p>';
        return;
    }
    if (NumInicio >= NumFim) {
        Resultado.innerHTML = '<p class="erro">Por favor, o Inicio menor que o Fim.</p>';
        return;
    }

    const listaUl = document.createElement("ul");
    for(let contador = NumInicio; contador < NumFim; contador++){
        const itemLi = document.createElement("li");
        itemLi.textContent = contador;
        listaUl.appendChild(itemLi);
    }
    Resultado.appendChild(listaUl);
});
