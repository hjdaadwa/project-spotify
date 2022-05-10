import albumCardTemplate from "../../components/album_card/album_card.template";
import { goTo } from "../../router/index.js";

/**
 * Создание карточки Альбомов
 */
export default class AlbumCard {
    constructor(data, prop) {
        this.data = data;
        this.createComponent(prop);
    }

    createComponent(prop) {
        this.template = document.createElement('article');
        this.template.classList.add('category__card','collection');
        this.template.innerHTML = albumCardTemplate();
        this.img = this.template.querySelector('.collection__img');
        this.img.src = (this.data.images[1]?.url || this.data.images[2]?.url || this.data.images[0]?.url || '/src/img/default_artist_card.png');
        this.name = this.template.querySelector('.collection__title');
        this.name.textContent = this.data.name;
        this.descriptionYear = this.template.querySelector('.collection__description-year');
        this.descriptionYear.textContent = this.data.release_date.slice(0,4);
        this.descriptionOther = this.template.querySelector('.collection__description-other')

        switch(prop) {
            case 'type':
                this.descriptionOther.textContent = this.data.album_type.slice(0,1).toUpperCase() + this.data.album_type.slice(1);
                break;
        }

        this.template.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            goTo(`/album/${this.data.id}`);
        });
    }

    getComponent() {
        return this.template;
    }

}