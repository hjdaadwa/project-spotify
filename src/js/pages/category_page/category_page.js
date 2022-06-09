import constants from '../../common/constans';
import API from '../../api/api';
import Collection from '../../components/collection/collection';

/**
 * Класс представляющий страницу жанра. Путь "/genre".
 */
export default class Category {

    /**
     * Рендерит темплейт и получает данные для текущего жанра
     * @param {string} path - строковый id конкретного жанра.
     * @param {string} name - имя жанра.
     */
    constructor(path, name) {
        this._createTemplate(name);
        this._updateData(path);
    }

    /**
     * Создает темплейт.
     * @privet
     * @param {string} name - имя жанра.
     */
    _createTemplate(name) {
        constants.app.innerHTML = '';
        this.$title = document.createElement('h1');
        this.$title.classList.add('genre__title');
        this.$title.textContent = name;
        constants.app.append(this.$title);
    }

    /**
     * Запрашивает данные для жанра.
     * @privet
     * @async
     * @param {string} path - строковый id конкретного жанра.
     */
    async _updateData(path) {
            const data = await API.get(`browse/categories/${path}/playlists?country=US&limit=10&offset=0`);
            this._renderComponent(data.playlists.items);           
    }

    /**
     * Получает компонент коллекция и рендерит на страницу.
     * @private
     * @param {Object[]} items - массив плейлистов. 
     */
    _renderComponent(items) {
        this.component = new Collection(items, 'Popular playlists', 'playlist');
        constants.app.append(this.component.$template);
    }
}