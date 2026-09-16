const modalIntroducao = document.getElementById('modal-introducao');
const botaoIniciar = document.getElementById('iniciarJogo');
const tabuleiro = document.getElementById('tabuleiro-frogger');
const sapo = document.createElement('div');
sapo.classList.add('sapo');

tabuleiro.appendChild(sapo);
const rio = document.createElement('div');
rio.classList.add('rio');
rio.style.position = 'absolute';
rio.style.top = '3rem';
rio.style.height = '200px';
tabuleiro.appendChild(rio);

let alturaTabuleiro = tabuleiro.offsetHeight;
let larguraTabuleiro = tabuleiro.offsetWidth;

const estadoSapo = {
    x: larguraTabuleiro / 2 - 15,  
    y: alturaTabuleiro - 90,  
    largura: 30,
    altura: 30,
    dx: 20,                        
    dy: 40,                       
    sprite: sapo.style.backgroundImage === 'url(Assets/Images/frog/frog-1.png)',
    morreu: false
};

let vidas = 3;
let vitorias = 0;

const coracoes = [];
for (let i = 0; i < vidas; i++) {
    const coracao = document.createElement('div');
    coracao.classList.add('coracao');
    coracao.style.left = `${10 + i * 30}px`;
    coracao.style.bottom = '10px';
    tabuleiro.appendChild(coracao);
    coracoes.push(coracao);
}

const carros = [
    { top: 370, left: 50 },
    { top: 370, left: 300 },
    { top: 290, left: 200 },
    { top: 290, left: 400 }
].map(posicao => {
    const carro = document.createElement('div');
    carro.classList.add('carro');
    carro.style.top = posicao.top + 'px';
    carro.style.left = posicao.left + 'px';
    tabuleiro.appendChild(carro);
    return carro;
});

const estadoCarros = carros.map(carro => ({
    elemento: carro,
    x: parseInt(carro.style.left, 10),
    y: parseInt(carro.style.top, 10),
    largura: 50,
    altura: 30,
    velocidade: 0.5 // Velocidade constante
}));

const carros2 = [
    { top: 330, left: 500 },
    { top: 330, left: 700 },
    { top: 250, left: 800 }
].map(posicao => {
    const carro = document.createElement('div');
    carro.classList.add('carro2');
    carro.style.top = posicao.top + 'px';
    carro.style.left = posicao.left + 'px';
    tabuleiro.appendChild(carro);
    return carro;
});

const estadoCarros2 = carros2.map(carro => ({
    elemento: carro,
    x: parseInt(carro.style.left, 10),
    y: parseInt(carro.style.top, 10),
    largura: 50,
    altura: 30,
    velocidade: -0.5 // Velocidade constante
}));

const troncos = [
    { top: 55, left: 200 },
    { top: 55, left: 10 },
    { top: 135, left: 100 },
    { top: 135, left: 300 }
].map(posicao => {
    const troncos = document.createElement('div');
    troncos.classList.add('troncos');
    troncos.style.top = posicao.top + 'px';
    troncos.style.left = posicao.left + 'px';
    tabuleiro.appendChild(troncos);
    return troncos;
});

const estadoTroncos = troncos.map(tronco => ({
    elemento: tronco,
    x: parseInt(tronco.style.left, 10),
    y: parseInt(tronco.style.top, 10),
    largura: 100,
    altura: 10,
    velocidade: 0.5 // Velocidade constante
}));

const troncos2 = [
    { top: 95, left: -100 },
    { top: 175, left: -100 }
].map(posicao => {
    const troncos2 = document.createElement('div');
    troncos2.classList.add('troncos2');
    troncos2.style.top = posicao.top + 'px';
    troncos2.style.left = posicao.left + 'px';
    tabuleiro.appendChild(troncos2);
    return troncos2;
});

const estadoTroncos2 = troncos2.map(tronco => ({
    elemento: tronco,
    x: parseInt(tronco.style.left, 10),
    y: parseInt(tronco.style.top, 10),
    largura: 100,
    altura: 10,
    velocidade: -0.5 // Velocidade constante
}));

let jogoVencido = false;

const vitoria = [
    { top: 20, left: 15 },
    { top: 20, left: 100 },
    { top: 20, left: 185 },
    { top: 20, left: 270 },
    { top: 20, left: 355 }
].map(posicao => {
    const vitoria = document.createElement('div');
    vitoria.classList.add('vitoria');
    vitoria.style.top = posicao.top + 'px';
    vitoria.style.left = posicao.left + 'px';
    tabuleiro.appendChild(vitoria);
    return vitoria;
});

let idAnimacao;

function exibirModalIntroducao() {
    modalIntroducao.style.display = 'flex';
}

