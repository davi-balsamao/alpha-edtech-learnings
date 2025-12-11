// 1. Seleção dos Elementos
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Função Principal
function handleAddTask() {
    // 2. Captura o valor cru
    const rawValue = taskInput.value;

    // 3. Processamento de Dados (Requisito da Questão)
    // .trim() -> Remove espaços do início e fim ("  oi  " vira "oi")
    // .toLowerCase() -> Converte tudo para minúsculo
    const cleanValue = rawValue.trim().toLowerCase();

    // 4. Validação: Se estiver vazio após o trim, não faz nada
    if (cleanValue === "") {
        alert("Por favor, digite uma tarefa válida.");
        return; 
    }

    // 5. Criação do Elemento HTML (DOM Manipulation)
    const newItem = document.createElement('li');
    newItem.innerText = cleanValue; // Insere o texto processado

    // 6. Inserção na tela
    taskList.appendChild(newItem);

    // 7. Limpeza (UX)
    taskInput.value = ""; // Limpa o campo
    taskInput.focus();    // Devolve o cursor para o campo
}

// Evento de Clique
addBtn.addEventListener('click', handleAddTask);

// [Bônus] Adicionar ao apertar ENTER (Padrão de UX)
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleAddTask();
    }
});