let numeros = []
let operadorValido = ["+","-", "*","/"] 
let resultado = 0
let operador = null
let num1 = 0
let num2 = 0



//Se ele digitar um operador diferente de +, -, *, /, o programa deve mostrar um erro
function ValidarOperador(operadorValido)
{
    if (operadorValido === "+"|| operadorValido === "-" || operadorValido === "*" || operadorValido === "/"){
        return true
    }else{
        alert("Operador inválido!")
        return false
    } 
}

//O usuario tem que digitar dois numeros e um operador
//Se ele digitar mais de um operador, o programa deve mostrar um erro
function ValidarExpessao(expressao) {
    for (let op of operadorValido) {

        //Veficar se tem apenas um operador 
        const partes = expressao.split(op);
        if (partes.length === 2) {
            operador = op;

            //verifica se não tem espaços desnecessarios
            const num1 = partes[0].trim();
            const num2 = partes[1].trim();

            //verifica se o primeiro e segundo numero são validos
            if (!isNaN(num1) && !isNaN(num2) && num1 !== "" && num2 !== "") {
                return true;
            } else {
                return false;
            }
        }
    }
    return false;
}

//fazer function para calcular operação
function calcular() {
    switch (operador){
        case "+":
            resultado = num1 + num2
             console.log(resultado)
             console.log(num1)
             console.log(num2)
            break;
        case "-":
            resultado = num1 - num2
            break;
        case "*" :
            resultado = num1 * num2
            break;
        case "/":
            if (num1 === 0 || num2 === 0) {
                console.log("Divisão por zero não é permitida!");
                return;
            }
            resultado = num1 / num2
            break;
    }
    return document.getElementById('tela').value = resultado;
    
}

 



//Fazer exibir os numeros na tela
function exibirNaTela(valor) {
    document.getElementById("tela").value += valor;
}

//fazer function para que o usuario possa usar o = ou o enter para calcular o resultado 


    
window.onload = function eventoTecla(){
    document.getElementById('tela').addEventListener('keydown', function (event) {
        if (event.key === "Enter"|| event.key === "=") {
            calcular();
        }
    });
    
    // document.getElementById("tela").addEventListener("keydown", function (event) {
    //     if (event.key === "C") {
    //         limparUltimo();
    //     }
    // })

    // document.getElementById("tela").addEventListener("keydown", function (event) {
    //     if (event.key === "AC") {
    //         limparTela();
    //     }
    // })

    document.getElementById("tela").focus();
}
 


//fazer function para limpar o input

//botão AC
function limparTela() {
    document.getElementById("tela").value = "";
}


//botão C
function limparUltimo() {
    const tela = document.getElementById("tela");
    tela.value = tela.value.slice(0, -1);
}


// Criar metodo de regra de string para validar o campo de entrada se é string ou numero