// Selecionamos todos os botões que tenham a classe .color-btn
const buttons = document.querySelectorAll('.color-btn');

// Selecionamos a área que vai mudar de cor
const contentArea = document.getElementById('content-area');

// Função que aplica a mudança
function handleColorChange(event) {
    const button = event.target;
    
    // Pegamos os dados que colocamos no HTML (data-color e data-type)
    const color = button.getAttribute('data-color');
    const type = button.getAttribute('data-type');

    if (type === 'bg') {
        // Se for tipo fundo
        contentArea.style.backgroundColor = color;
    } else if (type === 'text') {
        // Se for tipo texto
        contentArea.style.color = color;
    }
}

// Adicionamos o "ouvinte" de evento em cada botão
buttons.forEach((button) => {
    button.addEventListener('click', handleColorChange);
});