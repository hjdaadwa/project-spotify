import artistCardTemplate from "../../components/artist_card/artist_card.template";
import { goTo } from "../../router/index.js";


export default class ArtistCard {
    constructor(data) {
        this.data = data;
        this.createComponent();
    }

    createComponent() {
        this.template = document.createElement('article');
        this.template.classList.add('category__card','author');
        this.template.innerHTML = artistCardTemplate();
        this.img = this.template.querySelector('.author__img');
        this.img.src = (this.data.images[1]?.url || this.data.images[2]?.url || this.data.images[0]?.url || 'https://i.ibb.co/L8KvKX5/default-artist-card.png');
        this.name = this.template.querySelector('.author__title');
        this.name.textContent = this.data.name;
        this.descriptionOther = this.template.querySelector('.author__description')
        this.descriptionOther.textContent = this.data.type.slice(0,1).toUpperCase() + this.data.type.slice(1);
        this.template.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            goTo(`/artist/${this.data.id}`);
        });
    }

    getComponent() {
        return this.template;
    }
}