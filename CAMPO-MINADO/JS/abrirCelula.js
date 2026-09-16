import { explodirBombas } from './explodirBombas.js';
import { renderizar } from './renderizar.js';

export function abrirCelula(celula) {
    if (celula.aberta || celula.bandeira) return;
    celula.aberta = true;
    if (celula.bomba) {
        this.explodirBombas();
        return;
    }
    if (celula.bombas === 0) {
        celula.vizinhos.forEach((vizinho) => {
            this.abrirCelula(vizinho);
        });
    }
}
