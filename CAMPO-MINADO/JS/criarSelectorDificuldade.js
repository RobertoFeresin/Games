export function criarSelectorDificuldade() {
    this.selectorDificuldade = document.getElementById('nivelDificuldade');
    this.selectorDificuldade.addEventListener('change', () => {
        this.iniciarJogo();
    });
}
