import constants from "../common/constans.js";
import Route from "route-parser";
import PlayList from "../pages/playlist_page/playlist.js";
import { user } from "../components/user/user.js";
import Album from "../pages/album_page/album.js";
import Artist from "../pages/artist_page/artist.js";
import MainPage from "../pages/main_page/main_page.js"
import SearchPage from "../pages/search_page/search_page.js";
import { controller } from "../components/default/top_panel_other.js";
import Category from "../pages/category_page/category_page.js";
import LibraryPage from "../pages/library_page/library_page.js";

/**
 * Роутер. Все переходы происходят по методу goTo, который вызывает render.
 * Роут сравнивается с набором роутов, вызывается контроллер и создается новая страница,
 * которая, в зависимости от пути, тянет данные и рендерит все компоненты.
 * Для парсинга путей подгружена либа route-parser.
 */

export const routes = {
    mainRoute: new Route(constants.routes.index),
    searchRoute: new Route(constants.routes.search),
    playlistRoute: new Route(constants.routes.playlist),
    albumRoute: new Route(constants.routes.album),
    artist: new Route(constants.routes.artist),
    category: new Route(constants.routes.category),
    collection: new Route(constants.routes.collection),
}

export const render = (path) => {
    let page;

    if (!user.oAuth.accessToken) {
        controller.switchComponents('empty');
        constants.app.innerHTML = "<h1 class='error__search'>Please login</h1>";

    } else if (routes.mainRoute.match(path)) {
        controller.switchComponents('main');
        page = new MainPage();
        page.updateData();

    } else if (routes.searchRoute.match(path)) {
        controller.switchComponents('search');
        new SearchPage(routes.searchRoute.match(path).id);

    } else if (routes.collection.match(path)) {
        controller.switchComponents('collection', routes.collection.match(path).id);
        new LibraryPage(routes.collection.match(path).id);

    } else if (routes.playlistRoute.match(path)) {
        controller.switchComponents('playlists', routes.playlistRoute.match(path).id);
        page = new PlayList(routes.playlistRoute.match(path).id);
        page.updateData();

    } else if (routes.albumRoute.match(path)) {
        controller.switchComponents('_');
        page = new Album(routes.albumRoute.match(path).id);
        page.updateData();

    } else if (routes.artist.match(path)) {
        controller.switchComponents('_');
        page = new Artist(routes.artist.match(path).id);
        page.updateData();

    } else if (routes.category.match(path)) {
        controller.switchComponents('_');
        new Category(
            routes.category.match(path).id,
            routes.category.match(path).name
        );
    
    } else {
        controller.switchComponents('empty');
        constants.app.innerHTML = "<h1 class='error__search'>Page not found</h1>";
    }
}

export const goTo = (path) => {
    window.history.pushState({path}, path, path);
    render(path);
}

export const addLinkHandler = (link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {pathname: path} = new URL(e.target.href || e.currentTarget.href);
        goTo(path);
    });
}

export const initRouter = () => {
    window.addEventListener('popstate', e => {
        render(new URL(window.location.href).pathname)
    });
    document.querySelectorAll('a[href^="/"]').forEach(el => {
        addLinkHandler(el);
    });
    render(new URL(window.location.href).pathname);

    const historyButtons = document.querySelectorAll('.top-panel__control-btn');
    historyButtons[0].addEventListener('click', () => goTo(window.history.back()));
    historyButtons[1].addEventListener('click', () => goTo(window.history.forward()));
}

export default initRouter;