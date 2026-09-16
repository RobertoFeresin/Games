export function criarCelulas() {
    for (let y = 0; y < this.tamanho; y++) {
        let linha = [];
        this.celulas.push(linha);
        for (let x = 0; x < this.tamanho; x++) {
            linha.push({
                x,
                y,
                aberta: false,
                bomba: 0,
                bombas: 0,
                bandeira: false,
                vizinhos: []
            });
        }
    }
}
