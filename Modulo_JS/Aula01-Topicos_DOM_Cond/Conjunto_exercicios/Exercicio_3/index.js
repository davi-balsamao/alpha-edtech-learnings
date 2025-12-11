// 1. Selecionamos todos os botões de lanche
const snacks = document.querySelectorAll('.snack-item');

function handleSelection(event) {
    const clickedSnack = event.currentTarget;

    // 2. Removemos a classe 'selected' de quem estiver com ela agora
    // (Poderíamos fazer um loop, mas buscar direto o ativo é mais performático)
    const currentSelected = document.querySelector('.snack-item.selected');
    
    if (currentSelected) {
        currentSelected.classList.remove('selected');
    }

    // 3. Adicionamos a classe 'selected' no item clicado
    clickedSnack.classList.add('selected');
}

// 4. Adicionamos o ouvinte de evento em cada item
snacks.forEach((snack) => {
    snack.addEventListener('click', handleSelection);
});