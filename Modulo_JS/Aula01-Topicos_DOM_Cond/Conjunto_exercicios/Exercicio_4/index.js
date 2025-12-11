// 1. Seleção dos Elementos
const openModalBtn = document.querySelector("#open-modal-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const modalOverlay = document.querySelector("#modal-overlay");

// 2. Função para alternar a visibilidade
// O método toggle adiciona a classe se não existir, e remove se existir.
const toggleModal = () => {
    modalOverlay.classList.toggle("hide");
};

// 3. Eventos
openModalBtn.addEventListener("click", toggleModal);
closeModalBtn.addEventListener("click", toggleModal);

// [DICA PRO] Fechar ao clicar fora da caixinha (no fundo escuro)
modalOverlay.addEventListener("click", (e) => {
    // Se o alvo do clique for EXATAMENTE o overlay (e não o conteúdo interno)
    if (e.target === modalOverlay) {
        toggleModal();
    }
});