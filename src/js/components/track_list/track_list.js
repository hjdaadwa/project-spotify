import trackListTemplate from './track_list.template'
import trackTemplate from './track.template'
import getRouter from '../../router/index.js';
import getPlayer from '../player/player';
import API from '../../api/api';
import { ApiError, errorHandler } from '../../common/Errors';


/**
 * @typedef audioElement
 * @type {object}
 * @property {HTMLElement} element - Живой html елемент трека
 * @property {string} name - Имя трека
 * @property {string} imgStc - Ссылка на изображение трека
 * @property {string} url - Ссылка на демо звуковой дорожки трека. Часто отсутствует. 
 */

/**
 * Класс представляющий компонент треклист.
 */
export default class TrackList {

    /**
     * Создает экземпляр класса TrackList
     * @param {*} data - Данные с API Spotify переданные родительским компонентом.
     * @param {string} title - Загловок для треклиста.
     * @param {string} type - Тип, отвечает за представление треклиста. 
     */
    constructor(data, title, type) {
        this.data = data;
        this.type = type;
        this.audioData = [];
        this._createTemplate(title);
        this.tracksView = this._createTracks();
        this.$container.append(...this.tracksView);
        
    }

    /**
     * Создание шаблона и заполнения статической информацией.
     * @param {string} title  - название плейлиста
     * @private
     */
    _createTemplate(title) {
        this.$template = document.createElement('div');
        this.$template.classList.add('playlist__content');
        this.$template.innerHTML = trackListTemplate();
        this.$title = this.$template.querySelector('.playlist__tracks-title');
        this.$title.textContent = (title || '');

        switch(this.type) {
            case 'album':
                this.$template.querySelector('.playlist__col3').textContent = '';
                this.$template.querySelector('.playlist__col4').textContent = '';
                break;
            case 'artist':
                this.$template.querySelector('.playlist__col4').textContent = '';
                break;
        }
        this.$container = this.$template.querySelector('.playlist__tracks');
    }

