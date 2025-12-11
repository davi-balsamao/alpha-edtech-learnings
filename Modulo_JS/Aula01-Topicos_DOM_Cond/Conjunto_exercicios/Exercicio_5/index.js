// 1. Seleção dos Elementos
const pumpBtn = document.getElementById('pump-btn');
const tireBtn = document.getElementById('tire-btn');
const tireIcon = document.getElementById('tire-icon');
const tireLabel = document.getElementById('tire-label');

// 2. Estado Inicial (A "Memória" da aplicação)
let isTireFull = false;

// 3. Função: Ação da Bomba
pumpBtn.addEventListener('click', () => {
    // Muda o estado
    isTireFull = true;

    // Atualiza a Interface (UI) para refletir o novo estado
    tireIcon.innerText = "🔘"; // Troca para pneu cheio
    tireLabel.innerText = "Pneu Cheio";
    
    // Opcional: Feedback visual na bomba
    pumpBtn.style.opacity = "0.5";
    pumpBtn.disabled = true; // Desativa a bomba pois já está cheio
});

// 4. Função: Ação do Pneu
tireBtn.addEventListener('click', () => {
    // Verifica o estado
    if (isTireFull === false) {
        // Se estiver murcho, não faz nada (conforme enunciado)
        console.log("Nada acontece. O pneu está murcho.");
    } else {
        // Se estiver cheio, executa a ação
        alert("VROOM !");
    }
});