function ocultarModalIntroducao() {
    modalIntroducao.style.display = 'none';
    atualizar();
}

botaoIniciar.addEventListener('click', () => {
    ocultarModalIntroducao();
});

window.onload = () => {
    exibirModalIntroducao();
};

function exibirGameOver() {
    const modal = document.createElement('div');
    modal.id = 'modal-gameover';
    modal.classList.add('mostrar');

    document.body.appendChild(modal);

    window.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            reiniciarJogo();
            exibirModalIntroducao(); 
        }
    });
}

function exibirVitoria() {
    if (jogoVencido) return; 

    const modal = document.createElement('div');
    modal.id = 'modal-vitoria';
    modal.classList.add('mostrar');
    document.body.appendChild(modal);

    window.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            reiniciarJogo();
            exibirModalIntroducao();
        }
    });

    jogoVencido = true; 

    if (idAnimacao) {
        cancelAnimationFrame(idAnimacao);
    }
}

function reiniciarJogo() {
    const modalGameOver = document.getElementById('modal-gameover');
    const modalVitoria = document.getElementById('modal-vitoria');

    if (modalGameOver) {
        modalGameOver.remove();
    }
    if (modalVitoria) {
        modalVitoria.remove();
    }

    if (idAnimacao) {
        cancelAnimationFrame(idAnimacao);
    }

    vidas = 3;
    vitorias = 0;
    jogoVencido = false;

    vitoria.forEach(bloco => {
        bloco.classList.remove('alcancado');
    });

    coracoes.forEach(coracao => coracao.remove());
    coracoes.length = 0;
    for (let i = 0; i < vidas; i++) {
        const coracao = document.createElement('div');
        coracao.classList.add('coracao');
        coracao.style.left = `${10 + i * 30}px`;
        coracao.style.bottom = '10px';
        tabuleiro.appendChild(coracao);
        coracoes.push(coracao);
    }

    reiniciarSapo();
    atualizar();
}

function configurarTeclaEnter() {
    window.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            const modalGameOver = document.getElementById('modal-gameover');
            const modalVitoria = document.getElementById('modal-vitoria');
            
            if (modalGameOver || modalVitoria) {
                reiniciarJogo(); 
            }
        }
    });
}

configurarTeclaEnter();

function atualizarDimensoesTabuleiro() {
    larguraTabuleiro = tabuleiro.offsetWidth;
    alturaTabuleiro = tabuleiro.offsetHeight;
}

function moverTroncos() {
    estadoTroncos.forEach(estado => {
        estado.x += estado.velocidade; // A velocidade permanece constante

        if (estado.x > larguraTabuleiro) {
            estado.x = -estado.largura;
        }
        estado.elemento.style.left = `${Math.max(estado.x, -estado.largura)}px`;
    });
}

function moverTroncos2() {
    estadoTroncos2.forEach(estado => {
        estado.x += estado.velocidade; // A velocidade permanece constante

        if (estado.x + estado.largura < 0) {
            estado.x = larguraTabuleiro;
        }

        estado.elemento.style.left = `${estado.x}px`;
    });
}

function desenharSapo() {
    sapo.style.left = `${estadoSapo.x}px`;
    sapo.style.top = `${estadoSapo.y}px`;
    sapo.style.width = `${estadoSapo.largura}px`;
    sapo.style.height = `${estadoSapo.altura}px`;
}

function moverCarros() {
    estadoCarros.forEach(estado => {
        estado.x += estado.velocidade; // A velocidade permanece constante

        if (estado.x > larguraTabuleiro) {
            estado.x = -estado.largura;
        }
        estado.elemento.style.left = estado.x + 'px';
    });
}

function moverCarros2() {
    estadoCarros2.forEach(estado => {
        estado.x += estado.velocidade; // A velocidade permanece constante

        if (estado.x + estado.largura < 0) {
            estado.x = larguraTabuleiro;
        }
        estado.elemento.style.left = estado.x + 'px';
    });
}

const somPulo = new Audio('Assets/sounds/pulo.mp3');
const somMorte = new Audio('Assets/sounds/morte.mp3');

somPulo.volume = 0.1;
somMorte.volume = 0.3;

function alternarSpriteSapo(sprite1, sprite2, spriteInicial) {
    sapo.style.backgroundImage = `url(${sprite1})`;
    setTimeout(() => {
        sapo.style.backgroundImage = `url(${sprite2})`;
        setTimeout(() => {
            sapo.style.backgroundImage = `url(${spriteInicial})`;
        }, 100);
    }, 100);
}

