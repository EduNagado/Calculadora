let numeros = [];
let operadorValido = ["+", "-", "*", "/", "%", "√"];
let resultado = 0;
let operador = null;
let num1 = 0;
let num2 = 0;

// Event listeners
window.onload = function() {
    document.getElementById("tela").focus();

    document.addEventListener('keydown', function(event) {
        const tecla = event.key;
        
        if (tecla === "Enter" || tecla === "=") {
            event.preventDefault();
            ValidarExpessao();
        }
        else if (tecla === "r" ) {
            event.preventDefault();
            inserirRaizQuadrada();
        }
        else if (tecla === "p" ) {
            event.preventDefault();
            calcularPotencia();
        }
        else if (tecla === "Escape") {
            limparTela();
        }
    });

    document.getElementById("tela").addEventListener("keydown", function(event) {
        const tecla = event.key;
        const permitido = ["0","1","2","3","4","5","6","7","8","9", "+", "-", "*", "/", "r", 
                          "Backspace", "Enter", "=", "t", "c", "s", "(", ")", "%", ".", "!", "^"];
        
        if (!permitido.includes(tecla)) {
            event.preventDefault();
        }
    });
};

// Funções básicas da calculadora
function limparTela() {
    document.getElementById("tela").value = "";
}

function limparUltimo() {
    const tela = document.getElementById("tela");
    tela.value = tela.value.slice(0, -1);
}

function exibirNaTela(valor) {
    document.getElementById("tela").value += valor;
}


function inserirRaizQuadrada() {
    const tela = document.getElementById("tela");
    if (!tela.value.endsWith("√(")) {
        tela.value += "√(";
    }
}

function calcularPotencia() {
    const tela = document.getElementById("tela");
    tela.value += "^";
}


function calcular(num1, num2, operador) {
    switch (operador) {
        case "+": return parseFloat(num1) + parseFloat(num2);
        case "-": return parseFloat(num1) - parseFloat(num2);
        case "*": return parseFloat(num1) * parseFloat(num2);
        case "/":
            if (parseFloat(num2) === 0) throw new Error("Divisão por zero");
            return parseFloat(num1) / parseFloat(num2);
        case "%": return (parseFloat(num1) / 100) * parseFloat(num2);
        case "^": return Math.pow(parseFloat(num1), parseFloat(num2));
        default: throw new Error("Operador inválido");
    }
}


function processarOperadores(expressao, operadores) {
    const regex = new RegExp(`(-?\\d+\\.?\\d*)([\\${operadores.join('\\')}])(-?\\d+\\.?\\d*)`);
    
    while (true) {
        const match = expressao.match(regex);
        if (!match) break;
        
        const [fullMatch, num1, op, num2] = match;
        let resultado;
        
        switch (op) {
            case '^': resultado = Math.pow(parseFloat(num1), parseFloat(num2)); break;
            case '*': resultado = parseFloat(num1) * parseFloat(num2); break;
            case '/': 
                if (parseFloat(num2) === 0) throw new Error("Divisão por zero");
                resultado = parseFloat(num1) / parseFloat(num2); 
                break;
            case '+': resultado = parseFloat(num1) + parseFloat(num2); break;
            case '-': resultado = parseFloat(num1) - parseFloat(num2); break;
        }
        
        expressao = expressao.replace(fullMatch, resultado.toString());
    }
    
    return expressao;
}

function calcularExpressaoCompleta(expressao) {

    while (expressao.includes('(')) {
        const inicio = expressao.lastIndexOf('(');
        const fim = encontrarParenteseFechamento(expressao, inicio);
        
        if (fim === -1) throw new Error("Parênteses não fechado");
        
        const dentro = expressao.substring(inicio + 1, fim);
        const resultado = calcularExpressaoCompleta(dentro); 
        
        expressao = expressao.substring(0, inicio) + resultado.toString() + expressao.substring(fim + 1);
    }
    
    // Depois calcula toda a expressão sem parênteses
    return calcularSubExpressao(expressao);
}

function calcularSubExpressao(expressao) {
    // Remove espaços em branco
    expressao = expressao.replace(/\s+/g, '');
    
    // Primeiro processa os parênteses mais internos
    while (expressao.includes('(')) {
        const inicio = expressao.lastIndexOf('(');
        const fim = encontrarParenteseFechamento(expressao, inicio);
        
        if (fim === -1) throw new Error("Parênteses não fechado");
        
        const dentro = expressao.substring(inicio + 1, fim);
        const resultado = calcularSubExpressao(dentro); // Recursão para parênteses aninhados
        
        expressao = expressao.substring(0, inicio) + resultado.toString() + expressao.substring(fim + 1);
    }
    expressao = processarFatorial(expressao);
    
    // Depois potências
    expressao = processarOperadores(expressao, ['^']);
    
    // Em seguida multiplicação/divisão
    expressao = processarOperadores(expressao, ['*', '/', '%']);
    
    // Por último adição/subtração
    expressao = processarOperadores(expressao, ['+', '-']);
    
    const resultado = parseFloat(expressao);
    if (isNaN(resultado)) throw new Error("Expressão inválida");
    
    return resultado;
}


function encontrarParenteseFechamento(expressao, posicaoAbertura) {
    let profundidade = 1;
    for (let i = posicaoAbertura + 1; i < expressao.length; i++) {
        if (expressao[i] === '(') profundidade++;
        if (expressao[i] === ')') profundidade--;
        if (profundidade === 0) return i;
    }
    return -1;
}

function calcularRaizQuadrada(expressao) {
    let novaExpressao = expressao;
    let lastIndex;
    
    while ((lastIndex = novaExpressao.lastIndexOf('√(')) !== -1) {
        const fimParentese = encontrarParenteseFechamento(novaExpressao, lastIndex + 1);
        if (fimParentese === -1) throw new Error("Parênteses não fechado");
        
        const conteudo = novaExpressao.substring(lastIndex + 2, fimParentese);
        const valor = Math.sqrt(calcularSubExpressao(conteudo));
        
        novaExpressao = novaExpressao.substring(0, lastIndex) + valor.toString() + novaExpressao.substring(fimParentese + 1);
    }
    
    return novaExpressao;
}
function calcularFatorial(numero) {
    if (numero < 0) throw new Error("Fatorial de número negativo não existe");
    if (numero % 1 !== 0) throw new Error("Fatorial só funciona com inteiros");
    
    let resultado = 1;
    for (let i = 2; i <= numero; i++) {
        resultado *= i;
    }
    return resultado;
}

function processarFatorial(expressao) {
    const regex = /(\d+)!/g;
    
    while (expressao.match(regex)) {
        expressao = expressao.replace(regex, function(match, num) {
            return calcularFatorial(parseInt(num));
        });
    }
    
    return expressao;
}

function ValidarExpessao() {
    const tela = document.getElementById("tela");
    let expressao = tela.value.trim();

    try {
        // Substitui símbolos visuais
        expressao = expressao.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        
        // Processa raízes quadradas primeiro
        expressao = calcularRaizQuadrada(expressao);
        
        // Agora calcula TODA a expressão, não apenas subexpressões
        const resultado = calcularExpressaoCompleta(expressao);
        tela.value = resultado;
    } catch (error) {
        alert("Erro: " + error.message);
        limparTela();
    }
}
