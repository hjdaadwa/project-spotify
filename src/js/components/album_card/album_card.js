import albumCardTemplate from "../../components/album_card/album_card.template";
import getRouter from "../../router/index.js";

/**
 * Класс представляющий компонент альбом.
 */
export default class AlbumCard {

    /**
     * Создает компонент
     * @param {Object} data - данные альбома 
     * @param {string} prop - наличие типа для альбома
     */
    constructor(data, prop) {
        this.data = data;
        this._createComponent(prop);
    }

    /**
     * Создает компонент.
     * @param {string} prop - наличие типа для альбома
     * @private
     */
    _createComponent(prop) {
        this.$template = document.createElement('article');
        this.$template.classList.add('category__card','collection');
        this.$template.innerHTML = albumCardTemplate();
        this.$img = this.$template.querySelector('.collection__img');
        this.$img.src = (this.data.images[1]?.url || this.data.images[2]?.url || this.data.images[0]?.url || '/src/img/default_artist_card.png');
        this.$name = this.$template.querySelector('.collection__title');
        this.$name.textContent = this.data.name;
        this.$descriptionYear = this.$template.querySelector('.collection__description-year');
        this.$descriptionYear.textContent = this.data.release_date.slice(0,4);
        this.$descriptionOther = this.$template.querySelector('.collection__description-other')

        switch(prop) {
            case 'type':
                this.$descriptionOther.textContent = this.data.album_type.slice(0,1).toUpperCase() + this.data.album_type.slice(1);
                break;
        }

        this.$template.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            getRouter().goTo(`/album/${this.data.id}`);
        });
    }

    /**
     * Возвращает dom элемент
     * @returns {HTMLElement} - компонент
     * @public
     */
    getComponent() {
        return this.$template;
    }

}