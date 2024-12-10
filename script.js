    const html = document.querySelector('html');
    const focoBt = document.querySelector('.app__card-button--foco');
    const curtoBt = document.querySelector('.app__card-button--curto');
    const longoBt = document.querySelector('.app__card-button--longo');
    const startPauseBt = document.querySelector('#start-pause');
    const banner = document.querySelector('.app__image');
    const titulo = document.querySelector('.app__title');
    const musicaFocoInput = document.querySelector('#alternar-musica');
    const musica = new Audio('/sons/luna-rise-part-one.mp3');
    const somAlerta = new Audio('/sons/beep.mp3');
    const somPlay = new Audio('/sons/play.wav');
    const somPause = new Audio('/sons/pause.mp3');
    const tempoNaTela = document.querySelector('#timer');

    let tempoDecorridoEmSegundos = 1500; 
    let intervaloId = null;

    musica.loop = true;

    musicaFocoInput.addEventListener('change', () => {
        if (musica.paused) {
            musica.play();
        } else {
            musica.pause();
        }
    });

    focoBt.addEventListener("click", () => {
        alterarContexto('foco', 1500);
        curtoBt.classList.remove('active');
        longoBt.classList.remove('active');
        focoBt.classList.add('active');
    });

    curtoBt.addEventListener("click", () => {
        alterarContexto('descanso-curto', 300);
        focoBt.classList.remove('active');
        longoBt.classList.remove('active');
        curtoBt.classList.add('active');
    });

    longoBt.addEventListener("click", () => {
        alterarContexto('descanso-longo', 900); 
        curtoBt.classList.remove('active');
        focoBt.classList.remove('active');
        longoBt.classList.add('active');
    });

    function alterarContexto(contexto, tempo) {
        zerar(); 
        tempoDecorridoEmSegundos = tempo; 
        mostrarTempo(); 
        html.setAttribute('data-contexto', contexto);
        banner.setAttribute('src', `/imagens/${contexto}.png`);
        switch (contexto) {
            case 'foco':
                titulo.innerHTML = `Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>`;
                break;
            case 'descanso-curto':
                titulo.innerHTML = `Que tal uma respirada?<br>
                    <strong class="app__title-strong">Faça uma pausa curta.</strong>`;
                break;
            case 'descanso-longo':
                titulo.innerHTML = `Hora de voltar a superficie<br>
                    <strong class="app__title-strong">Faça uma grande pausa</strong>`;
                break;
            default:
                break;
        }
    }

    const contagemRegressiva = () => {
        if (tempoDecorridoEmSegundos <= 6 && tempoDecorridoEmSegundos > 0) {
            somAlerta.play(); 
        }
        if (tempoDecorridoEmSegundos <= 0) {
            zerar();
            somAlerta.play();
            alert('Tempo finalizado');
            return;
        }
        tempoDecorridoEmSegundos -= 1;
        mostrarTempo();
    };

    startPauseBt.addEventListener('click', iniciarOuPausar);

    function iniciarOuPausar() {
        if (intervaloId) { 
            startPauseBt.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
                                      <span>Começar</span>`;
            zerar();
            somPause.play();
            return;
        }
        intervaloId = setInterval(contagemRegressiva, 1000);
        somPlay.play();
        startPauseBt.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
                                  <span>Pausar</span>`;
    }

    function zerar() {
        clearInterval(intervaloId);
        intervaloId = null;
    }

    function mostrarTempo() {
        const tempo = new Date(tempoDecorridoEmSegundos * 1000);
        const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' });
        tempoNaTela.innerHTML = `${tempoFormatado}`;
    }

    mostrarTempo();
