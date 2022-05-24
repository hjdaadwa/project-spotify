import API from "../../api/api";
import constants from "../../common/constans";
import Collection from "../../components/collection/collection";
import getUser from "../../components/user/user.js";

/**
 * Класс представляющий страницу аудиотеки. Путь "/collection".
 */

export default class LibraryPage {
    
    /**
     * Создает и рендерит страницу.
     * @param {string} path - путь к личным плейлитсам, артистам или альбомам
     */
    constructor(path) {
        this._createTemplate();
        this._updateData(path);       
    }
    
    /**
     * Создает и рендерит темплейт.
     * @private
     */
    _createTemplate() {
        constants.app.innerHTML = '';
        this.$container = document.createElement('div');
        this.$container.style.marginTop = '80px';
        constants.app.append(this.$container);
    }

    /**
     * В зависимости от пути, запрашивает данные личных плейлистов, артистов, альбомов.
     * Получает нужную коллекцию компонентов и рендерит ее.
     * @private
     * @async
     * @param {string} path - 'artists', 'albums', 'playlists'
     */
    async _updateData(path) {
        if (path === 'playlists') {
            const data = await API.get(`users/${getUser().data.id}/playlists?limit=30&offset=0`);
            this.component = new Collection(data.items, 'Playlists', 'playlist');
            constants.app.append(this.component.$template);

        } else if (path === 'albums') {
            const data = await API.get(`me/albums?limit=30&offset=0&market=US`);
            const items = data.items.map(elem => elem.album);
            this.component = new Collection(items, 'Albums', 'album');
            constants.app.append(this.component.$template); 
                          
        } else if (path === 'artists') {
            const data = await API.get(`me/following?type=artist&limit=30`);
            this.component = new Collection(data.artists.items, 'Artists', 'artist');
            constants.app.append(this.component.$template);
        }
    }
}