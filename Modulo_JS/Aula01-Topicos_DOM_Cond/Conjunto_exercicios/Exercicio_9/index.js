// 1. Seleção dos Elementos
const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');
const btn = document.getElementById('sortear-btn');
const feedback = document.getElementById('feedback-area');

function sortearNumero() {
    // Limpa feedback anterior
    feedback.className = 'feedback hidden'; 
    feedback.innerText = '';

    // 2. Captura os valores (são Strings vindo do HTML)
    const minStr = minInput.value.trim();
    const maxStr = maxInput.value.trim();

    // 3. VALIDAÇÃO DE ENTRADA (Data Cleaning)
    
    // Check 1: Campos vazios ou não numéricos
    // isNaN() retorna true se NÃO for número. 
    // O JS converte string numérica ("10") automaticamente, mas falha em "10a"
    if (minStr === '' || maxStr === '' || isNaN(minStr) || isNaN(maxStr)) {
        mostrarErro("Erro: Insira apenas valores numéricos válidos.");
        return; // Para a execução
    }

    // Converter para Number para fazer as contas matemáticas
    const min = Number(minStr);
    const max = Number(maxStr);

    // Check 2: São Inteiros?
    // Number.isInteger(10.5) -> false
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        mostrarErro("Erro: Os números devem ser inteiros.");
        return;
    }

    // Check 3: São maiores ou iguais a zero?
    if (min < 0 || max < 0) {
        mostrarErro("Erro: Insira apenas valores maiores ou iguais a zero.");
        return;
    }

    // Check 4: Lógica de Intervalo (Min deve ser menor que Max)
    if (min >= max) {
        mostrarErro("Erro: O valor mínimo deve ser menor que o máximo.");
        return;
    }

    // 4. ALGORITMO DE SORTEIO (A Fórmula)
    // Exemplo: Min 5, Max 10.
    // (10 - 5 + 1) = 6 possibilidades (5, 6, 7, 8, 9, 10)
    // Math.random() * 6 gera algo entre 0 e 5.999...
    // Math.floor() arredonda pra baixo (0, 1, 2, 3, 4, 5)
    // + min (5) -> desloca o intervalo para (5, 6, 7, 8, 9, 10)
    
    const resultado = Math.floor(Math.random() * (max - min + 1)) + min;

    // 5. Exibir Sucesso
    mostrarSucesso(`Resultado: ${resultado}`);
}

// Funções auxiliares para manipular a UI (DRY - Don't Repeat Yourself)
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