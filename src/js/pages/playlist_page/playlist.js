import playlistTemplate from './playlist.template';
import constants from '../../common/constans.js';
import API from '../../api/api.js';
import getUser from '../../components/user/user.js';
import getColor from '../../common/get_color.js';
import TrackList from '../../components/track_list/track_list.js';
import { ApiError, errorHandler } from '../../common/Errors';
import getPlayer from '../../components/player/player';


/**
 * Класс представляющий страницу плейлиста. Путь "/playlist"
 */
export default class PlayList {

    /**
     * Создает и рендерит темплейт. 
     * @param {string} path - строковый id конкретного плейлиста или me.
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
        this.$template.innerHTML = playlistTemplate();

        this.$header = this.$template.querySelector('.playlist__header');

        this.$imgPlaylist = this.$template.querySelector('.playlist__img');
        this.$imgPlaylist.hidden = true;

        this.$type =this.$template.querySelector('.playlist__type');
        this.$name = this.$template.querySelector('.playlist__name');
        this.$description = this.$template.querySelector('.playlist__description');

        this.$imgUser = this.$template.querySelector('.playlist__avatar');
        this.$imgUser.hidden = true;

        this.$authorName = this.$template.querySelector('.playlist__user-name');
        this.$counter = this.$template.querySelector('.playlist__counter');
        this.$followers = this.$template.querySelector('.playlist__followers');
        this.$mainPlayButton = this.$template.querySelector('.play-button');
        this.$container = this.$template.querySelector('.playlist__content-container');

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
     * Запрашивает данные о плейлисте. При их получении вызывает обновление темплейта.
     * @public
     * @async
     */
    async updateData() {
        try {
            if (this.path === 'me') {
                const response = await API.get('me/tracks?offset=0&limit=50');
                if (!response.ok) {
                    throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
                }
                this.data = await response.json();
                this._updateView();
            } else {
                const response = await API.get(`playlists/${this.path}`);
                if (!response.ok) {
                    throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
                }
                this.data = await response.json();
                this._updateView();
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
     * Обновляет темплейт, заполняя данными и получая компонет треклист.
     * @private
     */
    _updateView() {
        if (this.path === 'me') {
            this.$imgPlaylist.src = 'https://i.ibb.co/44mk1sy/playlist-favorite.png';
            this.$imgPlaylist.hidden = false;
            this.$type.textContent = 'playlist';
            this.$name.textContent = 'Favorite tracks';
            this.$imgUser.src = getUser().data.images[0]?.url || getUser().data.images[1]?.url || getUser().data.images[2]?.url || 'https://i.ibb.co/51drLLx/default-user.png';
            this.$imgUser.crossOrigin = 'anonymous';
            this.$imgUser.hidden = false;
            this.$authorName.textContent = getUser().data.display_name;
            this.$counter.textContent = `  tracks: ${this.data.total}`;
            this.$followers.hidden = true;
            this.$template.querySelectorAll('.preloader').forEach((item) => {
                item.classList.remove('preloader');
            });
            this.tracksView = new TrackList(this.data.items, '', 'playlist');
        } else {
            this.$imgPlaylist.src = this.data.images[0]?.url || this.data.images[1]?.url || this.data.images[2]?.url || 'https://i.ibb.co/p2bwMsX/playlist-placeholder.png';
            this.$imgPlaylist.hidden = false;
            this.$type.textContent = this.data.type;
            if (this.data.name.length >= 50) {
                this.$name.classList.add('playlist__name_size_small');
            } else if (this.data.name.length >= 35) {

                this.$name.classList.add('playlist__name_size_normal');
            } else if (this.data.name.length >= 20) {
                this.$name.classList.add('playlist__name_size_large');
            }
            this.$name.textContent = this.data.name;
            this.$description.textContent = this.data.description;
            this.$authorName.textContent = this.data.owner.display_name;
            this.$counter.textContent = `tracks: ${this.data.tracks.total}`;
            this.$followers.textContent = `followers: ${this.data.followers.total}`
            this.$template.querySelectorAll('.preloader').forEach((item) => {
                item.classList.remove('preloader');
            });
            this.tracksView = new TrackList(this.data.tracks.items, '', 'playlist');
        }
        getColor(this.$imgPlaylist, this.$header);
        this.$container.append(this.tracksView.$template);
    }
    
    /**
     * Обработчик событий. Отправляет текущий трэклист страницы плееру.
     */
    addAudioHandler() {
        getPlayer().load(this.tracksView.audioData, 0, this.$mainPlayButton);
    }
}