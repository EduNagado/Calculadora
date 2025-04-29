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
            document.getElementById("tela").value += '√(';
            calcularRaizQuadrada();
        }
        else if (tecla === "p" ) {
            event.preventDefault();
            calcularPotencia();
        }
        else if (tecla === "Escape") {
            limparTela();
        }
    });

    document.addEventListener('keydown', function(event) {
        const tecla = event.key.toLowerCase();
        
        if (tecla === 's') {
            event.preventDefault();
            document.getElementById("tela").value += 'sin(';
        } 
        else if (tecla === 'c') {
            event.preventDefault();
            document.getElementById("tela").value += 'cos(';
        }
        else if (tecla === 't') {
            event.preventDefault();
            document.getElementById("tela").value += 'tan(';
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



document.addEventListener('keydown', function(event) {
    const tecla = event.key.toLowerCase();
    const botaoVirtual = document.querySelector(`[data-key="${tecla}"]`);
    
    if (botaoVirtual) {
        botaoVirtual.classList.add('tecla-pressionada');
        
        setTimeout(() => {
            botaoVirtual.classList.remove('tecla-pressionada');
        }, 200);
    }
});

const teclasEspeciais = {
    'Enter': '=',
    'Escape': 'AC',
    'Delete': 'C',  
    'r': '√',
    's': 'sin',
    'c': 'cos',
    't': 'tan'
};

document.addEventListener('keydown', function(event) {
    const tecla = event.key.toLowerCase();
    
    
    if (teclasEspeciais[tecla]) {
        const botao = document.querySelector(`[onclick*="${teclasEspeciais[tecla]}"]`);
        if (botao) {
            botao.click(); 
            botao.classList.add('tecla-pressionada');
            setTimeout(() => botao.classList.remove('tecla-pressionada'), 200);
        }
    }
});