import albumTemplate from './album.template';
import constants from '../../common/constans.js';
import API from '../../api/api.js';
import getColor from '../../common/get_color.js';
import TrackList from '../../components/track_list/track_list.js';
import { addLinkHandler } from '../../router/index.js';
import { player } from '../../components/player/player';

/**
 * Страница альбом, вызывает конструктор трэклиста
 */
export default class Album {
    data;
    path;
    template;
    
    constructor(path) {
        this.path = path;
        this.createTemplate();
        this.renderTemplate();
    }

    createTemplate() {
        this.template = document.createElement('article');
        this.template.classList.add('playlist');
        this.template.innerHTML = albumTemplate();
        this.header = this.template.querySelector('.playlist__header');
        this.imgPlaylist = this.template.querySelector('.playlist__img');
        this.imgPlaylist.hidden = true;
        this.type = this.template.querySelector('.playlist__type')
        this.name = this.template.querySelector('.playlist__name');
        this.imgUser = this.template.querySelector('.playlist__avatar');
        this.imgUser.hidden = true;
        this.year = this.template.querySelector('.album__year');
        this.mainPlayButton = this.template.querySelector('.play-button');
        this.counter = this.template.querySelector('.playlist__counter');
        this.container = this.template.querySelector('.playlist__content-container');

        this.mainPlayButton.addEventListener('click', this.addAudioHandler.bind(this), {once: true});
    }

    renderTemplate() {
        constants.app.innerHTML = '';
        constants.app.append(this.template);
    }

    updateData() {
        API.get(`albums/${this.path}`).then((data) => {
            this.data = data;
            this.updateView();
        });
    }

    updateView() {
        this.imgPlaylist.src = this.data.images[0].url;
        this.imgPlaylist.hidden = false;
        this.type.textContent = this.data.album_type;
        if (this.data.name.length >= 50) {
            this.name.style.fontSize = '2rem';
            this.name.style.margin = '10px';
        } else if (this.data.name.length >= 35) {
            this.name.style.fontSize = '3rem';
        } else if (this.data.name.length >= 20) {
            this.name.style.fontSize = '4rem';
        }
        this.name.textContent = this.data.name;

        this.artistImg = this.template.querySelector('.playlist__avatar');
        if (this.data.artists.length === 1) {   
            API.get(`artists/${this.data.artists[0].id}`).then((data) => {
                this.artistImg.src = data.images[0].url;
                this.artistImg.hidden = false;
            });
        }

        const artists = this.template.querySelector('.album__artists');
        this.data.artists.forEach((element) => {
            const artist = document.createElement('a');
            artist.classList.add('album__artist');
            artist.textContent = `${element.name}`;           
            artist.href = `/artist/${element.id}`;
            addLinkHandler(artist);
            const dot = document.createElement('span');
            dot.classList.add('decoration__dot');
            dot.textContent = '•';
            artists.append(artist, dot);
        });

        this.year.textContent = new Date(this.data.release_date).getFullYear() + ' •';
        this.counter.textContent = `tracks: ${this.data.total_tracks}`;
        this.template.querySelectorAll('.preloader').forEach((item) => {
            item.classList.remove('preloader');
        });

        getColor(this.imgPlaylist, this.header);
        this.tracksView = new TrackList(this.data.tracks.items, '', 'album');
        this.container.append(this.tracksView.template);
    }

    addAudioHandler() {
        player.load(this.tracksView.audioData, 0, this.mainPlayButton);
    }
}