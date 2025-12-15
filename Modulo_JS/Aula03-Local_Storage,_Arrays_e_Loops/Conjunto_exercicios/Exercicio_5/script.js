const BtnSortear = document.getElementById("btn-sortear");
const BtnChutar = document.getElementById("btn-chutar");
const StatusSorteio = document.getElementById("status-sorteio");
const MensagemResultado = document.getElementById("mensagem-resultado");
const InputChute = document.getElementById("input-chute");

let numerosSorteados = [];

BtnSortear.addEventListener("click", function() {
    numerosSorteados = [];
    while  (numerosSorteados.length < 6){
        let numeroAleatorio = Math.floor(Math.random() * 30) + 1;

        if (!numerosSorteados.includes(numeroAleatorio)){
            numerosSorteados.push(numeroAleatorio);
        }

        console.log(numerosSorteados);
        StatusSorteio.textContent = "Números sorteados!"

        MensagemResultado.textContent = "";
        MensagemResultado.className = "";
    }

});

BtnChutar.addEventListener("click", function () {
    if (InputChute.value === "" || isNaN(Number(InputChute.value))){
        MensagemResultado.innerHTML = '<p class="erro">Voce precisa chutar um numero</p>'
        return;
    }

    chute = Number(InputChute.value);
    
    if (numerosSorteados.length === 0) {
        MensagemResultado.innerHTML = '<p class="erro">Voce precisa sortear primeiro</p>'
        return;
    }

    if (numerosSorteados.includes(chute)){
        MensagemResultado.innerHTML = '<p class="sucesso">Voce acertou</p>'
    } 
    else {
        MensagemResultado.innerHTML = '<p class="erro">Voce errou, tente novamente</p>'
    }


});