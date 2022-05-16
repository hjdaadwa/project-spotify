import constants from '../../common/constans.js';
import API from '../../api/api.js';
import Collection from '../../components/collection/collection';
import searchTemplate from './search_page.template';
import TrackList from '../../components/track_list/track_list.js';
import { UIcontroller } from '../../common/UIController.js';
import { router } from '../../router/index.js';
import { randomColor } from '../../common/get_color.js';
import { ApiError, errorHandler } from '../../common/Errors.js';


/**
 * Класс представляющий страницу поиска. Путь "/search"
 */

export default class SearchPage {

    /**
     * Создает и рендерит дефолтную страницу с коллекцией жанров,
     * а при налии запроса поиска, рендерит результат запроса.
     * @param {string} query - поисковой запрос пользователя.
     */
    constructor(query) {
        UIcontroller.searchInput.value = query; 
        this._createPage();

        if (query) {
            this._getData(query);
        } else {
            UIcontroller.searchInput.value = '';
            this._renderDefaultPage();
        }
    }

    /**
     * Создает темплейт и ренедерит его.
     * @privet
     */
    _createPage() {
        constants.app.innerHTML = '';
        this.$template = document.createElement('div');
        this.$template.classList.add('category__wrapper');
        constants.app.append(this.$template);
    }

    /**
     * Запрашивает данные по запросу.
     * @public
     * @private
     * @param {string} query - запрос
     */
    async _getData(query) {
        try {
            const response = await API.get(`search?q=${query}&type=track%2Cartist%2Cplaylist%2Calbum&market=US&limit=10&offset=0`);
            if (!response.ok) {
                throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
            }
            const data = await response.json();
            let sum = Object.values(data).map(item => item.total).reduce((prev, curr) => prev + curr);
            if (sum && sum !== 0) {
                this._createSearchPage(data);
            } else {
                this._createErrorPage(query);
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
     * Запрашивает компоненты по результату запроса и рендерит их в темплейт.
     * @param {Object} data - данные ответа на поисковой запрос
     * @param {Object} data.albums - альбомы
     * @param {Object} data.artists - артисты
     * @param {Object} data.playlists - плейлисты
     * @param {Object} data.tracks - треки
     * @private
     */
    _createSearchPage(data) {
        if (data.tracks.items[0]) {
            this.$template.append(new TrackList(data.tracks.items, 'Tracks', 'artist').$template);    
        }
        if (data.artists.items[0]) {
            this.$template.append(new Collection(data.artists.items, 'Artists', 'artist').$template);    
        }
        if (data.playlists.items[0]) {
            this.$template.append(new Collection(data.playlists.items, 'Playlists', 'playlist').$template);    
        }
        if (data.albums[0]) {
           this.$template.append(new Collection(data.albums.items, 'Albums', 'album').$template); 
        }
    }

    /**
     * Рендерит дефолтную страницу с коллекцией жанров.
     * @private
     * @async
     */
    async _renderDefaultPage() {
        this.$template.innerHTML = searchTemplate();
        this.$container = this.$template.querySelector('.category__content_layout-type_all');
        try {
            const response = await API.get('browse/categories?country=US&limit=28&offset=0');
            if (!response.ok) {
                throw new ApiError(response.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname);                                      
            }
            const data = await response.json();
            this.components = data.categories.items.map(item => {
                const $component = document.createElement('article');
                $component.classList.add('category__card', 'genre-card');
                const $title = document.createElement('h3');
                $title.classList.add('genre-card__title');
                $title.textContent = item.name;
                const $img = document.createElement('img');
                $img.classList.add('genre-card__img');
                $img.src = item.icons[0].url;
                $img.alt = item.name;
                $img.width = '100';
                $img.height = '100';
                $component.style.backgroundColor = randomColor();
                $component.append($title,$img);
                $component.addEventListener('click', () => {
                    router.goTo(`/category/${item.id}/${item.name}`);
                });

                return $component;
            });
        this.$container.append(...this.components);
        } catch(err) {
            if (err instanceof ApiError) {
                errorHandler(err);
            } else {
                console.log(err);
            }
        }
    }

    /**
     * Рендерит страницу при пустом ответе на поисковой запрос.
     * @param {string} query - запрос
     */
    _createErrorPage(query) {
        const $errorElement = document.createElement('div');
        $errorElement.classList.add('error__search');
        $errorElement.textContent = `No results found for "${query}"`;
        this.$template.append($errorElement);    
    }
}