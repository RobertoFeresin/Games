document.addEventListener('DOMContentLoaded', (event) => {
    const startScreen = document.getElementById('start-screen');
    const gameContent = document.getElementById('game');
    const musicaFundo = document.getElementById('musicaFundo');

    const iniciarMusica = () => {
        musicaFundo.play().catch((error) => {
            console.log('Autoplay prevention:', error);
        });
    };

    const ativarMusica = () => {
        iniciarMusica();
        document.removeEventListener('click', ativarMusica);
        document.removeEventListener('keydown', ativarMusica);
    };

    document.addEventListener('click', ativarMusica);
    document.addEventListener('keydown', ativarMusica);

    document.addEventListener('keydown', (eventKey) => {
        if (eventKey.key === 'Enter') {
            musicaFundo.volume = 1;
            const fadeOutInterval = setInterval(() => {
                if (musicaFundo.volume > 0.1) {
                    musicaFundo.volume -= 0.1;
                } else {
                    musicaFundo.volume = 0;
                    clearInterval(fadeOutInterval);
                    musicaFundo.pause();
                }
            }, 100); 

            startScreen.classList.add('fade-out');
            setTimeout(() => {
                startScreen.style.display = 'none';
                gameContent.style.display = 'block';
            }, 1000); 
        }
    });

    gameContent.style.display = 'none';
});
