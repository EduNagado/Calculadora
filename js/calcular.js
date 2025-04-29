const tela = document.getElementById("tela");
const operadores = ["+", "-", "*", "/", "%", "^"];

const limparTela = () => tela.value = "";
const limparUltimo = () => tela.value = tela.value.slice(0, -1);
const exibirNaTela = (valor) => tela.value += valor;

const calcular = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => b === 0 ? (() => { throw new Error("Divisão por zero") })() : a / b,
    "%": (a, b) => (a / 100) * b,
    "^": (a, b) => Math.pow(a, b),
    "√": (a) => Math.sqrt(a),
    "sin": (a) => Math.sin(a * Math.PI / 180),
    "cos": (a) => Math.cos(a * Math.PI / 180),
    "tan": (a) => Math.abs(Math.cos(a * Math.PI / 180)) < 1e-10 ? 
        (() => { throw new Error("Tangente indefinida") })() : Math.tan(a * Math.PI / 180),
    "!": (a) => a % 1 !== 0 || a < 0 ? 
        (() => { throw new Error("Fatorial inválido") })() : 
        Array.from({length: a}, (_, i) => i + 1).reduce((acc, val) => acc * val, 1)
};

// Funções de inserção simplificadas
const inserirFuncao = (fn) => exibirNaTela(`${fn}(`);
const inserirRaizQuadrada = () => inserirFuncao("√");
const inserirSeno = () => inserirFuncao("sin");
const inserirCosseno = () => inserirFuncao("cos");
const inserirTangente = () => inserirFuncao("tan");
const calcularPotencia = () => exibirNaTela("^");

// Validação de parênteses
const validarParenteses = (expr) => {
    let balance = 0;
    for (const char of expr) {
        if (char === '(') balance++;
        if (char === ')') balance--;
        if (balance < 0) return false;
    }
    return balance === 0;
};

// Processamento de expressões
const processarExpressao = (expr) => {
    // Substitui símbolos visuais por operadores matemáticos
    expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    
    // Processa funções especiais (sin, cos, tan, √, !)
    expr = expr.replace(/(sin|cos|tan|√)\(([^)]+)\)/g, (_, fn, inner) => 
        calcular[fn](processarSubExpressao(inner)));
    
    expr = expr.replace(/(\d+)!/g, (_, num) => calcular["!"](parseInt(num)));
    
    // Processa parênteses
    while (expr.includes('(')) {
        expr = expr.replace(/\(([^()]+)\)/g, (_, inner) => 
            processarSubExpressao(inner));
    }
    
    return processarSubExpressao(expr);
};

const processarSubExpressao = (expr) => {
    // Ordem de precedência
    const operacoes = [
        { regex: /(-?\d+\.?\d*)\^(-?\d+\.?\d*)/g, fn: calcular["^"] },
        { regex: /(-?\d+\.?\d*)([*/%])(-?\d+\.?\d*)/g },
        { regex: /(-?\d+\.?\d*)([+-])(-?\d+\.?\d*)/g }
    ];
    
    expr = expr.replace(/\s+/g, '');
    
    operacoes.forEach(({regex, fn}) => {
        while (regex.test(expr)) {
            expr = expr.replace(regex, (_, a, op, b) => 
                fn ? fn(parseFloat(a), parseFloat(b)) : 
                calcular[op](parseFloat(a), parseFloat(b)));
        }
    });
    
    const resultado = parseFloat(expr);
    if (isNaN(resultado)) throw new Error("Expressão inválida");
    return resultado;
};

// Função principal de cálculo
const ValidarExpessao = () => {
    try {
        if (!validarParenteses(tela.value)) {
            throw new Error("Parênteses não balanceados");
        }
        tela.value = processarExpressao(tela.value);
    } catch (error) {
        tela.value = `Erro: ${error.message}`;
    }
};