    /**
     * Создает треки в зависимости от типа. Собирает {audioElement} и пушит в this.audioData[] 
     * @private
     * @returns {HTMLElement[]} - массив компонентов трек.
     */
    _createTracks() {
        let tracks = [];
        if (this.type == 'playlist') {
            tracks = this.data.map((item, index) => {
                const audioElement = {};
                const $component = document.createElement('div');
                $component.classList.add('full-track');
                $component.innerHTML = trackTemplate();
        
                const $count = $component.querySelector('.full-track__col1');
                $count.textContent = index + 1;
        
                const $img = $component.querySelector('.full-track__img');
                $img.src = item.track.album.images[2]?.url || item.track.album.images[1]?.url || item.track.album.images[0]?.url || 'https://i.ibb.co/qrkY0xJ/track-placeholder.png';
        
                const $name = $component.querySelector('.full-track__name');
                $name.textContent = item.track.name;
        
                const $artists = $component.querySelector('.full-track__artists');
                item.track.artists.forEach((element, index, arr) => {
                    const $artist = document.createElement('a');
                    $artist.classList.add('full-track__artist');
                    if (index == arr.length - 1) {
                        $artist.textContent = element.name;
                    } else {
                        $artist.textContent = `${element.name},`;
                    }
                    $artist.href = `/artist/${element.id}`;
                    getRouter().addLinkHandler($artist);
                    $artists.append($artist);
                });
        
                const $album = $component.querySelector('.full-track__col3-link');
                $album.textContent = item.track.album.name;
                $album.href = `/album/${item.track.album.id}`;
                getRouter().addLinkHandler($album);
                
        
                const $date = $component.querySelector('.full-track__col4');
                $date.textContent = new Date(item.added_at).toDateString();
        
                const $duration = $component.querySelector('.full-track__col5');
                const durationMs = new Date(item.track.duration_ms);
                let durationSec = durationMs.getSeconds();
                if (durationSec <= 9) {
                    durationSec = '0' + durationSec;
                }
                $duration.textContent = durationMs.getMinutes() + ':' + durationSec;
                
                if (item.track.preview_url) {
                    $component.addEventListener('click', this.addAudioHandlers.bind(this));
                    audioElement.element = $component;
                    audioElement.name = $name.textContent;
                    audioElement.imgSrc = $img.src;
                    audioElement.url = item.track.preview_url;
                    $component.dataset.pid = `${index}`;
                } else {
                    $component.classList.add('full-track_inactive');
                }

                this.audioData.push(audioElement);
                return $component;
            });
        } else if (this.type == 'album') {
            tracks = this.data.map((item, index) => {
                const audioElement = {};
                const $component = document.createElement('div');
                $component.classList.add('full-track');
                $component.innerHTML = trackTemplate();
        
                const $count = $component.querySelector('.full-track__col1');
                $count.textContent = index + 1;

                const $img = $component.querySelector('.full-track__img');
                $img.hidden = true;
        
                const $name = $component.querySelector('.full-track__name');
                $name.textContent = item.name;
        
                const $artists = $component.querySelector('.full-track__artists');
                item.artists.forEach((element, index, arr) => {
                    const $artist = document.createElement('a');
                    $artist.classList.add('full-track__artist');
                    if (index == arr.length - 1) {
                        $artist.textContent = element.name;
                    } else {
                        $artist.textContent = `${element.name},`;
                    }
                    $artist.href = `/artist/${element.id}`;
                    getRouter().addLinkHandler($artist);
                    $artists.append($artist);
                });
        
                const $duration = $component.querySelector('.full-track__col5');
                const durationMs = new Date(item.duration_ms);
                let durationSec = durationMs.getSeconds();
                if (durationSec <= 9) {
                    durationSec = '0' + durationSec;
                }
                $duration.textContent = durationMs.getMinutes() + ':' + durationSec;
                
                if (item.preview_url) {
                    try {
                        API.get(`tracks/${item.id}?market=US`).then(async (response) => {
                            if (!response.ok) {
                                throw new ApiError(response.status, `Error when requesting "tracks/${item.id}"`, window.location.pathname);
                            } else {
                                const data = await response.json();
                                audioElement.imgSrc = data.album.images[1]?.url || data.album.images[2]?.url || data.album.images[0]?.url || ''; 
                            }                      
                        });
                    } catch(err) {
                        if (err instanceof ApiError) {
                            errorHandler(err);
                        } else {
                            console.log(err);
                        }
                    }

                    $component.addEventListener('click', this.addAudioHandlers.bind(this));
                    audioElement.element = $component;
                    audioElement.name = $name.textContent;
                    audioElement.imgSrc = '';
                    audioElement.url = item.preview_url;                  
                    $component.dataset.pid = `${index}`;
                } else {
                    $component.classList.add('full-track_inactive');
                }

                this.audioData.push(audioElement);
                return $component;
            });
        } else if (this.type == 'artist') {
            tracks = this.data.map((item, index) => {
                const audioElement = {};
                const $component = document.createElement('div');
                $component.classList.add('full-track');
                $component.innerHTML = trackTemplate();
        
                const $count = $component.querySelector('.full-track__col1');
                $count.textContent = index + 1;
        
                const $img = $component.querySelector('.full-track__img');
                $img.src = item.album.images[2].url;
        
                const $name = $component.querySelector('.full-track__name');
                $name.textContent = item.name;

                const $album = $component.querySelector('.full-track__col3-link');
                $album.textContent = item.album.name;
                $album.href = `/album/${item.album.id}`;
                getRouter().addLinkHandler($album);
        
                const $duration = $component.querySelector('.full-track__col5');
                const durationMs = new Date(item.duration_ms);
                let durationSec = durationMs.getSeconds();
                if (durationSec <= 9) {
                    durationSec = '0' + durationSec;
                }
                $duration.textContent = durationMs.getMinutes() + ':' + durationSec;
                
                if (item.preview_url) {
                    $component.addEventListener('click', this.addAudioHandlers.bind(this));
                    audioElement.element = $component;
                    audioElement.name = $name.textContent;
                    audioElement.imgSrc = $img.src;
                    audioElement.url = item.preview_url;
                    $component.dataset.pid = `${index}`;
                } else {
                    $component.classList.add('full-track_inactive');  
                }

                this.audioData.push(audioElement);
                return $component;
            });           
        }
        
        return tracks;
    }

    /**
     * Обработчик на трек.
     * @param {event} event 
     */
    addAudioHandlers(event) {
        event.preventDefault();
        if (event.currentTarget.classList.contains('full-track_active')) {
            getPlayer().switchState();
        } else {
            getPlayer().load(this.audioData, event.currentTarget.dataset.pid);
        }     
    }
}