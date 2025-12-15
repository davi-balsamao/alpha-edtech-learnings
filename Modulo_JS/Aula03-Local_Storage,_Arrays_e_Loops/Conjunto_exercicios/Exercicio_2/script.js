// --- VARIÁVEIS GLOBAIS ---
const RecipeList = document.getElementById("recipeList");
const EmptyState = document.getElementById("emptyState");
const EditForm = document.getElementById("editForm");
const BtnDelete = document.getElementById("btnDelete");
const BtnAdd = document.getElementById("btnAdd");
const TitleInput = document.getElementById("titleInput");
const IngredientsInput = document.getElementById("ingredientsInput");
const StepsInput = document.getElementById("stepsInput");

let receitas = [];
let indiceAtual = null;

function atualizarLista() {
    RecipeList.innerHTML = ""; 

    receitas.forEach(function(receita, index) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = receita.Titulo;
        card.dataset.index = index;
        if (index === indiceAtual) {
            card.classList.add('active');
        }

        card.addEventListener("click", function() {
            indiceAtual = index; 
            
            TitleInput.value = receita.Titulo;
            IngredientsInput.value = receita.Ingredientes;
            StepsInput.value = receita.Preparo;

            EmptyState.classList.add("hidden");
            EditForm.classList.remove("hidden");

            atualizarLista();
        });
        
        RecipeList.appendChild(card);
    });
}

BtnAdd.addEventListener("click", function () {
    let obj = {
        Titulo: "Sem Título",
        Ingredientes: "",
        Preparo: ""
    };

    receitas.push(obj);
    console.log(receitas);
    
    atualizarLista(); 
});

TitleInput.addEventListener("input", function() {
    if (indiceAtual === null) return;

    receitas[indiceAtual].Titulo = TitleInput.value;
    
    atualizarLista(); 
});

IngredientsInput.addEventListener("input", function() {
    if (indiceAtual === null) return;
    receitas[indiceAtual].Ingredientes = IngredientsInput.value;
});

StepsInput.addEventListener("input", function() {
    if (indiceAtual === null) return;
    receitas[indiceAtual].Preparo = StepsInput.value;
});

BtnDelete.addEventListener("click", function() {
    if (indiceAtual === null) return;
    else {
        receitas.splice(indiceAtual, 1);
        indiceAtual = null;
        EditForm.classList.add("hidden");
        EmptyState.classList.remove("hidden");
        atualizarLista();
    }
});