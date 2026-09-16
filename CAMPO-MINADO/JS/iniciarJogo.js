import { criarCelulas } from './criarCelulas.js';
import { carregarBombas } from './carregarBombas.js';
import { carregarVizinhos } from './carregarVizinhos.js';
import { renderizar } from './renderizar.js';

export function iniciarJogo() {
    const dificuldade = this.selectorDificuldade.value;

    switch (dificuldade) {
        case 'facil':
            this.tamanho = 8; 
            break;
        case 'medio':
            this.tamanho = 10; 
            break;
        case 'dificil':
            this.tamanho = 12;
            break;
        default:
            this.tamanho = 10;
    }

    this.bombas = Math.floor(this.tamanho * this.tamanho / 5);
    this.celulas = [];
    this.criarCelulas();
    this.carregarBombas();
    this.carregarVizinhos();
    this.renderizar();
}
