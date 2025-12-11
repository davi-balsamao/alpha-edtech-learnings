// 1. Estado Inicial
let clickCount = 0;

// 2. Seleção do Elemento
const button = document.getElementById('counter-btn');

// 3. Lógica do Clique
button.addEventListener('click', () => {
    // Incrementa o contador antes de verificar
    clickCount++;

    // Lógica Condicional (Regras de Negócio)
    if (clickCount === 1) {
        // Singular
        button.innerText = "Clicou 1 vez";
    } 
    else if (clickCount <= 10) {
        // Plural (Template String é útil aqui)
        button.innerText = `Clicou ${clickCount} vezes`;
    } 
    else {
        // Mensagem final após 10 cliques
        button.innerText = "Ainda não enjoou ?";
        
        // [Opcional] Mudar a cor para indicar "fim de jogo"
        button.style.backgroundColor = "#34495e"; 
        button.style.cursor = "not-allowed";
    }
});