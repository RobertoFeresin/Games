import { criarSelectorDificuldade } from './JS/criarSelectorDificuldade.js';
import { iniciarJogo } from './JS/iniciarJogo.js';
import { desenharTabuleiro } from './JS/desenharTabuleiro.js';
import { carregarBombas } from './JS/carregarBombas.js';
import { criarCelulas } from './JS/criarCelulas.js';
import { carregarVizinhos } from './JS/carregarVizinhos.js';
import { abrirCelula } from './JS/abrirCelula.js';
import { marcarBandeira } from './JS/marcarBandeira.js';
import { explodirBombas } from './JS/explodirBombas.js';
import { renderizar } from './JS/renderizar.js';
import { exibirModal } from './JS/exibirModal.js';

class CampoMinado {
    constructor() {
        this.margem = 10;
        this.criarSelectorDificuldade();
        this.iniciarJogo();
    }

    criarSelectorDificuldade = criarSelectorDificuldade;
    iniciarJogo = iniciarJogo;
    desenharTabuleiro = desenharTabuleiro;
    carregarBombas = carregarBombas;
    criarCelulas = criarCelulas;
    carregarVizinhos = carregarVizinhos;
    abrirCelula = abrirCelula;
    marcarBandeira = marcarBandeira;
    explodirBombas = explodirBombas;
    renderizar = renderizar;
    exibirModal = exibirModal;
}

const jogo = new CampoMinado();
export default jogo;
