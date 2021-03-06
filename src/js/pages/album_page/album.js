import albumTemplate from './album.template';
import constants from '../../common/constans.js';
import API from '../../api/api.js';
import getColor from '../../common/get_color.js';
import TrackList from '../../components/track_list/track_list.js';
import getRouter from '../../router/index.js';
import getPlayer from '../../components/player/player';


/**
 * Класс представляющий страницу альбома. Путь "/album".
 */
export default class Album { 

    /**
     * Создает и рендерит темплейт.
     * @param {string} path - строковый id конкретного альбома.
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
        this.$template.innerHTML = albumTemplate();

        this.$header = this.$template.querySelector('.playlist__header');

        this.$imgPlaylist = this.$template.querySelector('.playlist__img');
        this.$imgPlaylist.hidden = true;

        this.$type = this.$template.querySelector('.playlist__type');
        this.$name = this.$template.querySelector('.playlist__name');

        this.$imgUser = this.$template.querySelector('.playlist__avatar');
        this.$imgUser.hidden = true;

        this.$year = this.$template.querySelector('.album__year');
        this.$mainPlayButton = this.$template.querySelector('.play-button');
        this.$counter = this.$template.querySelector('.playlist__counter');
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
     * Запрашивает данные об альбоме. При их получении вызывает обновление темплейта.
     * @public
     * @async
     */
    async updateData() {
            this.data = await API.get(`albums/${this.path}`);
            this._updateView();
    }

    /**
     * Обновляет темплейт для текущих данных в this.data.
     * @private
     */
    async _updateView() {
        this.$imgPlaylist.src = this.data.images[0].url;
        this.$imgPlaylist.hidden = false;

        this.$type.textContent = this.data.album_type;

        if (this.data.name.length >= 50) {
            this.$name.classList.add('playlist__name_size_small');
        } else if (this.data.name.length >= 35) {

            this.$name.classList.add('playlist__name_size_normal');
        } else if (this.data.name.length >= 20) {
            this.$name.classList.add('playlist__name_size_large');
        }
        this.$name.textContent = this.data.name;

        this.$artistImg = this.$template.querySelector('.playlist__avatar');

        /**Если у альбома один исполнитель, запрашиваем данные о нем */
        if (this.data.artists.length === 1) {  
            const data = await API.get(`artists/${this.data.artists[0].id}`);
            this.$artistImg.src = data.images[2]?.url || data.images[1]?.url || data.images[0]?.url;
            this.$artistImg.hidden = false;
        }

        const $artists = this.$template.querySelector('.album__artists');
        this.data.artists.forEach((element) => {
            const $artist = document.createElement('a');
            $artist.classList.add('album__artist');
            $artist.textContent = `${element.name}`;           
            $artist.href = `/artist/${element.id}`;

            getRouter().addLinkHandler($artist);

            const $dot = document.createElement('span');
            $dot.classList.add('decoration__dot');
            $dot.textContent = '•';

            $artists.append($artist, $dot);
        });

        this.$year.textContent = new Date(this.data.release_date).getFullYear() + ' •';
        this.$counter.textContent = `tracks: ${this.data.total_tracks}`;
        this.$template.querySelectorAll('.preloader').forEach((item) => {
            item.classList.remove('preloader');
        });

        getColor(this.$imgPlaylist, this.$header);

        this.tracksView = new TrackList(this.data.tracks.items, '', 'album');
        this.$container.append(this.tracksView.$template);
    }

    /**
     * Обработчик событий. Отправляет текущий трэклист страницы плееру.
     */
    addAudioHandler() {
        getPlayer().load(this.tracksView.audioData, 0, this.$mainPlayButton);
    }
}