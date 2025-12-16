const dataNascimento = document.getElementById("data-nascimento");
const genero = document.getElementById("genero");
const btnVerificar = document.getElementById("btn-verificar");
const resultado = document.getElementById("resultado");
const textoDias = document.getElementById("texto-dias");

const UM_DIA_EM_MS = 1000 * 60 * 60 * 24; 
// 1000ms * 60s * 60m * 24h = 86.400.000 ms

btnVerificar.addEventListener("click", function () {
    
    // 1. Validação básica (Opcional, mas recomendada)
    if(!dataNascimento.value || !genero.value) {
        alert("Preencha todos os campos!");
        return;
    }

    const person = {
        birthdate: dataNascimento.value, 
        gender: genero.value, 
        
        daysToDeath: function () {
            let maxAge = 0;

            if (this.gender === "M") {
                maxAge = 73.1; 
            } else if (this.gender === "F") {
                maxAge = 80.1;
            }

            const nascimento = new Date(this.birthdate);
            
            const dataMorte = new Date(this.birthdate);
            
            
            const anosInteiros = Math.floor(maxAge);
            const restoAnos = maxAge - anosInteiros; 
            
            dataMorte.setFullYear(nascimento.getFullYear() + anosInteiros);
            const diasRestantesDoDecimal = restoAnos * 365; 
            dataMorte.setDate(dataMorte.getDate() + diasRestantesDoDecimal);

            const hoje = new Date();
            
            //  o JS retorna em milissegundos
            const diferencaEmMs = dataMorte - hoje;

            // Convertendo de volta para dias
            // Math.ceil = teto
            const diasRestantes = Math.ceil(diferencaEmMs / UM_DIA_EM_MS);

            return diasRestantes;
        }
    };

    const dias = person.daysToDeath();

    if (dias < 0) {
        textoDias.innerText = "Você já viveu mais que a expectativa";
    } else {
        textoDias.innerText = `${dias} dias`;
    }
    
    resultado.classList.remove("hidden");
});