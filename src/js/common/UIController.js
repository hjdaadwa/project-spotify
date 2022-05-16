import { router } from "../router";


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
        this.searchInput.addEventListener('keyup', this.delay(function() {
            if (this.value) {
                router.goTo(`/search/${this.value}`);
            } else {
                router.goTo('/search');
            }   
        }, 400));
        this.searchInput.addEventListener('keydown', (event) => {
            if(event.keyCode == 13) {
                event.preventDefault();
                return;
             }  
        });
        this.searchClearBtn = document.querySelector('.search__clear-btn');
        this.searchClearBtn.addEventListener('click', () => {
            const btn = document.querySelector('.search__input');
            btn.value = '';
            router.goTo('/search');
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
                this.search.style.display = 'none';
                this.topNav.style.display = 'none';
                this._switchLinks(this.navMain);
                break;
            case 'search':
                this.search.style.display = 'block';
                this.topNav.style.display = 'none';
                this._switchLinks(this.navSearch);
                break;
            case 'collection':
                this.search.style.display = 'none';
                this.topNav.style.display = 'block';
                this._switchLinks(this.navCollection);
                this._switchTopLinks(id);    
                break;
            case 'playlists':
                this.search.style.display = 'none';
                this.topNav.style.display = 'none';
                id === 'me' ? this._switchLinks(this.navFavorite) : this._switchLinks();
                break;
            case 'empty':
                this.search.style.display = 'none';
                this.topNav.style.display = 'none';
                this._switchLinks();
                break;                                     
            default:
                this.search.style.display = 'none';
                this.topNav.style.display = 'none';
                this._switchLinks();
                break;
        }
    }

    /**
     * Меняет активный элемент основной навигации
     * @param {HTMLElement} element - активный элемент
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
     * Функция задержки для поиска
     * @param {number} ms - длительность 
     * @returns 
     */
    delay(callback, ms) {
        let timer = 0;
        return function(event) {
            if(event.keyCode == 13) {
                event.preventDefault();
             }
          let context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            callback.apply(context, args);
          }, ms || 0);
        };
      }   
}

let UIcontroller;

/**
 * Инициализирует контроллер интерфейса
 */
const initUIController = () => {
    UIcontroller = new UIController();
}

export default initUIController;
export {UIcontroller};