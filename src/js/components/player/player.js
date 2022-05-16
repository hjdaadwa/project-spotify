import playButtonTemplate from './play_btn.template';


/**
 * Отвечает за работу плеера.
 */
class Player {
    /**
     * Создает экземпляр Player. Инициализируется 1 раз в точке входа.
     * @constructor
     * @this {Player}
     */
    constructor() {
        this.audio = new Audio();

        this.songs = [];
        this.currentSongIndex = 0;

        this.playButton = document.querySelector('.music-player__play-btn');
        this.prevButton = document.querySelector('.music-player__previous-btn');
        this.nextButton = document.querySelector('.music-player__next-btn');
        this.prevButton.addEventListener('click', this.previous.bind(this));
        this.nextButton.addEventListener('click', this.next.bind(this));

        this.playSvg = document.querySelector('.music-player__play-img');
        this.pauseSvg = document.querySelector('.music-player__stop-img');
        this.playButton.addEventListener('click', this.switchState.bind(this));

        this.cardImg = document.querySelector('.current-track__img');
        this.cardName = document.querySelector('.current-track__name');
        this.footer = document.querySelector('.music-player');

        this.muteButton = document.querySelector('.music-player__volume-bar-btn');
        this.muteOn = this.muteButton.querySelector('.mute__on');
        this.muteOn.style.display = 'none';
        this.muteOff = this.muteButton.querySelector('.mute__off');
        this.muteButton.addEventListener('click', this.mute.bind(this));

        this.volumeBar = document.querySelector('.music-player__volume-bar-input');
        this.audio.volume = 0.1;
        this.volumeBar.addEventListener('input', this.changeVolume.bind(this));


        this.playbackPosition = document.querySelector('.music-player__playback-bar');
        this.playbackPosition.addEventListener('mousedown', this.takePlaybackPosition.bind(this));
        this.playbackPosition.addEventListener('mouseup', this.changePlaybackPosition.bind(this));
        
        this.audio.addEventListener('timeupdate', this.getPlaybackPosition.bind(this));
    }

    /**
     * Получение текущего времени трека и переход к следующему треку
     * @private
     */
    getPlaybackPosition() {
        this.playbackPosition.value = this.audio.currentTime;
        if (this.audio.currentTime > 29.95) {
            this.next();
        }
    }

    /**
     * Сменить состояние плеера
     * @private
     */ 
    switchState() {
        if (this.songs[this.currentSongIndex]?.url) {
            this.audio.paused ? this.play() : this.pause();
        }
    }

    /**
     * Переключить представление всех активных кнопок плей
     * @private
     */
    switchPlayButton() {
        if (this.audio.paused) {
            this.playSvg.style.display = 'none';
            this.pauseSvg.style.display = 'block';
        } else {
            this.pauseSvg.style.display = 'none';
            this.playSvg.style.display = 'block';
        }
        if (this.mainPlayButton) {
            if (this.audio.paused) {
                this.mainPlaySvg.style.display = 'none';
                this.mainStopSvg.style.display = 'block';
            } else {
                this.mainStopSvg.style.display = 'none';
                this.mainPlaySvg.style.display = 'block';
            }
        }
    }
    
    /**
     * Хард ресет кнопок
     * @private
     */
    hardOffButtons() {
        this.pauseSvg.style.display = 'none';
        this.playSvg.style.display = 'block';
        if (this.mainPlayButton) {
            this.mainStopSvg.style.display = 'none';
            this.mainPlaySvg.style.display = 'block';
        }
    }

