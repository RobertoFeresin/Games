export function marcarBandeira(celula) {
    if (celula.aberta) return;
    celula.bandeira = !celula.bandeira;
}
