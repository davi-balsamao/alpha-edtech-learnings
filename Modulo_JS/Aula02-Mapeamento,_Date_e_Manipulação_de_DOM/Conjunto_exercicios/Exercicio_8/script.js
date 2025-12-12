const ul = document.querySelector("ul");
const btnAdd = document.querySelector("#btn-add");

btnAdd.addEventListener("click", function() {
    let count = 0;

    const li = document.createElement("li");
    li.style.display = "flex"; 

    const buttonMinus = document.createElement("button");
    const buttonPlus = document.createElement("button");
    const span = document.createElement("span");

    buttonMinus.innerText = "-";
    buttonPlus.innerText = "+";
    span.innerText = count; 

    buttonMinus.addEventListener('click', function() {
        count--; 
        span.innerText = count; 
    });

    buttonPlus.addEventListener('click', function() {
        count++; 
        span.innerText = count; 
    });

    li.appendChild(buttonMinus);
    li.appendChild(span);
    li.appendChild(buttonPlus);

    ul.appendChild(li);
});