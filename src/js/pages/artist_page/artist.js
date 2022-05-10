import artistTemplate from './artist.template';
import constants from '../../common/constans.js';
import API from '../../api/api.js';
import getColor from '../../common/get_color.js';
import TrackList from '../../components/track_list/track_list.js';
import Collection from '../../components/collection/collection';
import { player } from '../../components/player/player';

/**
 * Создание карточки Артиста
 */
export default class Artist {
    data;
    path;
    template;
    tracksView;
    albumsView;
    tracksListView;

    constructor(path) {
        this.path = path;
        this.createTemplate();
        this.renderTemplate();
    }

    createTemplate() {
        this.template = document.createElement('article');
        this.template.classList.add('playlist');
        this.template.innerHTML = artistTemplate();

        this.header = this.template.querySelector('.playlist__header');
        this.imgPlaylist = this.template.querySelector('.artist__img');
        this.imgPlaylist.hidden = true;
        this.name = this.template.querySelector('.playlist__name');
        this.followers = this.template.querySelector('.artist__followers');
        this.container = this.template.querySelector('.artist__tracklist-container');
        this.mainPlayButton = this.template.querySelector('.play-button');
        this.wrapper = this.template.querySelector('.artist__tracklist-container-list');

        this.mainPlayButton.addEventListener('click', this.addAudioHandler.bind(this), {once: true});
    }

    renderTemplate() {
        constants.app.innerHTML = '';
        constants.app.append(this.template);
    }

    updateData() {
        API.get(`artists/${this.path}`).then((data) => {
            this.data = data;
            this.updateView();
        });
        API.get(`artists/${this.path}/top-tracks?market=ES`).then((data) => {
            this.updateViewTracks(data)
        });
        API.get(`artists/${this.path}/albums?include_groups=album,single&market=ES&limit=25&offset=5`).then((data) => {
            this.updateViewAlbums(data.items);
        });
        API.get(`artists/${this.path}/related-artists`).then((data) => {
            this.updateViewArtists(data.artists);
        });    
    }

    updateView() {
        this.imgPlaylist.src = this.data.images[0]?.url || this.data.images[1]?.url || 'https://i.ibb.co/f9sHgr9/default-artist.png';
        this.imgPlaylist.hidden = false;

        if (this.data.name.length >= 50) {
            this.name.style.fontSize = '2rem';
            this.name.style.margin = '10px';
        } else if (this.data.name.length >= 35) {
            this.name.style.fontSize = '3rem';
        } else if (this.data.name.length >= 20) {
            this.name.style.fontSize = '4rem';
        }
        this.name.textContent = this.data.name;

        this.followers.textContent = `followers: ${this.data.followers.total}`;
        this.template.querySelectorAll('.preloader').forEach((item) => {
            item.classList.remove('preloader');
        });     
        getColor(this.imgPlaylist, this.header);
    }

    updateViewTracks(data) {
        this.tracksListView = new TrackList(data.tracks, 'Popular tracks', 'artist');
        this.container.append(this.tracksListView.template);
    }
    updateViewAlbums(data) {
        this.albumsView = new Collection(data, 'Albums and Singles', 'album');
        if (this.albumsView.components.length !== 0) {
            this.wrapper.append(this.albumsView.template);
        } 
    }
    updateViewArtists(data) {
        this.artistsView = new Collection(data, 'Fans love it too', 'artist');
        if (this.artistsView.components.length !== 0) {
            this.wrapper.append(this.artistsView.template);
        } 
    }
    addAudioHandler() {
        console.log(this.tracksListView.audioData)
        player.load(this.tracksListView.audioData, 0, this.mainPlayButton);
    }
}
