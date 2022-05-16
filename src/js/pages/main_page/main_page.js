import mainPageTemplate from './main_page.template';
import constants from '../../common/constans.js';
import API from '../../api/api.js';
import Collection from '../../components/collection/collection.js';
import { user } from '../../components/user/user.js';
import TrackList from '../../components/track_list/track_list';
import { ApiError, errorHandler } from '../../common/Errors';


/**
 * Класс представляющий главную страницу. Путь "/". Создается и рендерится темплейт, отправляются дефолтные запросы,
 * под нужные дочерние комноненты вызываются конструкторы, темплейт заполняется компонентами и данными.
 * При каждом обращении к соотвутствующему пути создается новый экземпляр класса. Старый отчищается
 * сборщиком.
 */
export default class MainPage {
    /**
     * Создается и рендерится темплейт.
     */
    constructor() {
        this._createTemplate();
        this._renderTemplate();
    }

    /**
     * Создает темплейт.
     * @private
     */
    _createTemplate() {
        this.$template = document.createElement('article');
        this.$template.classList.add('main-page');
        this.$template.innerHTML = mainPageTemplate();
        this.$title = this.$template.querySelector('.main-page__title');
        this.$title.textContent ='Hi, ' + (user.data ? user.data.display_name + '!' : 'Friend!');
        this.$header = this.$template.querySelector('.main-page__header');
        this.$container = this.$template.querySelector('.main-page__content');
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
     * Выполняет запросы к апи. При удачных запросах вызывает методы _displayTrackList, _displayCollection для рендера
     * коллекций и списков треков.
     * @public
     * @async
     */
    async updateData() {
        const requests = [
            {url: 'browse/new-releases?country=KZ&limit=20&offset=0', title: 'New Releases from Soviet Union', type: 'album'},
            {url: 'browse/new-releases?country=US&limit=14&offset=0', title: 'New Releases from USA', type: 'album'},
            {url: 'browse/featured-playlists?country=US&limit=14&offset=0', title: null, type: 'playlist'},
            {url: 'browse/featured-playlists?country=DE&limit=14&offset=0', title: null, type: 'playlist'},               
        ];

        try {
            const responses = await Promise.all([
                API.get('me/top/tracks?time_range=medium_term&limit=10&offset=0'),
                API.get('me/top/artists?time_range=short_term&limit=10&offset=0')            
            ]);
            let data = [];
            for (let item of responses) {
                if (!item.ok) {
                    throw new ApiError(item.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname)                                      
                }
                const element = await item.json();
                if (element.total === 0) {
                    throw "You don't have enough favorite tracks or artists";
                }
                data.push(element);
            }
            this._displayTrackList(data[0].items, 'Your TOP tracks', 'artist');
            this._displayCollection(data[1].items, 'Your TOP artists', 'artist');
            const response = await API.get(
                `recommendations?limit=10&market=US&seed_artists=${data[1].items[0].id},${data[1].items[1].id},${data[1].items[2].id}&seed_tracks=${data[0].items[0].id},${data[0].items[1].id}`
            );
            data = await response.json();
            this._displayTrackList(data.tracks, 'You must like', 'artist');
        } catch(err) {
            if (err instanceof ApiError) {
                errorHandler(err);
            } else {
                console.log(err);
            }
        }

        try {
            const responses = await Promise.all(requests.map(request => API.get(request.url)));
            const data = [];
            for (let item of responses) {
                if (!item.ok) {
                    throw new ApiError(item.status, `Error when requesting "${window.location.pathname}"`, window.location.pathname)                                      
                }
                data.push(await item.json());
            }
            data.forEach((item, index) => {
                this._displayCollection(
                        item.playlists?.items || item.albums?.items,
                        requests[index]?.title || item?.message,
                        requests[index].type
                    );            
            });
        } catch(err) {
            if (err instanceof ApiError) {
                errorHandler(err);
            } else {
                console.log(err);
            }
        }
    }

    /**
     * Вызывает конструктор класса TrackList и рендерит его.
     * @param {Object[]} tracks - Массив объектов данных о треках.
     * @param {string} title - Загаловок списка треков.
     * @param {string} type - Тип треклиста, отвечает за требуемое представление.
     * @privet
     */
    _displayTrackList(tracks, title, type) {
        this.$container.append(new TrackList(tracks, title, type).$template);
    }

    /**
     * Вызывает конструктор класса Collection и рендерит его.
     * @param {Object[]} items -  Массив альбомов/артисов/плейлистов.
     * @param {string} title - Загаловок коллеции.
     * @param {string} type - Тип коллекции.
     * @privet
     */
    _displayCollection(items, title, type) {
        this.$container.append(new Collection(items, title, type).$template);
    }

}