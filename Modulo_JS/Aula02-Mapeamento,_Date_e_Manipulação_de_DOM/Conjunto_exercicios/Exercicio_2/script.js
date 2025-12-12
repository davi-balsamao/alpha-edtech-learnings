const inputNumero = document.getElementById('input-numero');
const btnConverter = document.getElementById('btn-converter');
const resultadoDiv = document.getElementById('resultado');

// Sem Switch
const mapaNumeros = {
    0: "Zero",
    1: "Um",
    2: "Dois",
    3: "Três",
    4: "Quatro",
    5: "Cinco",
    6: "Seis",
    7: "Sete",
    8: "Oito",
    9: "Nove",
    10: "Dez"
}; 

// Com Switch
function converterComSwitch(numero) {
    switch(parseInt(numero)) {
        case 0: return "Zero";
        case 1: return "Um";
        case 2: return "Dois";
        case 3: return "Três";
        case 4: return "Quatro";
        case 5: return "Cinco";
        case 6: return "Seis";
        case 7: return "Sete";
        case 8: return "Oito";
        case 9: return "Nove";
        case 10: return "Dez";
        default: return null;
    }
} 

btnConverter.addEventListener('click', function() {
    const valorDigitado = parseInt(inputNumero.value);
    
   
    if (isNaN(valorDigitado) || valorDigitado < 0 || valorDigitado > 10) {
        mostrarResultado("Por favor, digite um número entre 0 e 10.", true);
        return;
    }

    
    const texto = mapaNumeros[valorDigitado];

    const textoComSwitch = converterComSwitch(valorDigitado);

    mostrarResultado(texto,false);

    // mostrarResultado(textoComSwitch, false);
});

function mostrarResultado(mensagem, isErro) {
    resultadoDiv.innerText = mensagem;
    resultadoDiv.classList.remove('hidden');
    
    if (isErro) {
        resultadoDiv.classList.add('error');
    } else {
        resultadoDiv.classList.remove('error');
    }
}