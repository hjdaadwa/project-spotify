import { goTo } from "../../router/index.js";
import playlistCardTemplate from "../../components/playlist_card/playlist_card.template"

/**
 * Создание карточки плэйлиста
 */
export default class PlaylistCard {
    constructor(data) {
        this.data = data;
        this.createComponent();
    }

    createComponent() {
        this.template = document.createElement('article');
        this.template.classList.add('category__card','collection');
        this.template.innerHTML = playlistCardTemplate();
        this.img = this.template.querySelector('.collection__img');
        this.img.src = (this.data.images[1]?.url || this.data.images[2]?.url || this.data.images[0]?.url || 'https://i.ibb.co/17ybWq4/default-playlist.png');
        this.name = this.template.querySelector('.collection__title');
        this.name.textContent = this.data.name;
        this.description = this.template.querySelector('.collection__description');
        this.description.textContent = this.data.description;

        this.template.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            goTo(`/playlist/${this.data.id}`);
        });
    }

    getComponent() {
        return this.template;
    }
}