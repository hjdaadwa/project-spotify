import API from "../../api/api";
import constants from "../../common/constans";
import Collection from "../../components/collection/collection";
import { user } from "../../components/user/user.js";

/**
 * Страница личной библиотеки
 */

export default class LibraryPage {
    constructor(path) {
        this.createTemplate();
        this.updateData(path);       
    }
    createTemplate() {
        constants.app.innerHTML = '';
        this.container = document.createElement('div');
        this.container.style.marginTop = '80px';
        constants.app.append(this.container);
    }
    updateData(path) {
        if (path === 'playlists') {
            API.get(`users/${user.data.id}/playlists?limit=30&offset=0`)
                .then(data => {
                    this.component = new Collection(data.items, 'Playlists', 'playlist');
                    constants.app.append(this.component.template);
                }).catch((e) => {console.log(e)});
        } else if (path === 'albums') {
            API.get(`me/albums?limit=30&offset=0&market=US`)
                .then(data => {
                    const items = data.items.map(elem => elem.album);
                    this.component = new Collection(items, 'Albums', 'album');
                    constants.app.append(this.component.template);
                });
        } else if (path === 'artists') {
            API.get(`me/following?type=artist&limit=30`)
                .then(data => {
                    this.component = new Collection(data.artists.items, 'Artists', 'artist');
                    constants.app.append(this.component.template);
                });
        }


    }
}