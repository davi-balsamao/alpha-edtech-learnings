const btnIniciar = document.getElementById('btnIniciar');
const divMesa = document.getElementById('mesa-cartas');
const divStatus = document.getElementById('status');

const API_BASE = "https://deckofcardsapi.com/api/deck";

btnIniciar.addEventListener('click', async () => {
    divMesa.innerHTML = '';
    divStatus.innerText = 'Embaralhando novo deck...';
    btnIniciar.disabled = true;

    try {
        await iniciarProcessoCartas();
        divStatus.innerText = 'Processo finalizado com sucesso!';
    } catch (error) {
        divStatus.innerText = `Erro: ${error.message}`;
        console.error(error);
    } finally {
        btnIniciar.disabled = false;
    }
});

async function iniciarProcessoCartas() {
    // Pede um deck novo ('new') e já embaralhado ('shuffle')
    const responseDeck = await fetch(`${API_BASE}/new/shuffle/?deck_count=1`);
    
    if (!responseDeck.ok) {
        throw new Error(`Falha ao criar deck: Status ${responseDeck.status}`);
    }
    
    const dadosDeck = await responseDeck.json();
    const deckId = dadosDeck.deck_id;

    divStatus.innerText = `Deck ID: ${deckId}. Iniciando saques...`;
    // For com await -> resultado em Fila -> roda 1, espera, roda 2
    // forEach ou map com await -> resultado em Paralelo -> todos de uma vez
    for (let i = 1; i <= 5; i++) { 
        
        await new Promise(r => setTimeout(r, 500)); 
        
        divStatus.innerText = `Sacando carta ${i} de 5...`;

        await sacarUmaCarta(deckId);
    }
}


async function sacarUmaCarta(deckId) {
    // Monta a URL usando o ID do deck gerado 
    const url = `${API_BASE}/${deckId}/draw/?count=1`;
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erro ao sacar carta. Status: ${response.status}`);
    }

    const data = await response.json();

    const carta = data.cards[0];
    adicionarCartaNaTela(carta.image);
}

function adicionarCartaNaTela(imgUrl) {
    const img = document.createElement('img');
    img.src = imgUrl;
    img.className = 'card-img';
    divMesa.appendChild(img);
}