import AlbumCard from '../album_card/album_card';
import ArtistCard from '../artist_card/artist_card';
import PlaylistCard from '../playlist_card/playlist_card'
import collectionTemplate from './collection.template'

/**
 * Компонент обертка для альбомов, артистов, плэйлистов
 */

export default class Collection {
    constructor(data, description, type) {
        this.createCollection(description);
        this.getComponents(data, type);
    }

    createCollection(description) {
        this.template = document.createElement('section');
        this.template.classList.add('category');
        this.template.innerHTML = collectionTemplate();
        this.title = this.template.querySelector('.category__title');
        this.title.textContent = description;
        this.container = this.template.querySelector('.category__content');
        this.link = this.template.querySelector('.category__link');
        
        this.link.addEventListener('click', (e) => {
            this.container.classList.toggle('category__content_layout-type_all');
            this.container.classList.toggle('category__content');
            e.target.textContent === 'all' ?  e.target.textContent = 'several' : e.target.textContent = 'all';
        });
    }

    getComponents(data, type) {
        switch (type) {
            case 'album':
                this.components = data.map(item => new AlbumCard(item, 'type').getComponent());
                break;
            case 'artist':
                this.components = data.map(item => new ArtistCard(item).getComponent());
                break;
            case 'playlist':
                this.components = data.map(item => new PlaylistCard(item).getComponent());
        }
        this.container.append(...this.components);  
    }
}