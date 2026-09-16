import { renderizar } from './renderizar.js';
import { exibirModal } from './exibirModal.js';

export function explodirBombas() {
    let bombasRestantes = [];
    this.celulas.forEach((linha) => {
        linha.forEach((celula) => {
            if (celula.bomba && !celula.aberta) {
                bombasRestantes.push(celula);
            }
        });
    });

    let intervalo = 0;
    const explodir = () => {
        if (bombasRestantes.length === 0) {
            setTimeout(() => this.exibirModal(), intervalo);
            return;
        }

        const bomba = bombasRestantes.pop();
        setTimeout(() => {
            bomba.aberta = true;
            this.renderizar();

            const somExplosao = document.getElementById('somExplosao');
            somExplosao.currentTime = 0; 
            somExplosao.play();

            explodir();
        }, 200);
    };
    explodir();
}
