const btnAdd = document.getElementById('btn-add');
const inputTitulo = document.getElementById('titulo');
const inputUrl = document.getElementById('url');
const galeria = document.getElementById('galeria');

btnAdd.addEventListener('click', function() {
    const titulo = inputTitulo.value;
    const url = inputUrl.value;

    if (titulo === '' || url === '') {
        alert('Por favor, preencha o título e o link da imagem!');
        return; 
    }

    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = url;

    const h3 = document.createElement('h3');
    h3.innerText = titulo;

    card.appendChild(img);
    card.appendChild(h3);

    card.addEventListener('click', function() {
        galeria.removeChild(card); 
    });

    galeria.appendChild(card);

    inputTitulo.value = '';
    inputUrl.value = '';
});