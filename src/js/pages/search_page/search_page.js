import constants from '../../common/constans.js';
import API from '../../api/api.js';
import Collection from '../../components/collection/collection';
import searchTemplate from './search_page.template';
import TrackList from '../../components/track_list/track_list.js';
import { controller } from '../../components/default/top_panel_other.js';
import { goTo } from '../../router/index.js';
import { randomColor } from '../../common/get_color.js';

/**
 * Страница поиска
 */

export default class SearchPage {

    constructor(query) {
        controller.searchInput.value = query; 
        this.createPage();

        if (query) {
            this.getData(query);
        } else {
            controller.searchInput.value = '';
            this.renderDefaultPage();
        }
    }

    createPage() {
        constants.app.innerHTML = '';
        this.template = document.createElement('div');
        this.template.classList.add('category__wrapper');
        constants.app.append(this.template);
    }

    getData(query) {
        API.get(`search?q=${query}&type=track%2Cartist%2Cplaylist%2Calbum&market=US&limit=10&offset=0`)
            .then((data) => {
                let sum = Object.values(data).map(item => item.total).reduce((prev, curr) => prev + curr);
                if (sum && sum !== 0) {
                    this.createSearchPage(data);
                } else {
                    this.createErrorPage(query);
                }               
            });
    }

    createSearchPage(data) {
        if (data.tracks.items[0]) {
            this.template.append(new TrackList(data.tracks.items, 'Tracks', 'artist').template);    
        }
        if (data.artists.items[0]) {
            this.template.append(new Collection(data.artists.items, 'Artists', 'artist').template);    
        }
        if (data.playlists.items[0]) {
            this.template.append(new Collection(data.playlists.items, 'Playlists', 'playlist').template);    
        }
        if (data.albums[0]) {
           this.template.append(new Collection(data.albums.items, 'Albums', 'album').template); 
        }
    }

    renderDefaultPage() {
        this.template.innerHTML = searchTemplate();
        this.container = this.template.querySelector('.category__content_layout-type_all');

        API.get('browse/categories?country=US&limit=28&offset=0').then(data => {
            this.components = data.categories.items.map(item => {
                const component = document.createElement('article');
                component.classList.add('category__card', 'genre-card');
                const title = document.createElement('h3');
                title.classList.add('genre-card__title');
                title.textContent = item.name;
                const img = document.createElement('img');
                img.classList.add('genre-card__img');
                img.src = item.icons[0].url;
                img.alt = item.name;
                img.width = '100';
                img.height = '100';
                component.style.backgroundColor = randomColor();
                component.append(title,img);
                component.addEventListener('click', () => {
                    goTo(`/category/${item.id}/${item.name}`);
                });

                return component;
            });
        this.container.append(...this.components);
        });
    }

    createErrorPage(query) {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error__search');
        errorElement.textContent = `No results found for "${query}"`;
        this.template.append(errorElement);    
    }
}