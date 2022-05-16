import AlbumCard from '../album_card/album_card';
import ArtistCard from '../artist_card/artist_card';
import PlaylistCard from '../playlist_card/playlist_card'
import collectionTemplate from './collection.template'

/**
 * Класс представляющий компонент коллекция. Является оберткой для компонентов артист,
 * альбом, плейлист.
 */

export default class Collection {
    
    /**
     * Создает компонент коллекцию
     * @param {Object[]} data - массив данных артистов/альбомов/плейлистов 
     * @param {string} description - тайтл коллекции
     * @param {string} type - тип требуемов коллекции. artist/album/playlist
     */
    constructor(data, description, type) {
        this._createCollection(description);
        this._getComponents(data, type);
    }

    /**
     * Создает компонент.
     * @param {string} description - тайтл коллекции
     * @private
     */
    _createCollection(description) {
        this.$template = document.createElement('section');
        this.$template.classList.add('category');
        this.$template.innerHTML = collectionTemplate();
        this.$title = this.$template.querySelector('.category__title');
        this.$title.textContent = description;
        this.$container = this.$template.querySelector('.category__content');
        this.$link = this.$template.querySelector('.category__link');
        
        this.$link.addEventListener('click', (e) => {
            this.$container.classList.toggle('category__content_layout-type_all');
            this.$container.classList.toggle('category__content');
            e.target.textContent === 'all' ?  e.target.textContent = 'several' : e.target.textContent = 'all';
        });
    }

    /**
     * Получает дочерние компоненты в зависимости от типа.
     * @param {Object[]} data - массив данных артистов/альбомов/плейлистов 
     * @param {string} type - тип требуемов коллекции. artist/album/playlist 
     */
    _getComponents(data, type) {
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
        if (this.components.length <= 7) {
            this.$container.classList.toggle('category__content_layout-type_all');
            this.$container.classList.toggle('category__content');
            this.$link.hidden = true;
        }
        this.$container.append(...this.components);  
    }
}