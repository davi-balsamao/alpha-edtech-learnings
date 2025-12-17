// URLs das APIs
const URL_IBGE_UF = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const URL_IBGE_CIDADES = (ufId) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`;
const URL_INMET_PREVISAO = (geoCodigo) => `https://apiprevmet3.inmet.gov.br/previsao/${geoCodigo}`;

const selectEstado = document.getElementById('selectEstado');
const selectCidade = document.getElementById('selectCidade');
const containerPrevisao = document.getElementById('forecastContainer');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('errorMsg');


function buscarEstados() {
    return new Promise((resolve, reject) => {
        fetch(URL_IBGE_UF)
            .then(response => {
                if (!response.ok) reject("Erro ao buscar estados: " + response.status);
                return response.json();
            })
            .then(data => {
                const estadosOrdenados = data.sort((a, b) => a.nome.localeCompare(b.nome));
                resolve(estadosOrdenados);
            })
            .catch(err => reject(err));
    });
}

function buscarCidades(estadoId) {
    return new Promise((resolve, reject) => {
        fetch(URL_IBGE_CIDADES(estadoId))
            .then(response => {
                if (!response.ok) reject("Erro ao buscar cidades: " + response.status);
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(err => reject(err));
    });
}

function buscarPrevisao(geocodigo) {
    return new Promise((resolve, reject) => {
        fetch(URL_INMET_PREVISAO(geocodigo))
            .then(response => {
                if (!response.ok) reject("Erro ao buscar previsão: " + response.status);
                return response.json();
            })
            .then(data => {
                if (data[geocodigo]) {
                    resolve(data[geocodigo]);
                } else {
                    reject("Dados de previsão não encontrados para este código.");
                }
            })
            .catch(err => reject(err));
    });
}


window.addEventListener('load', () => {
    loadingDiv.classList.remove('hidden');
    
    buscarEstados()
        .then(estados => {
            estados.forEach(uf => {
                const option = document.createElement('option');
                option.value = uf.id; // O ID é necessário para buscar cidades
                option.textContent = `${uf.nome} (${uf.sigla})`;
                selectEstado.appendChild(option);
            });
            loadingDiv.classList.add('hidden');
        })
        .catch(err => mostrarErro(err));
});

selectEstado.addEventListener('change', (e) => {
    const estadoId = e.target.value;
    selectCidade.innerHTML = '<option value="">Carregando...</option>';
    selectCidade.disabled = true;
    containerPrevisao.innerHTML = ''; // Limpa previsões anteriores
    errorDiv.classList.add('hidden');

    if (!estadoId) {
        selectCidade.innerHTML = '<option value="">Selecione um estado primeiro</option>';
        return;
    }

    loadingDiv.classList.remove('hidden');

    buscarCidades(estadoId)
        .then(cidades => {
            selectCidade.innerHTML = '<option value="">Selecione a cidade...</option>';
            cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.id; // O ID do IBGE é o geocódigo para o INMET
                option.textContent = cidade.nome;
                selectCidade.appendChild(option);
            });
            selectCidade.disabled = false;
            loadingDiv.classList.add('hidden');
        })
        .catch(err => mostrarErro(err));
});

selectCidade.addEventListener('change', (e) => {
    const geocodigo = e.target.value;
    containerPrevisao.innerHTML = '';
    
    if (!geocodigo) return;

    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');

    buscarPrevisao(geocodigo)
        .then(dadosPrevisao => {
            renderizarPrevisao(dadosPrevisao);
            loadingDiv.classList.add('hidden');
        })
        .catch(err => mostrarErro(err));
});


function renderizarPrevisao(dados) {
    const datas = Object.keys(dados);
    
    const diasParaExibir = datas.slice(0, 4);

    diasParaExibir.forEach(dataStr => {
        const infoDia = dados[dataStr];
        criarCardDia(dataStr, infoDia);
    });
}

function criarCardDia(dataStr, infoDia) {
    const card = document.createElement('div');
    card.className = 'day-card';

    // Tentar obter dia da semana
    const [dia, mes, ano] = dataStr.split('/');
    const dateObj = new Date(`${ano}-${mes}-${dia}T00:00:00`); // Formato ISO para evitar timezone
    const diaSemana = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' });

    let htmlConteudo = `
        <div class="day-header">
            <h3>${dataStr}</h3>
            <span>${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}</span>
        </div>
    `;

    const periodos = ['manha', 'tarde', 'noite'];
    let temPeriodos = false;

    periodos.forEach(periodo => {
        if (infoDia[periodo]) {
            temPeriodos = true;
            const p = infoDia[periodo];
            htmlConteudo += `
                <div class="periodo">
                    <h4>${periodo}</h4>
                    <div>${getIcone(p.resumo)} ${p.resumo}</div>
                    <div class="temp-range">Min: ${p.temp_min}°C | Max: ${p.temp_max}°C</div>
                </div>
            `;
        }
    });

    if (!temPeriodos) {
         htmlConteudo += `
            <div class="periodo">
                <h4>Geral</h4>
                <div>${getIcone(infoDia.resumo)} ${infoDia.resumo || 'Sem resumo'}</div>
                <div class="temp-range">Min: ${infoDia.temp_min}°C | Max: ${infoDia.temp_max}°C</div>
            </div>
        `;
    }

    card.innerHTML = htmlConteudo;
    containerPrevisao.appendChild(card);
}

function getIcone(resumo) {
    if (!resumo) return '☁️';
    const r = resumo.toLowerCase();
    if (r.includes('claro') || r.includes('sol')) return '☀️';
    if (r.includes('nublado') || r.includes('nuven')) return '☁️';
    if (r.includes('chuva') || r.includes('pancada')) return '🌧️';
    if (r.includes('trovoada') || r.includes('raio')) return '⛈️';
    return '🌤️';
}

function mostrarErro(msg) {
    loadingDiv.classList.add('hidden');
    errorDiv.innerText = msg;
    errorDiv.classList.remove('hidden');
    console.error(msg);
}