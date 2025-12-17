function criarCartela(nomeJogador) {
    const numerosDaCartela = [];
    const numerosMarcados = [];
    
    while (numerosDaCartela.length < 10) {
        const num = Math.floor(Math.random() * 75) + 1;
        if (!numerosDaCartela.includes(num)) {
            numerosDaCartela.push(num);
        }
    }
    numerosDaCartela.sort((a, b) => a - b);

    return {
        getNome: () => nomeJogador,
        
        listarNumeros: () => numerosDaCartela,
        
        marcarNumero: (numero) => {
            if (numerosDaCartela.includes(numero) && !numerosMarcados.includes(numero)) {
                numerosMarcados.push(numero);
                return true;
            }
            return false;
        },
        
        verificarVitoria: () => {
            return numerosMarcados.length === numerosDaCartela.length;
        },

        estaMarcado: (numero) => numerosMarcados.includes(numero)
    };
}

function criarSorteador(min, max) {
    const numerosPossiveis = [];
    const numerosSorteados = [];
    
    for (let i = min; i <= max; i++) {
        numerosPossiveis.push(i);
    }

    return {
        sortearNumero: () => {
            if (numerosPossiveis.length === 0) return null;
            
            const indiceAleatorio = Math.floor(Math.random() * numerosPossiveis.length);
            const numeroSorteado = numerosPossiveis.splice(indiceAleatorio, 1)[0];
            
            numerosSorteados.push(numeroSorteado);
            return numeroSorteado;
        },
        
        verificarSeFoiSorteado: (numero) => {
            return numerosSorteados.includes(numero);
        },

        getSorteados: () => [...numerosSorteados] 
    };
}

// --- LÓGICA DO JOGO (DOM E CONTROLE) ---

const btnIniciar = document.getElementById('btnIniciar');
const areaCartelas = document.getElementById('areaCartelas');
const displayNumero = document.getElementById('numeroDestaque');
const listaSorteadosEl = document.getElementById('listaSorteados');
const msgVitoria = document.getElementById('msgVitoria');

const sorteador = criarSorteador(1, 75);

const cartelasEmJogo = [
    criarCartela("Jogador 1"),
    criarCartela("Jogador 2"),
    criarCartela("Jogador 3") 
];

let intervaloSorteio = null;
let jogoFinalizado = false;

function renderizarCartelas() {
    areaCartelas.innerHTML = '';
    
    cartelasEmJogo.forEach((cartela, index) => {
        const divCartela = document.createElement('div');
        divCartela.className = 'cartela';
        
        const titulo = document.createElement('h3');
        titulo.innerText = cartela.getNome();
        divCartela.appendChild(titulo);

        const grid = document.createElement('div');
        grid.className = 'grid-numeros';

        const numeros = cartela.listarNumeros();
        numeros.forEach(num => {
            const divNum = document.createElement('div');
            divNum.className = 'num-cartela';
            divNum.innerText = num;
            divNum.id = `c${index}-n${num}`; 

            divNum.addEventListener('click', () => {
                if (jogoFinalizado) return;

                if (sorteador.verificarSeFoiSorteado(num)) {
                    
                    const marcou = cartela.marcarNumero(num);
                    
                    if (marcou) {
                        divNum.classList.add('marcado');
                        
                        if (cartela.verificarVitoria()) {
                            finalizarJogo(cartela.getNome());
                        }
                    }
                } else {
                    divNum.style.backgroundColor = '#e74c3c';
                    setTimeout(() => divNum.style.backgroundColor = '', 300);
                }
            });

            grid.appendChild(divNum);
        });

        divCartela.appendChild(grid);
        areaCartelas.appendChild(divCartela);
    });
}

btnIniciar.addEventListener('click', () => {
    btnIniciar.disabled = true;
    btnIniciar.innerText = "Sorteio em andamento...";
    
    
    intervaloSorteio = setInterval(() => {
        realizarSorteio();
    }, 5000); 
});

function realizarSorteio() {
    const numero = sorteador.sortearNumero();

    if (numero === null) {
        clearInterval(intervaloSorteio);
        displayNumero.innerText = "FIM";
        return;
    }

    displayNumero.innerText = numero;
    listaSorteadosEl.innerText = sorteador.getSorteados().join(' - ');


}

function finalizarJogo(nomeVencedor) {
    jogoFinalizado = true;
    clearInterval(intervaloSorteio); 
    msgVitoria.innerText = `BINGO! O ${nomeVencedor} venceu! 🎉`;
    msgVitoria.classList.remove('hidden');
    displayNumero.style.background = '#27ae60';
}

renderizarCartelas();