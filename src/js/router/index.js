import constants from "../common/constans.js";
import Route from "route-parser";

import PlayList from "../pages/playlist_page/playlist.js";
import Album from "../pages/album_page/album.js";
import Artist from "../pages/artist_page/artist.js";
import MainPage from "../pages/main_page/main_page.js"
import SearchPage from "../pages/search_page/search_page.js";
import Category from "../pages/category_page/category_page.js";
import LibraryPage from "../pages/library_page/library_page.js";

import getUser from "../components/user/user.js";
import getUIcontroller from "../common/UIController.js";


/**
 * Роутер. Все переходы происходят по методу goTo, который вызывает render.
 * Роут сравнивается с набором роутов, вызывается контроллер и создается новая страница,
 * которая, в зависимости от пути, тянет данные и рендерит все компоненты.
 * Для парсинга путей подгружена либа route-parser.
 */

class Router {

    /**
     * Инициализирует роутер
     */
    constructor() {
        this.routes = {
            mainRoute: new Route(constants.routes.index),
            searchRoute: new Route(constants.routes.search),
            playlistRoute: new Route(constants.routes.playlist),
            albumRoute: new Route(constants.routes.album),
            artist: new Route(constants.routes.artist),
            category: new Route(constants.routes.category),
            collection: new Route(constants.routes.collection),
        };
        window.addEventListener('popstate', () => {
            this.render(new URL(window.location.href).pathname)
        });
        document.querySelectorAll('a[href^="/"]').forEach($el => {
            this.addLinkHandler($el);
        });
        this.$historyButtons = document.querySelectorAll('.top-panel__control-btn');
        this.$historyButtons[0].addEventListener('click', () => this.goTo(window.history.back()));
        this.$historyButtons[1].addEventListener('click', () => this.goTo(window.history.forward()));
        this.render(new URL(window.location.href).pathname);  
    }

    /**
     * Вызывает UIController и конструктор класса нужной страницы.
     * @param {string} path - путь в url 
     */
    render(path) {
        let page;
    
        if (!getUser().oAuth.accessToken) {
            getUIcontroller().switchComponents('empty');
            constants.app.innerHTML = "<h1 class='error__search'>Please login</h1>";
    
        } else if (this.routes.mainRoute.match(path)) {
            getUIcontroller().switchComponents('main');
            page = new MainPage();
            page.updateData();
    
        } else if (this.routes.searchRoute.match(path)) {
            getUIcontroller().switchComponents('search');
            new SearchPage(this.routes.searchRoute.match(path).id);
    
        } else if (this.routes.collection.match(path)) {
            if (this.routes.collection.match(path).id === 'playlists' || this.routes.collection.match(path).id === 'albums' || this.routes.collection.match(path).id === 'artists') {
                getUIcontroller().switchComponents('collection', this.routes.collection.match(path).id);
                new LibraryPage(this.routes.collection.match(path).id);
            } else {
                this.render('####');
            }
    
        } else if (this.routes.playlistRoute.match(path)) {
            getUIcontroller().switchComponents('playlists', this.routes.playlistRoute.match(path).id);
            page = new PlayList(this.routes.playlistRoute.match(path).id);
            page.updateData();
    
        } else if (this.routes.albumRoute.match(path)) {
            getUIcontroller().switchComponents('_');
            page = new Album(this.routes.albumRoute.match(path).id);
            page.updateData();
    
        } else if (this.routes.artist.match(path)) {
            getUIcontroller().switchComponents('_');
            page = new Artist(this.routes.artist.match(path).id);
            page.updateData();
    
        } else if (this.routes.category.match(path)) {
            getUIcontroller().switchComponents('_');
            new Category(
                this.routes.category.match(path).id,
                this.routes.category.match(path).name
            );
        
        } else if (!path) {

        } else {
            getUIcontroller().switchComponents('empty');
            constants.app.innerHTML = `<div class="error__container"><div class="error">
                                        <h1 class="error__title">This page does not exist</h1>
                                        <p class="error__description">Check if the url you entered is correct</p>
                                        <ul class="error__list">Available urls:<li class="error__list-item">Home : '/'</li>
                                        <li class="error__list-item">Playlist: '/playlist/id'</li>
                                        <li class="error__list-item">Albums: '/album/id'</li>
                                        <li class="error__list-item">Artist: '/artist/id'</li>
                                        <li class="error__list-item">Search: '/serch/query'</li>
                                        <li class="error__list-item">Categories: '/category/id'</li>
                                        <li class="error__list-item">Library: '/collection/playlists(artists)(albums)'</li>
                                        <li class="error__list-item">Favorite playlist: 'playlist/me'</li></p></div></div>`;
        }
    }

    /**
     * Основной метод перехода внутри приложения. Все переходы осущесвтляются через него. Хранит историю с помощью History API
     * @param {string} path - путь
     */
    goTo(path) {
        window.history.pushState({}, '', path);
        this.render(path);
    }

    /**
     * Принуждает совершать переход, переданного элемента, через функцию goTo
     * @param {HTMLElement} link - элемент маршрутизации
     */
    addLinkHandler(link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const {pathname: path} = new URL(e.target.href || e.currentTarget.href);
            this.goTo(path);
        });
    }

}

let router;

/**
 * Создать или получить объект роутера
 */
const getRouter = () => {
    if (!router) {
        router = new Router();
    }
    return router;
}

export default getRouter;