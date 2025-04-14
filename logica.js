let numeros = []
let operadorValido = ["+","-", "*","/"] 
let resultado = 0
let operador = null
let num1 = 0
let num2 = 0


function ValidarOperador(operadorValido)
{
    if (operadorValido === "+"|| operadorValido === "-" || operadorValido === "*" || operadorValido === "/"){
        return true
    }else{
        alert("Operador inválido!")
        return false
    } 
}


function calcular(num1, num2, operador) {
    switch (operador) {
        case "+":
            resultado = parseFloat(num1) + parseFloat(num2);
            break;
        case "-":
            resultado = parseFloat(num1) - parseFloat(num2);
            break;
        case "*":
            resultado = parseFloat(num1) * parseFloat(num2);
            break;
        case "/":
            if (parseFloat(num2) === 0) {
                alert("Erro: Divisão por zero não é permitida.");
                return null;
            }
            resultado = parseFloat(num1) / parseFloat(num2);
            break;
    }
    return resultado;
}

function ValidarExpessao() {
    for (let op of operadorValido) {
        const expressao = document.getElementById("tela").value;
        //Veficar se tem apenas um operador 
        const partes = expressao.split(op);
        if (partes.length === 2) {
            operador = op;

            //verifica se não tem espaços desnecessarios
            const num1 = partes[0].trim();
            const num2 = partes[1].trim();

            //verifica se o primeiro e segundo numero são validos
            if (!isNaN(num1) && !isNaN(num2)) {
                const resultado = calcular(num1, num2, op);
                if (resultado !== null) {
                    document.getElementById("tela").value = resultado;
                }
                return ;
            } else {
                alert("Digite apenas um operador");
                return limparTela();
            }
        }
    }
     alert("Digite uma expressão válida!");
     return limparTela();
}

function exibirNaTela(valor) {
    document.getElementById("tela").value += valor;
}

window.onload = function eventoTecla(){
    document.getElementById("tela").focus();

    document.addEventListener('keydown', function (event) {
        const tecla = event.key;
        if (tecla =="Enter" || tecla == "=") {
            event.preventDefault(); 
            ValidarExpessao(); 
        }
    });

    document.getElementById("tela").addEventListener("keydown", function (event) {
        const tecla = event.key;
    
        const permitido = ["0","1","2","3","4","5","6","7","8","9", "+", "-", "*", "/", "Backspace", "Enter", "="];
    
        if (!permitido.includes(tecla)) {
            event.preventDefault();
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
}

//botão AC
function limparTela() {
    document.getElementById("tela").value = "";
}
//botão C
function limparUltimo() {
    const tela = document.getElementById("tela");
    tela.value = tela.value.slice(0, -1);
}

