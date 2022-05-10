import playlistTemplate from './playlist.template';
import constants from '../../common/constans.js';
import API from '../../api/api.js';
import { user } from '../../components/user/user.js';
import getColor from '../../common/get_color.js';
import TrackList from '../../components/track_list/track_list.js';
import { player } from '../../components/player/player';

/**
 * Страница плэйлистов.
 */

export default class PlayList {
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
        this.template.innerHTML = playlistTemplate();
        this.header = this.template.querySelector('.playlist__header');
        this.imgPlaylist = this.template.querySelector('.playlist__img');
        this.imgPlaylist.hidden = true;
        this.type =this.template.querySelector('.playlist__type');
        this.name = this.template.querySelector('.playlist__name');
        this.description = this.template.querySelector('.playlist__description');
        this.imgUser = this.template.querySelector('.playlist__avatar');
        this.imgUser.hidden = true;
        this.authorName = this.template.querySelector('.playlist__user-name');
        this.counter = this.template.querySelector('.playlist__counter');
        this.followers = this.template.querySelector('.playlist__followers');
        this.mainPlayButton = this.template.querySelector('.play-button');
        this.container = this.template.querySelector('.playlist__content-container');

        this.mainPlayButton.addEventListener('click', this.addAudioHandler.bind(this), {once: true});
    }

    renderTemplate() {
        constants.app.innerHTML = '';
        constants.app.append(this.template);
    }

    updateData() {
        if (this.path === 'me') {
            API.get('me/tracks?offset=0&limit=40').then((data) => {
                this.data = data;
                this.updateView();
            });           
        } else {
            API.get(`playlists/${this.path}`).then((data) => {
                this.data = data;
                this.updateView();
            });
        }
    }

    updateView() {
        if (this.path === 'me') {
            this.imgPlaylist.src = 'https://i.ibb.co/44mk1sy/playlist-favorite.png';
            this.imgPlaylist.hidden = false;
            this.type.textContent = 'playlist';
            this.name.textContent = 'Favorite tracks';
            this.imgUser.src = user.data.images[0]?.url || user.data.images[1]?.url || user.data.images[2]?.url || 'https://i.ibb.co/51drLLx/default-user.png';
            this.imgUser.crossOrigin = 'anonymous';
            this.imgUser.hidden = false;
            this.authorName.textContent = user.data.display_name;
            this.counter.textContent = `  tracks: ${this.data.total}`;
            this.followers.hidden = true;
            this.template.querySelectorAll('.preloader').forEach((item) => {
                item.classList.remove('preloader');
            });
            this.tracksView = new TrackList(this.data.items, '', 'playlist');
        } else {
            this.imgPlaylist.src = this.data.images[0]?.url || this.data.images[1]?.url || this.data.images[2]?.url || 'https://i.ibb.co/p2bwMsX/playlist-placeholder.png';
            this.imgPlaylist.hidden = false;
            this.type.textContent = this.data.type;
            if (this.data.name.length >= 50) {
                this.name.style.fontSize = '2rem';
                this.name.style.margin = '10px 0px';
            } else if (this.data.name.length >= 35) {
                this.name.style.fontSize = '3rem';
            } else if (this.data.name.length >= 20) {
                this.name.style.fontSize = '4rem';
            }
            this.name.textContent = this.data.name;
            this.description.textContent = this.data.description;
            this.authorName.textContent = this.data.owner.display_name;
            this.counter.textContent = `tracks: ${this.data.tracks.total}`;
            this.followers.textContent = `followers: ${this.data.followers.total}`
            this.template.querySelectorAll('.preloader').forEach((item) => {
                item.classList.remove('preloader');
            });
            this.tracksView = new TrackList(this.data.tracks.items, '', 'playlist');
        }
        getColor(this.imgPlaylist, this.header);
        this.container.append(this.tracksView.template);
    }
    
    addAudioHandler() {
        player.load(this.tracksView.audioData, 0, this.mainPlayButton);
    }
}
