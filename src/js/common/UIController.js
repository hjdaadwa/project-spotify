import getRouter from "../router";
import { delay } from "../common/services";

/**
 * Контролирует отображение и работу навигационных элементов, поля поиска.
 */

class UIController {

    /**
     * Инициализация контролллера
     */
    constructor() {
        this.search = document.querySelector('.search');
        this.searchInput = document.querySelector('.search__input');
        this.searchInput.addEventListener('keyup', delay(function() {
            if (this.value) {
                getRouter().goTo(`/search/${this.value}`);
            } else {
                getRouter().goTo('/search');
            }   
        }, 400));
        this.searchInput.addEventListener('keydown', (event) => {
            if(event.code === 'Enter') {
                event.preventDefault();
                return;
             }  
        });
        this.searchInput.addEventListener('keyup', (event) => {
            if(event.code === 'Enter') {
                event.preventDefault();
                return;
             }  
        });
        this.searchClearBtn = document.querySelector('.search__clear-btn');
        this.searchClearBtn.addEventListener('click', () => {
            const btn = document.querySelector('.search__input');
            btn.value = '';
            getRouter().goTo('/search');
        });

        this.topNav = document.querySelector('.nav-panel');
        this.topNavLinks = document.querySelectorAll('.nav-panel__link');
        this.topNavPlaylists = this.topNavLinks[0];
        this.topNavArtists = this.topNavLinks[1];
        this.topNavAlbums = this.topNavLinks[2];

        this.navLinks = document.querySelectorAll('.header__navigation-link');
        this.navMain = this.navLinks[0];
        this.navSearch = this.navLinks[1];
        this.navCollection = this.navLinks[2];
        this.navFavorite = this.navLinks[3];               
    }

    /**
     * Меняет активные компоненты страницы
     * @param {string} page - путь
     * @param {string} id - вкладка в аудиотеке
     * @public
     */
    switchComponents(page, id) {
        switch (page) {
            case 'main':
                this._switchTopPanelComponents();
                this._switchLinks(this.navMain);
                break;
            case 'search':
                this._switchTopPanelComponents('search');
                this._switchLinks(this.navSearch);
                break;
            case 'collection':
                this._switchTopPanelComponents('navigation');
                this._switchLinks(this.navCollection);
                this._switchTopLinks(id);    
                break;
            case 'playlists':
                this._switchTopPanelComponents();
                id === 'me' ? this._switchLinks(this.navFavorite) : this._switchLinks();
                break;
            case 'empty':
                this._switchTopPanelComponents();
                this._switchLinks();
                break;                                     
            default:
                this._switchTopPanelComponents();
                this._switchLinks();
                break;
        }
    }

    /**
     * Меняет активный элемент основной навигации
     * @param {HTMLElement} [element] - активный элемент или без аргумента, если это не страница основой навигации
     * @private
     */
    _switchLinks(element) {
        this.navLinks.forEach(item => item.classList.remove('header__navigation-link_active'));

        if (element) {
            element.classList.add('header__navigation-link_active');
        }
    }

    /**
     * Меняет активный элемент дополнительной навигации страницы аудиотеки
     * @param {string} id - вкладка в аудиотеке
     * @private
     */
    _switchTopLinks(id) {
        [this.topNavPlaylists, this.topNavArtists, this.topNavAlbums].forEach(item => {
            item.classList.remove('nav-panel__item_active')
        });

        if (id === 'playlists') {
            this.topNavPlaylists.classList.add('nav-panel__item_active');
        } else if (id === 'artists') {
            this.topNavArtists.classList.add('nav-panel__item_active');
        } else {
            this.topNavAlbums.classList.add('nav-panel__item_active');
        }
    } 

    /**
     * Меняет компоненты search и дополнительной навигации в верхней панеле
     * @param {string} [component] - передаем нужный компонет или ничего, если отображать не требуется.
     * @private
     */
    _switchTopPanelComponents(component) {
        this.topNav.classList.remove('nav-panel_active');
        this.search.classList.remove('search_active');

        if (component === 'search') {
            this.search.classList.add('search_active');
        } else if (component === 'navigation') {
            this.topNav.classList.add('nav-panel_active');
        }
    }
}

let UIcontroller;

/**
 * Создать или получить объект роутера
 */
const getUIController = () => {
    if (!UIcontroller) {
        UIcontroller = new UIController();
    }
    return UIcontroller;
}

export default getUIController;