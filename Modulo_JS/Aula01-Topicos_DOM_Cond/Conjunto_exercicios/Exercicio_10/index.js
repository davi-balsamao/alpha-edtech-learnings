const input = document.getElementById('phone-input');
const btn = document.getElementById('validate-btn');
const msg = document.getElementById('msg-output');

function validatePhone() {
    const text = input.value;

    // A Expressão Regular (Regex)
    // Regra: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

    // O método .test() retorna true ou false
    if (regex.test(text)) {
        msg.innerText = "Telefone aceito";
        msg.className = "message success"; // Aplica cor verde
    } else {
        msg.innerText = "Não é um telefone válido";
        msg.className = "message error";   // Aplica cor vermelha
    }
}

btn.addEventListener('click', validatePhone);

