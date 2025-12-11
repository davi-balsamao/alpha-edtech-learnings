// Estado Inicial
let clickCount = 0;

// Seleção do Elemento
const button = document.getElementById('counter-btn');

// Lógica do Clique
button.addEventListener('click', () => {
    // Incrementa o contador antes de verificar
    clickCount++;

    // Lógica Condicional (Regras de Negócio)
    if (clickCount === 1) {
        // Singular
        button.innerText = "Clicou 1 vez";
    } 
    else if (clickCount <= 10) {
        // Plural até 10
        button.innerText = `Clicou ${clickCount} vezes`;
    } 
    else {
        // Mensagem final após 10 cliques
        button.innerText = "Ainda não enjoou ?";
        button.style.backgroundColor = "#34495e"; 
        button.style.cursor = "not-allowed";
    }
});