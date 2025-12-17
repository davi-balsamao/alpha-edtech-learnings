const URL_IBGE_UF = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const URL_IBGE_CIDADES = (ufId) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`;

const URL_INMET_PROXY = (geoCodigo) => `https://api.allorigins.win/get?url=${encodeURIComponent('https://apiprevmet3.inmet.gov.br/previsao/' + geoCodigo)}`;

const selectEstado = document.getElementById('selectEstado');
const selectCidade = document.getElementById('selectCidade');
const containerPrevisao = document.getElementById('forecastContainer');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('errorMsg');

const DADOS_SIMULADOS = {
    "generico": {
        "18/12/2025": {
            "manha": { "resumo": "Claro", "temp_min": 20, "temp_max": 28 },
            "tarde": { "resumo": "Parcialmente Nublado", "temp_min": 22, "temp_max": 30 },
            "noite": { "resumo": "Chuva Isolada", "temp_min": 19, "temp_max": 24 }
        },
        "19/12/2025": {
            "manha": { "resumo": "Nublado", "temp_min": 19, "temp_max": 25 },
            "tarde": { "resumo": "Pancadas de Chuva", "temp_min": 21, "temp_max": 26 },
            "noite": { "resumo": "Encoberto", "temp_min": 18, "temp_max": 22 }
        },
        "20/12/2025": {
            "resumo": "Tempestade", "temp_min": 18, "temp_max": 23
        },
        "21/12/2025": {
            "manha": { "resumo": "Sol", "temp_min": 17, "temp_max": 29 },
            "tarde": { "resumo": "Sol com nuvens", "temp_min": 25, "temp_max": 31 },
            "noite": { "resumo": "Claro", "temp_min": 20, "temp_max": 25 }
        }
    }
};


function buscarEstados() {
    return new Promise((resolve, reject) => {
        fetch(URL_IBGE_UF)
            .then(res => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then(data => {
                resolve(data.sort((a, b) => a.nome.localeCompare(b.nome)));
            })
            .catch(err => reject("Erro IBGE Estados: " + err));
    });
}

function buscarCidades(estadoId) {
    return new Promise((resolve, reject) => {
        fetch(URL_IBGE_CIDADES(estadoId))
            .then(res => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then(data => resolve(data))
            .catch(err => reject("Erro IBGE Cidades: " + err));
    });
}

function buscarPrevisao(geocodigo) {
    return new Promise((resolve, reject) => {
        
        fetch(URL_INMET_PROXY(geocodigo))
            .then(response => {
                if (!response.ok) throw new Error("Proxy Error");
                return response.json();
            })
            .then(data => {
                const dadosInmet = JSON.parse(data.contents);
                if (dadosInmet[geocodigo]) {
                    resolve(dadosInmet[geocodigo]); 
                    throw new Error("Cidade não encontrada no INMET");
                }
            })
            .catch(err => {
                console.warn("API falhou/bloqueou. Usando dados simulados para demonstração.");
                
                errorDiv.innerText = "Aviso: API do INMET instável. Exibindo dados de demonstração.";
                errorDiv.classList.remove('hidden');
                
                setTimeout(() => {
                    resolve(DADOS_SIMULADOS["generico"]); 
                }, 500);
            });
    });
}


window.addEventListener('load', () => {
    loadingDiv.classList.remove('hidden');
    buscarEstados()
        .then(estados => {
            estados.forEach(uf => {
                const opt = document.createElement('option');
                opt.value = uf.id;
                opt.textContent = uf.nome;
                selectEstado.appendChild(opt);
            });
            loadingDiv.classList.add('hidden');
        })
        .catch(err => mostrarErro(err));
});

selectEstado.addEventListener('change', (e) => {
    const id = e.target.value;
    selectCidade.innerHTML = '<option>Carregando...</option>';
    selectCidade.disabled = true;
    containerPrevisao.innerHTML = '';
    errorDiv.classList.add('hidden');

    if (!id) return;

    loadingDiv.classList.remove('hidden');
    buscarCidades(id)
        .then(cidades => {
            selectCidade.innerHTML = '<option value="">Selecione...</option>';
            cidades.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.nome;
                selectCidade.appendChild(opt);
            });
            selectCidade.disabled = false;
            loadingDiv.classList.add('hidden');
        })
        .catch(err => mostrarErro(err));
});

selectCidade.addEventListener('change', (e) => {
    const geo = e.target.value;
    if (!geo) return;

    containerPrevisao.innerHTML = '';
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');

    buscarPrevisao(geo)
        .then(dados => {
            renderizarPrevisao(dados);
            loadingDiv.classList.add('hidden');
        })
        .catch(err => mostrarErro(err));
});


function renderizarPrevisao(dados) {
    const dias = Object.keys(dados).slice(0, 4);
    dias.forEach(dia => criarCard(dia, dados[dia]));
}

function criarCard(data, info) {
    const div = document.createElement('div');
    div.className = 'day-card';
    
    let html = `<div class="day-header"><h3>${data}</h3></div>`;

    const periodos = ['manha', 'tarde', 'noite'];
    let detalhado = false;

    periodos.forEach(p => {
        if (info[p]) {
            detalhado = true;
            html += `
                <div class="periodo">
                    <h4>${p}</h4>
                    <div>${getIcone(info[p].resumo)} ${info[p].resumo}</div>
                    <div class="temp-range">${info[p].temp_min}°C - ${info[p].temp_max}°C</div>
                </div>`;
        }
    });

    if (!detalhado) {
        html += `
            <div class="periodo">
                <h4>Geral</h4>
                <div>${getIcone(info.resumo)} ${info.resumo}</div>
                <div class="temp-range">${info.temp_min}°C - ${info.temp_max}°C</div>
            </div>`;
    }

    div.innerHTML = html;
    containerPrevisao.appendChild(div);
}

function getIcone(txt) {
    if (!txt) return '☁️';
    txt = txt.toLowerCase();
    if (txt.includes('sol') || txt.includes('claro')) return '☀️';
    if (txt.includes('chuva')) return '🌧️';
    if (txt.includes('nublado')) return '☁️';
    return '🌤️';
}

function mostrarErro(msg) {
    loadingDiv.classList.add('hidden');
    errorDiv.innerText = msg;
    errorDiv.classList.remove('hidden');
}