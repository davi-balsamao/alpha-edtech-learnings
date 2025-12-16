// --- CÓDIGO FORNECIDO PELO ENUNCIADO (Não altere essa parte) ---
document.querySelector("button").addEventListener("click", function () {
    const name = document.getElementById("name-input").value;
    const phone = document.getElementById("telephone-input").value;

    if (!nameIsValid(name) || !phoneIsValid(phone)) {
        showError();
    } else {
        showSuccess();
    }
});
// ---------------------------------------------------------------



const feedbackBox = document.getElementById("msg-feedback");

function nameIsValid(name) {
    name = name.trim();
    return name.length >= 3;
}

function phoneIsValid(phone) {
    phone = phone.trim();
    return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);

}

function showError() {
    feedbackBox.innerText = "Dados inválidos";
    feedbackBox.classList.remove("hidden");
    feedbackBox.classList.remove("success");
    feedbackBox.classList.add("error");
}

function showSuccess() {
    feedbackBox.innerText = "Cadastro bem sucedido";
    feedbackBox.classList.remove("hidden");
    feedbackBox.classList.remove("error");
    feedbackBox.classList.add("success");
}