import constants from '../../common/constans';
import API from '../../api/api';
import Collection from '../../components/collection/collection';

/**
 * Жанры
 */
export default class Category {
    constructor(path, name) {
        this.createTemplate(name);
        this.updateData(path);
    }

    createTemplate(name) {
        constants.app.innerHTML = '';
        this.title = document.createElement('h1');
        this.title.classList.add('genre__title');
        this.title.textContent = name;
        constants.app.append(this.title);
    }

    updateData(path) {
        API.get(`browse/categories/${path}/playlists?country=US&limit=10&offset=0`).then(data => {
            this.renderComponent(data.playlists.items);
        })
    }
    renderComponent(items) {
        this.component = new Collection(items, 'Popular playlists', 'playlist');
        constants.app.append(this.component.template);
    }
}