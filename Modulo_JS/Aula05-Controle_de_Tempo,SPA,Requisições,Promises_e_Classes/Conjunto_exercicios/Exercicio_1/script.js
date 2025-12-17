const btnConsultar = document.getElementById('btnConsultar');
const btnExibirMapa = document.getElementById('btnExibirMapa');
const cepInput = document.getElementById('cepInput');
const divResultado = document.getElementById('resultado');
const divErro = document.getElementById('mensagemErro');
const divMapa = document.getElementById('mapaContainer');
const iframeMapa = document.getElementById('iframeMapa');

let currentLat = '';
let currentLon = '';

btnConsultar.addEventListener('click', consultarCEP);
btnExibirMapa.addEventListener('click', exibirMapa);

async function consultarCEP() {
    const cep = cepInput.value.replace(/\D/g, ''); // /\D/g -> D corresponde a Dígito (0-9) e g é global (string inteira)

    divErro.classList.add('hidden');
    divResultado.classList.add('hidden');
    divMapa.classList.add('hidden');
    divErro.innerText = '';

    if (cep.length !== 8) {
        mostrarErro('CEP inválido! Digite 8 números.');
        return;
    }

    document.body.classList.add('esperando');

    try {
        const response = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
        
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        document.getElementById('resEndereco').innerText = data.address || data.address_name || 'Endereço não encontrado';
        document.getElementById('resBairro').innerText = data.district || 'N/A';
        document.getElementById('resCidade').innerText = data.city;
        document.getElementById('resEstado').innerText = data.state;
        
        if (data.lat && data.lng) {
            currentLat = data.lat;
            currentLon = data.lng;
            
            document.getElementById('resLat').innerText = currentLat;
            document.getElementById('resLon').innerText = currentLon;
            
            divResultado.classList.remove('hidden');
        } else {
                       
            document.getElementById('resLat').innerText = 'Não disponível';
            document.getElementById('resLon').innerText = 'Não disponível';
            
            divResultado.classList.remove('hidden');
            alert('A API não retornou coordenadas exatas para este CEP.');
        }

    } catch (error) {
        mostrarErro('CEP inválido ou erro na consulta!');
        console.error(error);
    } finally {
        document.body.classList.remove('esperando');
    }
}

function exibirMapa() {
    if (!currentLat || !currentLon) {
        alert('Coordenadas não disponíveis.');
        return;
    }

    const mapUrl = `https://maps.google.com/maps?q=${currentLat},${currentLon}&hl=pt&z=14&output=embed`;
    
    iframeMapa.src = mapUrl;
    divMapa.classList.remove('hidden');
}

function mostrarErro(msg) {
    divErro.innerText = msg;
    divErro.classList.remove('hidden');
}