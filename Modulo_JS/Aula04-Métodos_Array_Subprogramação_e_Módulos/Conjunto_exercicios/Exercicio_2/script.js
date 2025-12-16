const dataNascimento = document.getElementById("data-nascimento");
const genero = document.getElementById("genero");
const btnVerificar = document.getElementById("btn-verificar");
const resultado = document.getElementById("resultado");
const textoDias = document.getElementById("texto-dias");

btnVerificar.addEventListener("click", function (){
    const person = {
        birthdate: "valor da data",
        gender: "valor do genero",
        daysToDeath: function () {
            if (this.gender === "Masculino") {
                maxAge = 73,1;

            } 
            else if (this.gender === "Feminino"){
                maxAge = 80,1;
            }
            
            const dataFinal = new Date(birthdate);
            dataFinal.setDate(birthdate.getDate() + Math.round(maxAge * 365,5));

            const daysToDeath = (dataFinal - )
        }
    }

});