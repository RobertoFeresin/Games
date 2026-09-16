export function exibirModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    const reiniciarButton = document.getElementById('reiniciar-jogo');
    reiniciarButton.addEventListener('click', () => {
        this.iniciarJogo();
        modal.style.display = 'none';
    });

    const somModal = document.getElementById('somModal');
    somModal.currentTime = 0; 
    somModal.play();
}
