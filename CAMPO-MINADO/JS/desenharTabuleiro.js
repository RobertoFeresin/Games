export function desenharTabuleiro() {
    const tabuleiroElemento = document.getElementById('tabuleiro');
    tabuleiroElemento.innerHTML = '';
    tabuleiroElemento.style.gridTemplateColumns = `repeat(${this.tamanho}, 50px)`;
    this.celulas.forEach((linha) => {
        linha.forEach((celula) => {
            const celulaElemento = document.createElement('div');
            celulaElemento.classList.add('celula');
            if (celula.aberta) {
                if (celula.bomba) {
                    celulaElemento.classList.add('bomba');
                    const gifExplosion = document.createElement('img');
                    gifExplosion.src = 'Assets/explosion-animation.gif';
                    celulaElemento.appendChild(gifExplosion);
                } else {
                    if (celula.bombas > 0) {
                        celulaElemento.innerText = celula.bombas; 
                    }
                    celulaElemento.classList.add('aberta');
                }
            } else if (celula.bandeira) {
                celulaElemento.innerText = '🚩';
                celulaElemento.classList.add('bandeira');
            }
            celulaElemento.addEventListener('click', () => {
                if (!celula.aberta && celula.bombas === 0) { // Verificar se a célula está em branco
                    // Adicionar a classe 'treme' ao contêiner do tabuleiro
                    tabuleiroElemento.classList.add('treme');

                    // Tocar o som do tremor
                    const somTremor = document.getElementById('somTremor');
                    somTremor.currentTime = 0; // Reiniciar o som
                    somTremor.play();

                    // Remover a classe 'treme' após a animação
                    setTimeout(() => {
                        tabuleiroElemento.classList.remove('treme');
                    }, 300); // 300ms é o tempo da animação (0.1s * 3)
                }

                this.abrirCelula(celula);
                this.renderizar();
            });
            celulaElemento.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.marcarBandeira(celula);
                this.renderizar();
            });
            tabuleiroElemento.appendChild(celulaElemento);
        });
    });
}
