const Reminder = document.getElementById("reminderInput");
const DateInput = document.getElementById("dateInput")
const BtnAdd = document.getElementById("btnAdd");
const BtnShowToday = document.getElementById("btnShowToday");


BtnAdd.addEventListener("click", function() { 

    if (DateInput.value === "" || Reminder.value === "") {
        alert("Erro: Lembrete ou data não podem ser vazios");
        return; 
    }

    const chaveData = DateInput.value; 
    const textoLembrete = Reminder.value; 

    let lembreteExistente = localStorage.getItem(chaveData);

    if (lembreteExistente !== null) {
        lembreteExistente += "\n" + textoLembrete;
    } else {
        lembreteExistente = textoLembrete;
    }

    localStorage.setItem(chaveData, lembreteExistente);
    
    alert("Evento Salvo com Sucesso!");
    
    Reminder.value = ""; 
});

BtnShowToday.addEventListener ("click", function () {
    const dataObjeto = new Date(); 
    const ano = dataObjeto.getFullYear();
    const mes = String(dataObjeto.getMonth() + 1).padStart(2, '0');
    const dia = String(dataObjeto.getDate()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    const resultadoBusca = localStorage.getItem(dataFormatada);
    if (localStorage.getItem(dataFormatada) === null) {
        alert("Não há lembretes para hoje");
    }
    else { 
        alert("Lembretes de Hoje:\n\n" + resultadoBusca);
    }
});

