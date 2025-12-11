// 1. Seleção dos Elementos
const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');
const btn = document.getElementById('sortear-btn');
const feedback = document.getElementById('feedback-area');

function sortearNumero() {
    // Limpa feedback anterior
    feedback.className = 'feedback hidden'; 
    feedback.innerText = '';

    // 2. Captura os valores
    const minStr = minInput.value.trim();
    const maxStr = maxInput.value.trim();

    // 3. VALIDAÇÃO DE ENTRADA
    if (minStr === '' || maxStr === '' || isNaN(minStr) || isNaN(maxStr)) {
        mostrarErro("Erro: Insira apenas valores numéricos válidos.");
        return; // Para a execução
    }

    // Converter para Number para fazer as contas matemáticas
    const min = Number(minStr);
    const max = Number(maxStr);

    // Validação para inteiros
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        mostrarErro("Erro: Os números devem ser inteiros.");
        return;
    }

    // Validação para positivos
    if (min < 0 || max < 0) {
        mostrarErro("Erro: Insira apenas valores maiores ou iguais a zero.");
        return;
    }

    // Validação para mínimo ser menor que o máximo
    if (min >= max) {
        mostrarErro("Erro: O valor mínimo deve ser menor que o máximo.");
        return;
    }

    // Sorteio do número    
    const resultado = Math.floor(Math.random() * (max - min + 1)) + min;

    // Exibir resultado
    mostrarSucesso(`Resultado: ${resultado}`);
}

function mostrarErro(msg) {
    feedback.innerText = msg;
    feedback.className = 'feedback error'; // Aplica estilo vermelho
    feedback.style.display = 'block';
}

function mostrarSucesso(msg) {
    feedback.innerText = msg;
    feedback.className = 'feedback success'; // Aplica estilo verde
    feedback.style.display = 'block';
}

// Event Listeners
btn.addEventListener('click', sortearNumero);