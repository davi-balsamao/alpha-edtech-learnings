const inputElement = document.querySelector("input");
const button = document.querySelector("button");

function printText() {
    const text = inputElement.value; // Captura o valor no clique
    alert(text);
}

button.addEventListener("click", printText);