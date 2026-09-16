const inputManobra = document.getElementById("inputManobra");
const pontuacaoDisplay = document.getElementById("pontuacao");
const obstaculo = document.getElementById("obstaculo");
const manobras = ['Ollie', 'Kickflip', 'Heelflip', 'Varial Flip', '360 Flip'];
let manobraAtual = 0;
let pontuacao = 0;

const skatista = document.createElement("div");
skatista.id = "skatista";
skatista.style.backgroundImage = "url('/Imagens/SpritesPersonagem/SpriteManobras/Kickflip/Sprite-10.png')";
document.querySelector(".container-jogo").appendChild(skatista);

function atualizarPlaceholder() {
    inputManobra.placeholder = manobras[manobraAtual];
}


inputManobra.addEventListener('input', (event) => {
    const valorDigitado = event.target.value.trim();

    if (valorDigitado.toLowerCase() === manobras[manobraAtual].toLowerCase()) {
        pular();
        iniciarAnimacao(manobrasConfig[manobras[manobraAtual].toLowerCase()]);
        event.target.value = '';
        pontuacao += 20;
        atualizarPontuacao();
        manobraAtual = (manobraAtual + 1) % manobras.length;
        atualizarPlaceholder();
    }
});

function atualizarPontuacao() {
    pontuacaoDisplay.textContent = `Pontuação: ${pontuacao}`;
}

atualizarPlaceholder(); 
atualizarPontuacao();

const manobrasConfig = {
    ollie: {
        frames: 8,
        prefixo: '/Imagens/SpritesPersonagem/SpriteManobras/Ollie/Sprite-',
        extensao: '.png',
        duracao: 1000
    },
    kickflip: {
        frames: 10,
        prefixo: '/Imagens/SpritesPersonagem/SpriteManobras/Kickflip/Sprite-',
        extensao: '.png',
        duracao: 1200
    },
    heelflip: {
        frames: 8,
        prefixo: '/Imagens/SpritesPersonagem/SpriteManobras/Ollie/Sprite-',
        extensao: '.png',
        duracao: 1000
    },
    "varial flip": {
        frames: 8,
        prefixo: '/Imagens/SpritesPersonagem/SpriteManobras/Ollie/Sprite-',
        extensao: '.png',
        duracao: 900
    },
    "360 flip": {
        frames: 10,
        prefixo: '/Imagens/SpritesPersonagem/SpriteManobras/Kickflip/Sprite-',
        extensao: '.png',
        duracao: 1500
    }
};

function iniciarAnimacao({ frames, prefixo, extensao, duracao }) {
    let frameAtual = 1;
    const intervalo = duracao / frames;

    const animacao = setInterval(() => {
        if (frameAtual > frames) {
            clearInterval(animacao);
            resetarSkatista();
        } else {
            skatista.style.backgroundImage = `url('${prefixo}${frameAtual}${extensao}')`;
            frameAtual++;
        }
    }, intervalo);


}

function resetarSkatista() {
    skatista.style.backgroundImage = "url('/Imagens/SpritesPersonagem/SpriteManobras/Kickflip/Sprite-10.png')";
    
}

function pular() {
    if (!skatista.classList.contains("pular")) {
        skatista.classList.add("pular");
        setTimeout(() => skatista.classList.remove("pular"), 1400);
    }
}

function moverObstaculo() {
    let obstaculoRight = parseInt(window.getComputedStyle(obstaculo).getPropertyValue("right"));

    if (obstaculoRight < 630) {
        obstaculoRight += 5;
        obstaculo.style.right = `${obstaculoRight}px`;
    } else {
        obstaculo.style.right = "-30px";
    }
}

function verificarColisao() {
    const skatistaRect = skatista.getBoundingClientRect();
    const obstaculoRect = obstaculo.getBoundingClientRect();

    const buffer = 50;

    const colidiu =
        skatistaRect.left < obstaculoRect.right - buffer &&
        skatistaRect.right > obstaculoRect.left + buffer &&
        skatistaRect.top < obstaculoRect.bottom - buffer &&
        skatistaRect.bottom > obstaculoRect.top + buffer;

    if (colidiu) {
        alert("Game Over!");
        location.reload();
    }
}

function iniciarJogo() {
    setInterval(moverObstaculo, 50);
    setInterval(verificarColisao, 50);
}

iniciarJogo();
