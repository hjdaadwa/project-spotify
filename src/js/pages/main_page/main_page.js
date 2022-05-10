import mainPageTemplate from './main_page.template';
import constants from '../../common/constans.js';
import API from '../../api/api.js';
import Collection from '../../components/collection/collection.js';
import { user } from '../../components/user/user.js';
import TrackList from '../../components/track_list/track_list';


/**
 * Мэйн страница. Создается темплейт, отправляются дефолтные запросы,
 * под нужные дочерние комноненты вызываются конструкторы.
 * При каждом обращении роуту любого пэйджа, создается новый экземпляр. Старый отчищается
 * сборщиком, вроде как.
 */
export default class MainPage {
    constructor() {
        this._createTemplate();
        this._renderTemplate();
    }

    _createTemplate() {
        this.template = document.createElement('article');
        this.template.classList.add('main-page');
        this.template.innerHTML = mainPageTemplate();
        this.title = this.template.querySelector('.main-page__title');
        this.title.textContent ='Hi, ' + (user.data ? user.data.display_name + '!' : 'Friend!');
        this.header = this.template.querySelector('.main-page__header');
        this.container = this.template.querySelector('.main-page__content');
    }

    _renderTemplate() {
        constants.app.innerHTML = '';
        constants.app.append(this.template);
    }

    updateData() {

        const requests = [
            {url: 'browse/new-releases?country=KZ&limit=20&offset=0', title: 'New Releases from Soviet Union', type: 'album'},
            {url: 'browse/new-releases?country=US&limit=14&offset=0', title: 'New Releases from USA', type: 'album'},
            {url: 'browse/featured-playlists?country=US&limit=14&offset=0', title: null, type: 'playlist'},
            {url: 'browse/featured-playlists?country=DE&limit=14&offset=0', title: null, type: 'playlist'},               
        ];

        Promise.all([
            API.get('me/top/tracks?time_range=medium_term&limit=10&offset=0'),
            API.get('me/top/artists?time_range=short_term&limit=10&offset=0')
        ]).then((results) => {
            this.displayTrackList(results[0].items, 'Your TOP tracks', 'artist');
            this.displayCollection(results[1].items, 'Your TOP artists', 'artist');
            return API.get(
                `recommendations?limit=10&market=US&seed_artists=${results[1].items[0].id},${results[1].items[1].id},${results[1].items[2].id}&seed_tracks=${results[0].items[0].id},${results[0].items[1].id}`
            );
        }).then((result) => {
            this.displayTrackList(result.tracks, 'You must like', 'artist');
        }).catch(err => console.log('todo', err));

        Promise.all(requests.map(request => API.get(request.url))).then((results) => {
            results.forEach((result, index) => {
                this.displayCollection(
                    result.playlists?.items || result.albums?.items,
                    requests[index].title || results[index].message,
                    requests[index].type
                );
            });
        }).catch(err => console.log('todo', err));
    }

    displayTrackList(tracks, title, type) {
        this.container.append(new TrackList(tracks, title, type).template);
    }

    displayCollection(items, title, type) {
        this.container.append(new Collection(items, title, type).template);
    }

}