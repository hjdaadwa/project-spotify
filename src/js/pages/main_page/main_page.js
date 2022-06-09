import mainPageTemplate from './main_page.template';
import constants from '../../common/constans.js';
import API from '../../api/api.js';
import Collection from '../../components/collection/collection.js';
import getUser from '../../components/user/user.js';
import TrackList from '../../components/track_list/track_list';


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
        this.$title.textContent ='Hi, ' + (getUser().data ? getUser().data.display_name + '!' : 'Friend!');
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
            let data = await Promise.all([
                API.get('me/top/tracks?time_range=medium_term&limit=10&offset=0'),
                API.get('me/top/artists?time_range=short_term&limit=10&offset=0')            
            ]);
            if (!(data[0].total === 0)) {
                this._displayTrackList(data[0].items, 'Your TOP tracks', 'artist');                           
            }
            if (!(data[1].total === 0)) {
                this._displayCollection(data[1].items, 'Your TOP artists', 'artist');                         
            }
            if (data[0].total + data[1].total <= 8) {
                throw "You don't have enough favorite tracks or artists to get a list of songs of your liking";
            } 

            data = await API.get(
                `recommendations?limit=10&market=US&seed_artists=${data[1].items[0].id},${data[1].items[1].id},${data[1].items[2].id}&seed_tracks=${data[0].items[0].id},${data[0].items[1].id}`
            );
            this._displayTrackList(data.tracks, 'You must like', 'artist');
        } catch(err) {
            if (typeof(err) === 'string') {
                //затычка, вместо попапа или модального окна
                console.log(err);
            } else {
                console.log(err);
            }
        }

        const data = await Promise.all(requests.map(request => API.get(request.url)));
        data.forEach((item, index) => {
            this._displayCollection(
                    item.playlists?.items || item.albums?.items,
                    requests[index]?.title || item?.message,
                    requests[index].type
            );            
        });
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