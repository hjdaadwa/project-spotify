import artistCardTemplate from "../../components/artist_card/artist_card.template";
import { router } from "../../router/index.js";


/**
 * Класс представляющий компонент артист.
 */
export default class ArtistCard {

    /**
     * Создает компонент
     * @param {Object} data - данные артиста 
     */
    constructor(data) {
        this.data = data;
        this._createComponent();
    }

    /**
     * Создает компонент.
     * @private
     */
    _createComponent() {
        this.$template = document.createElement('article');
        this.$template.classList.add('category__card','author');
        this.$template.innerHTML = artistCardTemplate();
        this.$img = this.$template.querySelector('.author__img');
        this.$img.src = (this.data.images[1]?.url || this.data.images[2]?.url || this.data.images[0]?.url || 'https://i.ibb.co/L8KvKX5/default-artist-card.png');
        this.$name = this.$template.querySelector('.author__title');
        this.$name.textContent = this.data.name;
        this.$descriptionOther = this.$template.querySelector('.author__description')
        this.$descriptionOther.textContent = this.data.type.slice(0,1).toUpperCase() + this.data.type.slice(1);
        this.$template.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            router.goTo(`/artist/${this.data.id}`);
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