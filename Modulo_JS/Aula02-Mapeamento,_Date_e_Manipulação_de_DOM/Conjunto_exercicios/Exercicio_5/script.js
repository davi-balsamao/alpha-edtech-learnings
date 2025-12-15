const container = document.getElementById('container');
const players = document.querySelectorAll('.box');

let activeMovable = null;

players.forEach((player, index) => {
   
    player.style.top = (index * 60) + 'px';
    player.style.left = (index * 60) + 'px';

    player.addEventListener('click', function(event) {
        event.stopPropagation();

        players.forEach(p => p.classList.remove('active'));

        this.classList.add('active');

        activeMovable = this;
    });
});

document.addEventListener('click', function() {
    if (activeMovable) {
        activeMovable.classList.remove('active');
        activeMovable = null; 
    }
});

document.addEventListener('keydown', function(event) {
    if (!activeMovable) return;

    const step = event.shiftKey ? 100 : 10;

    const currentLeft = activeMovable.offsetLeft;
    const currentTop = activeMovable.offsetTop;

    const maxLeft = container.clientWidth - activeMovable.clientWidth;
    const maxTop = container.clientHeight - activeMovable.clientHeight;

    if (event.key === 'ArrowUp') {
        if (currentTop - step < 0) {
            activeMovable.style.top = '0px';
        } else {
            activeMovable.style.top = (currentTop - step) + 'px';
        }
    } 
    else if (event.key === 'ArrowDown') {
        if (currentTop + step > maxTop) {
            activeMovable.style.top = maxTop + 'px';
        } else {
            activeMovable.style.top = (currentTop + step) + 'px';
        }
    } 
    else if (event.key === 'ArrowLeft') {
        if (currentLeft - step < 0) {
            activeMovable.style.left = '0px';
        } else {
            activeMovable.style.left = (currentLeft - step) + 'px';
        }
    } 
    else if (event.key === 'ArrowRight') {
        if (currentLeft + step > maxLeft) {
            activeMovable.style.left = maxLeft + 'px';
        } else {
            activeMovable.style.left = (currentLeft + step) + 'px';
        }
    }
});