const container = document.getElementById('container');
const players = document.querySelectorAll('.box');

let activeMovable = null; // Quem está sendo controlado
let isDragging = false;   // Se estamos no meio de um arrasto
let offsetX = 0;          // Distância do mouse até a borda esquerda do quadrado
let offsetY = 0;          // Distância do mouse até a borda superior do quadrado

players.forEach((player, index) => {
    player.style.top = (index * 60) + 'px';
    player.style.left = (index * 60) + 'px';

    player.addEventListener('mousedown', function(e) {
        players.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        activeMovable = this;

        isDragging = true;

        offsetX = e.clientX - this.getBoundingClientRect().left; // getBoundingClientRect -> containing information about the size of an element and its position relative to the viewport
        offsetY = e.clientY - this.getBoundingClientRect().top;
        
        this.style.cursor = 'grabbing';
    });
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging || !activeMovable) return;

    e.preventDefault(); // Evita selecionar texto enquanto arrasta

    const containerRect = container.getBoundingClientRect();


    // Posição Mouse - Posição Container - Onde segurei no quadrado
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    const maxLeft = container.clientWidth - activeMovable.clientWidth;
    const maxTop = container.clientHeight - activeMovable.clientHeight;

    if (newLeft < 0) newLeft = 0;
    if (newLeft > maxLeft) newLeft = maxLeft;

    if (newTop < 0) newTop = 0;
    if (newTop > maxTop) newTop = maxTop;

    activeMovable.style.left = newLeft + 'px';
    activeMovable.style.top = newTop + 'px';
});

document.addEventListener('mouseup', function() {
    isDragging = false;
    
    if (activeMovable) {
        activeMovable.style.cursor = 'pointer';
    }
});

document.addEventListener('click', function() {
    if (activeMovable) {
        activeMovable.classList.remove('active');
        activeMovable = null; 
    }
});