import artistTemplate from './artist.template';
import constants from '../../common/constans.js';
import API from '../../api/api.js';
import getColor from '../../common/get_color.js';
import TrackList from '../../components/track_list/track_list.js';
import Collection from '../../components/collection/collection';
import getPlayer from '../../components/player/player';
import { ApiError, errorHandler } from '../../common/Errors';

/**
 * Класс представляющий страницу исполнителя. Путь "/artist".
 */
export default class Artist {

    /**
     * Создает и рендерит темплейт.
     * @param {string} path - строковый id конкретного артиста.
     */
    constructor(path) {
        this.path = path;
        this._createTemplate();
        this._renderTemplate();
    }

    /**
     * Создает темплейт с прелоудерами.
     * @privet
     */
    _createTemplate() {
        this.$template = document.createElement('article');
        this.$template.classList.add('playlist');
        this.$template.innerHTML = artistTemplate();

        this.$header = this.$template.querySelector('.playlist__header');
        this.$imgPlaylist = this.$template.querySelector('.artist__img');
        this.$imgPlaylist.hidden = true;
        this.$name = this.$template.querySelector('.playlist__name');
        this.$followers = this.$template.querySelector('.artist__followers');
        this.$container = this.$template.querySelector('.artist__tracklist-container');
        this.$mainPlayButton = this.$template.querySelector('.play-button');
        this.$wrapper = this.$template.querySelector('.artist__tracklist-container-list');

        this.$mainPlayButton.addEventListener('click', this.addAudioHandler.bind(this), {once: true});
    }

    /**
     * Рендерит темплейт.
     * @private
     */
    _renderTemplate() {
        constants.app.innerHTML = '';
        constants.app.append(this.$template);
    }

    /**
     * Запрашивает данные об артисте. При их получении вызывает обновление темплейта.
     * @public
     * @async
     */
    async updateData() {
        try {
            const response = await API.get(`artists/${this.path}`);
            if (!response.ok) {
                throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
            }
            this.data = await response.json();
            this._updateView();
        
            try {
                const response = await API.get(`artists/${this.path}/top-tracks?market=ES`);
                if (!response.ok) {
                    throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
                }
                const data = await response.json();
                this._updateViewTracks(data);
            } catch(err) {
                if (err instanceof ApiError) {
                    errorHandler(err);
                } else {
                    console.log(err);
                }
            }
            try {
                const response = await API.get(`artists/${this.path}/albums?include_groups=album,single&market=US&limit=25&offset=0`);
                if (!response.ok) {
                    throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
                }
                const data = await response.json()
                this._updateViewAlbums(data.items);           
            } catch(err) {
                if (err instanceof ApiError) {
                    errorHandler(err);
                } else {
                    console.log(err);
                }
            }
            try {
                const response = await API.get(`artists/${this.path}/related-artists`);
                if (!response.ok) {
                    throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
                }
                const data = await response.json();
                this._updateViewArtists(data.artists);   
            } catch(err) {
                if (err instanceof ApiError) {
                    errorHandler(err);
                } else {
                    console.log(err);
                }
            }
        } catch(err) {
            if (err instanceof ApiError) {
                errorHandler(err);
            } else {
                console.log(err);
            }
        } 
    }

    /**
     * Обновляет темплейт для текущих данных.
     * @private
     */
    _updateView() {
        this.$imgPlaylist.src = this.data.images[0]?.url || this.data.images[1]?.url || 'https://i.ibb.co/f9sHgr9/default-artist.png';
        this.$imgPlaylist.hidden = false;

        if (this.data.name.length >= 50) {
            this.$name.classList.add('playlist__name_size_small');
        } else if (this.data.name.length >= 35) {

            this.$name.classList.add('playlist__name_size_normal');
        } else if (this.data.name.length >= 20) {
            this.$name.classList.add('playlist__name_size_large');
        }
        this.$name.textContent = this.data.name;

        this.$followers.textContent = `followers: ${this.data.followers.total}`;
        this.$template.querySelectorAll('.preloader').forEach((item) => {
            item.classList.remove('preloader');
        });     
        getColor(this.$imgPlaylist, this.$header);
    }

    /**
     * Получает комнонет треклист и рендерит его.
     * @param {Object} data - данные полученые с запроса к API
     * @param {Array} data.tracks - массив треков
     * @private
     */
    _updateViewTracks(data) {
        this.tracksListView = new TrackList(data.tracks, 'Popular tracks', 'artist');
        this.$container.append(this.tracksListView.$template);
    }

    /**
     * Получает компонент коллеция и рендерит его.
     * @param {Object[]} data - массив альбомов
     */
    _updateViewAlbums(data) {
        this.albumsView = new Collection(data, 'Albums and Singles', 'album');
        if (this.albumsView.components.length !== 0) {
            this.$wrapper.append(this.albumsView.$template);
        } 
    }

    /**
     * Получает компонент коллекция и рендерит его.
     * @param {Object[]} data - массив артистов 
     */
    _updateViewArtists(data) {
        this.artistsView = new Collection(data, 'Fans love it too', 'artist');
        if (this.artistsView.components.length !== 0) {
            this.$wrapper.append(this.artistsView.$template);
        } 
    }

    /**
     * Обработчик событий. Отправляет текущий трэклист страницы плееру.
     */
    addAudioHandler() {
        getPlayer().load(this.tracksListView.audioData, 0, this.$mainPlayButton);
    }
}
