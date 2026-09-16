export function carregarVizinhos() {
    this.celulas.forEach((linha) => {
        linha.forEach((celula) => {
            celula.vizinhos = []; 

            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx !== 0 || dy !== 0) { 
                        let x = celula.x + dx;
                        let y = celula.y + dy;
                        if (x >= 0 && x < this.tamanho && y >= 0 && y < this.tamanho) {
                            let vizinho = this.celulas[y][x];
                            celula.vizinhos.push(vizinho);
                            if (vizinho.bomba) {
                                celula.bombas++;
                            }
                        }
                    }
                }
            }
        });
    });
}
