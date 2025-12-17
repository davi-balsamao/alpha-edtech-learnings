const btnIniciar = document.getElementById('btnIniciar');
const divMesa = document.getElementById('mesa-cartas');
const divStatus = document.getElementById('status');

const API_BASE = "https://deckofcardsapi.com/api/deck";

btnIniciar.addEventListener('click', async () => {
    divMesa.innerHTML = '';
    divStatus.innerText = 'Embaralhando e disparando requisições simultâneas...';
    btnIniciar.disabled = true;

    try {
        await iniciarProcessoParalelo();
        divStatus.innerText = 'Todas as cartas chegaram!';
    } catch (error) {
        divStatus.innerText = `Erro: ${error.message}`;
        console.error(error);
    } finally {
        btnIniciar.disabled = false;
    }
});

async function iniciarProcessoParalelo() {
    
    const responseDeck = await fetch(`${API_BASE}/new/shuffle/?deck_count=1`);
    
    if (!responseDeck.ok) {
        throw new Error(`Falha ao criar deck: Status ${responseDeck.status}`);
    }
    
    const dadosDeck = await responseDeck.json();
    const deckId = dadosDeck.deck_id;
    
    divStatus.innerText = `Deck ID: ${deckId}. Buscando 5 cartas simultaneamente...`;

    const arrayDeRequisicoes = [];

    for (let i = 0; i < 5; i++) {
        const requisicao = fetch(`${API_BASE}/${deckId}/draw/?count=1`);
        arrayDeRequisicoes.push(requisicao);
    }

   
    const respostas = await Promise.all(arrayDeRequisicoes);

 
    for (const res of respostas) {
        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
    }

    const dadosDasCartas = await Promise.all(respostas.map(res => res.json()));

    dadosDasCartas.forEach(dado => {
        const carta = dado.cards[0];
        adicionarCartaNaTela(carta.image);
    });
}

function adicionarCartaNaTela(imgUrl) {
    const img = document.createElement('img');
    img.src = imgUrl;
    img.className = 'card-img';
    divMesa.appendChild(img);
}