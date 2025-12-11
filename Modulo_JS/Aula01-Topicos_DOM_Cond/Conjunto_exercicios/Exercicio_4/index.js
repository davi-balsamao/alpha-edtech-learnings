// Seleção dos Elementos
const openModalBtn = document.querySelector("#open-modal-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const modalOverlay = document.querySelector("#modal-overlay");

// Função para alternar a visibilidade
// O método toggle adiciona a classe se não existir, e remove se existir.
const toggleModal = () => {
    modalOverlay.classList.toggle("hide");
};

// Eventos
openModalBtn.addEventListener("click", toggleModal);
closeModalBtn.addEventListener("click", toggleModal);

