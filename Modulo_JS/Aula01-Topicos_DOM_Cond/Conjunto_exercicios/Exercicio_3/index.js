// 1. Selecionei todos os botões de lanche
const snacks = document.querySelectorAll('.snack-item');

function handleSelection(event) {
    const clickedSnack = event.currentTarget;

    // 2. Removi a classe 'selected' de quem estiver com ela agora
    const currentSelected = document.querySelector('.snack-item.selected');
    
    if (currentSelected) {
        currentSelected.classList.remove('selected');
    }

    // 3. Adicionei a classe 'selected' no item clicado
    clickedSnack.classList.add('selected');
}

// 4. Adicionei o ouvinte de evento em cada item
snacks.forEach((snack) => {
    snack.addEventListener('click', handleSelection);
});