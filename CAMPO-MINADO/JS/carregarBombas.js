export function carregarBombas() {
    let b = 0;
    
    const quantidadeBombas = Math.floor(this.bombas / 2);
    while (b < quantidadeBombas) {
        let x = Math.floor(Math.random() * this.tamanho);
        let y = Math.floor(Math.random() * this.tamanho);
        let c = this.celulas[y][x];
        if (!c.bomba) {
            b++;
            c.bomba = 1;
        }
    }
}
