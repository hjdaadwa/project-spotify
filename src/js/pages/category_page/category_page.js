import constants from '../../common/constans';
import API from '../../api/api';
import Collection from '../../components/collection/collection';
import { ApiError, errorHandler } from '../../common/Errors';

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
        try {
            const response = await API.get(`browse/categories/${path}/playlists?country=US&limit=10&offset=0`);
            if (!response.ok) {
                throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
            }
            const data = await response.json();
            this._renderComponent(data.playlists.items);           
        } catch(err) {
            if (err instanceof ApiError) {
                errorHandler(err);
            } else {
                console.log(err);
            }
        }
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