function detectarColisoes() {
    if (jogoVencido) return;

    const verificarColisao = (sapo, objeto) => {
        return (
            sapo.x < objeto.x + objeto.largura &&
            sapo.x + sapo.largura > objeto.x &&
            sapo.y < objeto.y + objeto.altura &&
            sapo.y + sapo.altura > objeto.y
        );
    };

    vitoria.forEach((bloco) => {
        const posicao = {
            x: parseInt(bloco.style.left, 10),
            y: parseInt(bloco.style.top, 10),
            largura: 30,
            altura: 30
        };

        if (verificarColisao(estadoSapo, posicao) && !bloco.classList.contains('alcancado')) {
            bloco.classList.add('alcancado');
            reiniciarSapo();
            vitorias++;
        }
    });

    if (vitorias === vitoria.length) {
        setTimeout(() => {
            exibirVitoria();
        }, 1000);
    }

    estadoCarros.forEach(carro => {
        if (verificarColisao(estadoSapo, carro)) {
            animarMorte();
        }
    });

    estadoCarros2.forEach(carro => {
        if (verificarColisao(estadoSapo, carro)) {
            animarMorte();
        }
    });

    let sapoNosTroncos = false;

    estadoTroncos.forEach(tronco => {
        if (verificarColisao(estadoSapo, tronco)) {
            sapoNosTroncos = true;
            estadoSapo.x += tronco.velocidade;
        }
    });

    estadoTroncos2.forEach(tronco2 => {
        if (verificarColisao(estadoSapo, tronco2)) {
            sapoNosTroncos = true;
            estadoSapo.x += tronco2.velocidade;
        }
    });

    const noRio =
        estadoSapo.y < parseInt(rio.style.top) + parseInt(rio.style.height) &&
        estadoSapo.y >= parseInt(rio.style.top);

    if (noRio && !sapoNosTroncos) {
        animarMorte();
    }
}

function animarMorte() {
    estadoSapo.morreu = true;
    somMorte.play();

    if (vidas > 0) {
        vidas--;
        coracoes[vidas].remove();
        coracoes.pop();
    }

    if (vidas === 0) {
        setTimeout(() => {
            exibirGameOver();
        }, 1000);
    } else {
        alternarSpriteSapo('Assets/Images/morte/morte-1.png', 'Assets/Images/morte/morte-2.png', 'Assets/Images/morte/morte-3.png');
        setTimeout(() => {
            reiniciarSapo();
        }, 1000);
    }
}

function reiniciarSapo() {
    estadoSapo.morreu = false;
    estadoSapo.x = larguraTabuleiro / 2 - 15;
    estadoSapo.y = alturaTabuleiro - 90;
    sapo.style.backgroundImage = 'url(Assets/Images/frog/frog-1.png)';
    desenharSapo();
}

function atualizar() {
    atualizarDimensoesTabuleiro();

    if (!estadoSapo.morreu) {
        desenharSapo();
        moverCarros();
        moverCarros2();
        moverTroncos();
        moverTroncos2();
        detectarColisoes();
    }

    idAnimacao = requestAnimationFrame(atualizar);
}

const alturaTabuleiroSapo = 420;

document.addEventListener('keydown', (e) => {
    if (estadoSapo.morreu || jogoVencido) return;

    switch (e.key) {
        case 'ArrowUp':
            if (estadoSapo.y > 0) {  
                alternarSpriteSapo('Assets/Images/frog/frog-1.png', 'Assets/Images/frog/frog-2.png', 'Assets/Images/frog/frog-1.png');
                somPulo.play();
                estadoSapo.y -= estadoSapo.dy;
            }
            break;
        case 'ArrowDown':
            if (estadoSapo.y + estadoSapo.altura < alturaTabuleiroSapo) {  
                alternarSpriteSapo('Assets/Images/frog/frog-7.png', 'Assets/Images/frog/frog-8.png', 'Assets/Images/frog/frog-1.png');
                somPulo.play();
                estadoSapo.y += estadoSapo.dy;
            }
            break;
        case 'ArrowLeft':
            if (estadoSapo.x > 0) {  
                alternarSpriteSapo('Assets/Images/frog/frog-5.png', 'Assets/Images/frog/frog-6.png', 'Assets/Images/frog/frog-1.png');
                somPulo.play();
                estadoSapo.x -= estadoSapo.dx;
            }
            break;
        case 'ArrowRight':
            if (estadoSapo.x + estadoSapo.largura < larguraTabuleiro) {  
                alternarSpriteSapo('Assets/Images/frog/frog-3.png', 'Assets/Images/frog/frog-4.png', 'Assets/Images/frog/frog-1.png');
                somPulo.play();
                estadoSapo.x += estadoSapo.dx;
            }
            break;
    }
});

atualizar();