    /**
     * Получение массива данных нового плейлиста, текущего трека, общей кнопки плей на странице и их инициализация.
     * Вызывается из обработчиков кликов по трэкам и элеменам плэй/стоп.
     * @public
     * @param {[import('../track_list/track_list').audioElement]} audioData - Массив данных трека
     * @param {number} audioIndex - индекс трека вызвавшего обработчик
     * @param {HTMLElement} btn -  Элемент управления. Не обязательный элемент.
     * @returns 
     */
    load(audioData, audioIndex, btn) {
        this.footer.style.display = 'flex';

        //Проверка массива на наличие объектов с preview url
        if (audioData.map(item =>item.url !== undefined ? true : false).indexOf(true) === -1) {
            return;
        } 
        
        //Проверка текущего трека с переданным
        if (this.songs[this.currentSongIndex] === audioData[+audioIndex]) {
            this.switchState();
            return;
        }

        //Проверка текущего плейлиста с переданным плейстом. При совпадении меняем только текущий индекс
        if (this.songs === audioData) {
            this.clearView();
            this.currentSongIndex = +audioIndex;
            this.audio.src = this.songs[this.currentSongIndex].url;           
        } else {
            console.log();
            if (audioData[audioIndex].url) {
                this.clearView();
                this.songs = audioData;
                this.currentSongIndex = +audioIndex;
                this.audio.src = this.songs[this.currentSongIndex].url;
            } else {
                const newIndex = audioData.map(item =>item.url !== undefined ? true : false).indexOf(true);
                this.clearView();
                this.songs = audioData;
                this.currentSongIndex = newIndex;
                this.audio.src = this.songs[this.currentSongIndex].url; 
            }
        }

        //Если передана кнопка плей, то вешаем обработчик, иначе проверяем наличе на странице другой кнопки,
        //удаляем и создаем новую, чтобы очистить память от предыдущего обработчика
        if (btn) {
            this.mainPlayButton = btn;
            this.mainPlaySvg = this.mainPlayButton.querySelector('.play-button__img_play');
            this.mainStopSvg = this.mainPlayButton.querySelector('.play-button__img_stop');
            this.mainPlayButton.addEventListener('click', this.switchState.bind(this));
        } else {
            if (document.querySelector('.play-button')){
                const container = document.querySelector('.playlist__play-btn');
                container.innerHTML = playButtonTemplate();
                this.mainPlayButton = container.querySelector('.play-button');
                this.mainPlaySvg = this.mainPlayButton.querySelector('.play-button__img_play');
                this.mainStopSvg = this.mainPlayButton.querySelector('.play-button__img_stop');
                this.mainPlayButton.addEventListener('click', this.switchState.bind(this));
            }          
        }
        this.play();
        this.changeView();
    }

    /**
     * Удаление стилей с активного трека
     * @privet
     */
    clearView() {
        if (this.songs[this.currentSongIndex]) {
            this.songs[this.currentSongIndex].element.classList.remove('full-track_active');
        }  
    }

    /**
     * Обновление данных о текущем треке
     * @private
     */
    changeView() {
        this.cardImg.src = this.songs[this.currentSongIndex].imgSrc;
        this.cardName.textContent = this.songs[this.currentSongIndex].name;
        this.songs[this.currentSongIndex].element.classList.add('full-track_active');
    }
    play() {
        this.switchPlayButton();
        this.audio.play();
    }
    pause() {
        this.switchPlayButton();
        this.audio.pause()
    }

    /**
     * Переход к следующему треку с проверками на наличие таковых в треклисте
     * @private
     */
    next() {
        const newIndex = this.songs.map(item =>item.url !== undefined ? true : false).indexOf(true, this.currentSongIndex + 1);
        if (newIndex > this.currentSongIndex) {
            this.clearView();
            this.currentSongIndex = newIndex;
            this.audio.src = this.songs[this.currentSongIndex].url;
            this.play()
            this.changeView();
        } else {
            const newIndex = this.songs.map(item =>item.url !== undefined ? true : false).indexOf(true, 0);
            this.clearView();
            this.currentSongIndex = newIndex;
            this.audio.src = this.songs[newIndex].url;
            this.changeView();
            this.hardOffButtons();
        }
    }

    /**
     * Переход к предыдущему треку с проверками на наличие таковых в треклисте
     * @private
     */
    previous() {
        const newIndex = this.songs.map(item =>item.url !== undefined ? true : false).lastIndexOf(true, this.currentSongIndex - 1);

        if (newIndex < this.currentSongIndex && newIndex !== -1) {
            this.clearView();
            this.currentSongIndex = newIndex;
            this.audio.src = this.songs[this.currentSongIndex].url;
            this.play();
            this.changeView();
        } else {
            this.currentSongIndex = this.currentSongIndex;
            this.audio.src = this.songs[this.currentSongIndex].url;
            this.hardOffButtons();
        }
    }
    /**
     * Включение/отключение звука
     * @private
     */
    mute() {
        if (this.audio.muted) {
            this.audio.muted = false;
            this.muteOn.style.display = 'none';
            this.muteOff.style.display = 'block';

        } else {
            this.audio.muted = true;
            this.muteOn.style.display = 'block';
            this.muteOff.style.display = 'none';
        }
    }
    
    /**
     * Изменение величины громкости
     * @private
     */
    changeVolume() {
        this.audio.volume = this.volumeBar.value;
    }

    /**
     * Изменение текущего значения времени трека
     */
    changePlaybackPosition(e) {
        this.audio.currentTime = e.offsetX / 20;
        this.play();          
    }
    takePlaybackPosition(e) {
        if (!this.audio.paused) {
            this.pause();
        }
        this.audio.currentTime = e.offsetX / 20;       
    }
}

/**
 * Экзампляр класса Player
 */
let player;

/**
 * Инициализирует плеер
 */
const initPlayer = () => {
    player = new Player();
}

export default initPlayer;
export {player};